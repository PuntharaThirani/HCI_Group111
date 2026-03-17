import React from 'react';

const Lights = () => {
  return (
    <>
      {/* පොදු ආලෝකය */}
      <ambientLight intensity={0.5} />
      
      {/* ප්‍රධාන ආලෝකය - සෙවනැලි ලබා ගැනීමට (Cast Shadows) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* වටපිටාවෙන් පරාවර්තනය වන ආලෝකය */}
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
    </>
  );
};

export default Lights;