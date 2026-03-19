import React, { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import FurnitureModel from "./FurnitureModel";

const MODEL_CONFIG = {
  sofa: { targetSize: 1.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  bed: { targetSize: 1.8, yOffset: 0, xOffset: 0, zOffset: 0 },
  "coffee-table": { targetSize: 0.8, yOffset: 0, xOffset: 0, zOffset: 0 },
  "tv-stand": { targetSize: 1.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  "dining-table": { targetSize: 1.4, yOffset: 0, xOffset: 0, zOffset: 0 },
  "kitchen-island": { targetSize: 1.3, yOffset: 0, xOffset: 0, zOffset: 0 },
  fridge: { targetSize: 0.9, yOffset: 0, xOffset: 0, zOffset: 0 },
  cooktop: { targetSize: 0.5, yOffset: 0, xOffset: 0, zOffset: 0 },
  wardrobe: { targetSize: 1.2, yOffset: 0, xOffset: 0, zOffset: 0 },
  nightstand: { targetSize: 0.5, yOffset: 0, xOffset: 0, zOffset: 0 },
  "dressing-table": { targetSize: 1.1, yOffset: 0, xOffset: 0, zOffset: 0 },
  bathtub: { targetSize: 1.4, yOffset: 0, xOffset: 0, zOffset: 0 },
  sink: { targetSize: 0.7, yOffset: 0, xOffset: 0, zOffset: 0 },
  toilet: { targetSize: 0.7, yOffset: 0, xOffset: 0, zOffset: 0 },
  "office-table": { targetSize: 1.2, yOffset: 0, xOffset: 0, zOffset: 0 },
};

const SceneContent = ({
  furnitureList,
  roomConfig,
  wallColor,
  floorColor,
  onUpdatePosition,
}) => {
  const roomWidth = roomConfig.width || 400;
  const roomLength = roomConfig.length || 400;
  const SCALE = 0.01;

  const roomWidthScaled = roomWidth * SCALE;
  const roomLengthScaled = roomLength * SCALE;
  const wallHeight = 1.6;
  const wallThickness = 0.06;

  const [draggingId, setDraggingId] = useState(null);
  const floorRef = useRef();
  const orbitRef = useRef();

  const dragPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );

  const handlePointerDown = (_, itemId) => {
    setDraggingId(itemId);
    if (orbitRef.current) orbitRef.current.enabled = false;
  };

  const handlePointerUp = () => {
    setDraggingId(null);
    if (orbitRef.current) orbitRef.current.enabled = true;
  };

  const handlePointerMove = (e) => {
    if (!draggingId) return;

    e.stopPropagation();

    const intersectionPoint = new THREE.Vector3();
    e.ray.intersectPlane(dragPlane, intersectionPoint);

    const boundedX = Math.max(
      -roomWidthScaled / 2,
      Math.min(intersectionPoint.x, roomWidthScaled / 2)
    );
    const boundedZ = Math.max(
      -roomLengthScaled / 2,
      Math.min(intersectionPoint.z, roomLengthScaled / 2)
    );

    const newX = Math.round(boundedX / SCALE + roomWidth / 2);
    const newY = Math.round(boundedZ / SCALE + roomLength / 2);

    onUpdatePosition?.(draggingId, newX, newY);
  };

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* FLOOR */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerMissed={handlePointerUp}
      >
        <planeGeometry args={[roomWidthScaled, roomLengthScaled]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>

      {/* WALLS */}
      <mesh position={[0, wallHeight / 2, -roomLengthScaled / 2]}>
        <boxGeometry args={[roomWidthScaled, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      <mesh position={[0, wallHeight / 2, roomLengthScaled / 2]}>
        <boxGeometry args={[roomWidthScaled, wallHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      <mesh position={[-roomWidthScaled / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, roomLengthScaled]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      <mesh position={[roomWidthScaled / 2, wallHeight / 2, 0]}>
        <boxGeometry args={[wallThickness, wallHeight, roomLengthScaled]} />
        <meshStandardMaterial color={wallColor} />
      </mesh>

      {/* FURNITURE */}
      {furnitureList.map((item) => {
        const config = MODEL_CONFIG[item.modelKey] || {
          targetSize: 1,
          yOffset: 0,
          xOffset: 0,
          zOffset: 0,
        };

        return (
          <FurnitureModel
            key={item.id}
            id={item.modelKey}
            itemId={item.id}
            isDragging={draggingId === item.id}
            position={[
              ((item.x || 0) - roomWidth / 2) * SCALE + config.xOffset,
              config.yOffset,
              ((item.y || 0) - roomLength / 2) * SCALE + config.zOffset,
            ]}
            rotation={[0, ((item.rotation || 0) * Math.PI) / 180, 0]}
            targetSize={config.targetSize}
            onPointerDown={handlePointerDown}
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

      <OrbitControls
        ref={orbitRef}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
      />
      <Environment preset="apartment" />
    </>
  );
};

const RoomViewer3D = ({
  furnitureList = [],
  roomConfig = {},
  wallColor = "#2C1C14",
  floorColor = "#F8FAFC",
  onUpdatePosition,
}) => {
  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }}>
        <Suspense
          fallback={
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="orange" wireframe />
            </mesh>
          }
        >
          <SceneContent
            furnitureList={furnitureList}
            roomConfig={roomConfig}
            wallColor={wallColor}
            floorColor={floorColor}
            onUpdatePosition={onUpdatePosition}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RoomViewer3D;
