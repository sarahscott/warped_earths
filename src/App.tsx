import styled, { createGlobalStyle } from "styled-components";
import { CameraProps, Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { Suspense, useRef } from "react";
import { CameraControls, TrackballControls } from "@react-three/drei";

import MapboxGlobe from "./components/MapboxGlobe";
import { PerspectiveCamera } from "three";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }

  model-viewer {
  height: 100%;
  width: 100%;
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

// threejs implementation; dormant for now
function Scene() {
  const camera = new PerspectiveCamera(50, 1, 0.1, 3000);
  camera.position.z = 40;
  const glb = useLoader(GLTFLoader, "/earthBall.glb");

  return (
    <Canvas camera={camera}>
      <TrackballControls noZoom />
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, 300, 400]} />
      <Suspense fallback={<Box />}>
        <primitive object={glb.scene} position={[0, 0, 5]} scale={0.5} />
      </Suspense>
    </Canvas>
  );
}

export default function Home() {
  const modelRef = useRef();

  return (
    <>
      <GlobalStyle />
      <Container>
        <GlobeContainer>
          <MapboxGlobe />
        </GlobeContainer>
        <EntryContainer>
          <ModelContainer>
            {/* 
// @ts-ignore */}
            <model-viewer
              src="./earthBall.glb"
              alt="A rock"
              disable-zoom
              interaction-prompt="none"
              camera-controls
              ar
              auto-rotate
              ar-modes="webxr"
              ref={(ref: undefined) => {
                modelRef.current = ref;
              }}
            >
              {/* 
// @ts-ignore */}
            </model-viewer>
          </ModelContainer>
        </EntryContainer>
      </Container>
    </>
  );
}
