import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import FurnitureModel from "./FurnitureModel";

const MODEL_CONFIG = {
  sofa: { scale: 0.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  bed: { scale: 0.35, yOffset: 0, xOffset: 0, zOffset: 0 },
  "coffee-table": { scale: 0.18, yOffset: 0, xOffset: 0, zOffset: 0 },
  "tv-stand": { scale: 0.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  "dining-table": { scale: 0.25, yOffset: 0, xOffset: 0, zOffset: 0 },
  "kitchen-island": { scale: 0.25, yOffset: 0, xOffset: 0, zOffset: 0 },
  fridge: { scale: 0.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  cooktop: { scale: 0.15, yOffset: 0, xOffset: 0, zOffset: 0 },
  wardrobe: { scale: 0.25, yOffset: 0, xOffset: 0, zOffset: 0 },
  nightstand: { scale: 0.12, yOffset: 0, xOffset: 0, zOffset: 0 },
  "dressing-table": { scale: 0.22, yOffset: 0, xOffset: 0, zOffset: 0 },
  bathtub: { scale: 0.25, yOffset: 0, xOffset: 0, zOffset: 0 },
  sink: { scale: 0.18, yOffset: 0, xOffset: 0, zOffset: 0 },
  toilet: { scale: 0.18, yOffset: 0, xOffset: 0, zOffset: 0 },
  "office-table": { scale: 0.22, yOffset: 0, xOffset: 0, zOffset: 0 },
};

const RoomViewer3D = ({ furnitureList = [], roomConfig = {}, wallColor = "#ffffff" }) => {
  const roomWidth = roomConfig.width || 400;
  const roomLength = roomConfig.length || 400;
  const SCALE = 0.01;

  return (
    <div className="w-full h-150 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <Suspense
          fallback={
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="orange" wireframe />
            </mesh>
          }
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[roomWidth * SCALE, roomLength * SCALE]} />
            <meshStandardMaterial color={wallColor} />
          </mesh>

          {furnitureList.map((item) => {
            const config = MODEL_CONFIG[item.modelKey] || {
              scale: 0.2,
              yOffset: 0,
              xOffset: 0,
              zOffset: 0,
            };

            return (
              <FurnitureModel
                key={item.id}
                id={item.modelKey}
                position={[
                  ((item.x || 0) - roomWidth / 2) * SCALE + config.xOffset,
                  config.yOffset,
                  ((item.y || 0) - roomLength / 2) * SCALE + config.zOffset,
                ]}
                rotation={[0, ((item.rotation || 0) * Math.PI) / 180, 0]}
                scale={config.scale}
                color={item.color}
              />
            );
          })}

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.4}
            scale={Math.max(roomWidth, roomLength) * SCALE}
            blur={2}
            far={10}
          />

          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RoomViewer3D;