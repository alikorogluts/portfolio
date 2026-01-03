import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useGLTF, useVideoTexture, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: { [name: string]: THREE.Mesh }
  materials: { [name: string]: THREE.MeshStandardMaterial }
}

interface MacbookProps extends React.ComponentProps<'group'> {
  screenTexture?: string;
  mediaType?: 'video' | 'image';
}

// --- RESİM MATERYALİ ---
const ImageMaterial = ({ url }: { url: string }) => {
  const texture = useTexture(url);
  
  useMemo(() => {
    texture.flipY = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
};

// --- VİDEO MATERYALİ ---
const VideoMaterial = ({ url }: { url: string }) => {
  const texture = useVideoTexture(url, {
    start: true,
    muted: true,
    loop: true,
    playsInline: true,
  });
  
  useMemo(() => {
    texture.flipY = true;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
  }, [texture]);

  return <meshBasicMaterial map={texture} toneMapped={false} />;
};

export function Macbook({ screenTexture, mediaType = 'image', ...props }: MacbookProps) {
  const { nodes } = useGLTF('/models/macbook.glb') as unknown as GLTFResult;
  const SCREEN_MESH_NAME = "Object_123";

  const meshes = useMemo(() => {
    return Object.entries(nodes).map(([name, node]) => {
      if (node.type !== 'Mesh') return null;
      
      if (name === SCREEN_MESH_NAME) {
        return { name, node, isScreen: true };
      }
      return { name, node, isScreen: false };
    }).filter(Boolean);
  }, [nodes]);

  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {meshes.map((item) => {
          if (!item) return null;
          const { name, node, isScreen } = item;

          if (isScreen) {
            return (
              <mesh 
                key={name} 
                geometry={node.geometry}
                rotation={node.rotation}
                position={node.position}
                scale={node.scale}
              >
                {screenTexture ? (
                   mediaType === 'video' ? (
                     <VideoMaterial url={screenTexture} />
                   ) : (
                     <ImageMaterial url={screenTexture} />
                   )
                ) : (
                   <meshBasicMaterial color="black" />
                )}
              </mesh>
            )
          }

          return (
            <mesh
              key={name}
              geometry={node.geometry}
              material={node.material}
              rotation={node.rotation}
              position={node.position}
              scale={node.scale}
            />
          )
        })}
      </group>
    </group>
  )
}

useGLTF.preload('/models/macbook.glb');
useTexture.preload('/textures/deneme.png');