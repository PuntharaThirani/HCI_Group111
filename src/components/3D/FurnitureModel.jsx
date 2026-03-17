import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const FurnitureModel = ({
  id,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color,
}) => {
  const modelPath = `/models/${id}.glb`;
  const { scene } = useGLTF(modelPath);

  const { clonedScene, yOffset } = useMemo(() => {
    if (!scene) return { clonedScene: null, yOffset: 0 };

    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material = child.material.clone();
          if (color) {
            child.material.color.set(color);
          }
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const minY = box.min.y;

    return {
      clonedScene: clone,
      yOffset: -minY,
    };
  }, [scene, color]);

  if (!clonedScene) return null;

  const safeScale =
    typeof scale === "number" && !Number.isNaN(scale) ? scale : 1;

  return (
    <primitive
      object={clonedScene}
      position={[position[0], position[1] + yOffset * safeScale, position[2]]}
      rotation={rotation}
      scale={[safeScale, safeScale, safeScale]}
    />
  );
};

export default FurnitureModel;