import styled, { createGlobalStyle } from "styled-components";
import { CameraProps, Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { Suspense, useRef } from "react";
import { CameraControls, TrackballControls } from "@react-three/drei";

import MapboxGlobe from "./components/MapboxGlobe";
import { PerspectiveCamera } from "three";
import data from "./data";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }

  model-viewer {
  width: 100%;
  height: 700px;
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
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* min-height: 90vh; */
`;

const RightSide = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 50%;
  display: flex;
  overflow: scroll;
  overflow-x: hidden;
  word-wrap: break-word;
`;

const EntryContainer = styled.div`
  width: 100%;
`;

const ModelContainer = styled.div`
  /* background-color: darkblue; */
`;

const Heading = styled.h1`
  color: white;
  font-size: 3rem;
  width: 100%;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
  font-weight: bold;
`;

const TalkTitle = styled.h2`
  color: white;
  font-family: "Inter", sans-serif;
  text-transform: uppercase;
`;

const Description = styled.h3`
  color: orangered;
  font-size: 2rem;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
`;

const BigQuote = styled.p`
  color: white;
  font-size: 2rem;
  width: 100%;
  font-family: "Inter", sans-serif;

  /* font-family: "Cardo", serif; */
`;

const Anchor = styled.h1`
  visibility: hidden;
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
  const modelRef = useRef(null);

  const refs = React.useRef<any>([]);

  const handleMarkerClick = (idx: number) => {
    refs.current[idx].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <GlobeContainer>
          <MapboxGlobe onMarkerClick={handleMarkerClick} />
        </GlobeContainer>
        <RightSide>
          <EntryContainer>
            {data.map((presenter, idx) => (
              <>
                <Anchor
                  ref={(el) => {
                    refs.current[idx] = el;
                  }}
                ></Anchor>
                <Heading>{presenter.name}</Heading>
                <TalkTitle>
                  <i>{presenter.title}</i>
                </TalkTitle>
                <Description>{presenter.description}</Description>
                {presenter.quotes && (
                  <BigQuote>"{presenter.quotes[0]}"</BigQuote>
                )}
                <ModelContainer>
                  {/* annoying but required because typescript doesn't recognize model-viewer
// @ts-ignore */}
                  <model-viewer
                    src={`./${presenter.globe.file}`}
                    alt="Earth Ball"
                    disable-zoom
                    interaction-prompt="none"
                    field-of-view="45deg"
                    camera-controls
                    disable-tap
                    auto-rotate
                    autoplay
                    // animation-name="Key.001Action.003"
                    ref={(ref: any) => {
                      modelRef.current = ref;
                    }}
                  >
                    {/* 
// @ts-ignore */}
                  </model-viewer>
                </ModelContainer>
              </>
            ))}
          </EntryContainer>
        </RightSide>
      </Container>
    </>
  );
}
