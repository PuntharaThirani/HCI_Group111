import React from 'react';

const Lights = () => {
  return (
    <>

      <ambientLight intensity={0.5} />
      

      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
   
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
    </>
  );
};

export default Lights;