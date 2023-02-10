import styled, { createGlobalStyle } from "styled-components";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

import MapboxGlobe from "./components/MapboxGlobe";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 99vh;
`;

const GlobeContainer = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 90vh; */
`;

const EntryContainer = styled.div`
  position: absolute;
  left: 50%;
  height: 100%;
  width: 50%;
  display: flex;
`;

const ModelContainer = styled.div`
  height: 400px;
  width: 100%;
`;

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  const glb = useLoader(GLTFLoader, "/earthBall.glb");

  return (
    <Suspense fallback={null}>
      <primitive object={glb.scene} position={[0, 0, 5]} scale={0.5} />
    </Suspense>
  );
}

export default function Home() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <GlobeContainer>
          <MapboxGlobe />
        </GlobeContainer>
        <EntryContainer>
          <ModelContainer>
            <Canvas camera={{ position: [0, 0, 10], zoom: 0.5 }}>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <spotLight intensity={0.8} position={[300, 300, 400]} />
              <Suspense fallback={<Box />}>
                <Scene />
              </Suspense>
            </Canvas>
          </ModelContainer>
        </EntryContainer>
      </Container>
    </>
  );
}
