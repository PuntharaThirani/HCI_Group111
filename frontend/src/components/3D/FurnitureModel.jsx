import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATHS = {
  sofa: "/models/sofa.glb",
  bed: "/models/bed.glb",
  "coffee-table": "/models/coffee-table.glb",
  "tv-stand": "/models/tv-stand.glb",
  "dining-table": "/models/dining-table.glb",
  "kitchen-island": "/models/kitchen-island.glb",
  fridge: "/models/fridge.glb",
  cooktop: "/models/cooktop.glb",
  wardrobe: "/models/wardrobe.glb",
  nightstand: "/models/nightstand.glb",
  "dressing-table": "/models/dressing-table.glb",
  bathtub: "/models/bathtub.glb",
  sink: "/models/sink.glb",
  toilet: "/models/toilet.glb",
  "office-table": "/models/office-table.glb",
};

const FurnitureModel = ({
  id,
  itemId,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetSize = 1,
  isDragging = false,
  onPointerDown,
}) => {
  const modelPath = MODEL_PATHS[id];
  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const { scaleFactor, yLift } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDimension;

    const scaledHeight = size.y * scale;
    const yOffset = scaledHeight / 2;

    return {
      scaleFactor: scale,
      yLift: yOffset,
    };
  }, [clonedScene, targetSize]);

  return (
    <group
      position={[position[0], position[1] + yLift, position[2]]}
      rotation={rotation}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown?.(e, itemId);
      }}
    >
      <primitive
        object={clonedScene}
        castShadow
        receiveShadow
      />
      {isDragging && (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial wireframe transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
};

export default FurnitureModel;