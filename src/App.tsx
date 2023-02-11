import styled, { createGlobalStyle, keyframes } from "styled-components";
import { CameraProps, Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { CameraControls, TrackballControls } from "@react-three/drei";

import Model from "./components/Model";
import MapboxGlobe from "./components/MapboxGlobe";
import { PerspectiveCamera } from "three";
import data from "./data";
import content from "./content";

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
  }

  model-viewer {
    width: 100%;
    height: 650px;
  }
`;

const Header = styled.header`
  color: white;
  font-size: 4rem;
  /* position: sticky; */
  padding: 1.5rem 0 0 0;
  font-family: "Inter", sans-serif;
  /* font-family: "Righteous", cursive; */
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  height: 99vh;
  visibility: visible;

  @media screen and (max-width: 700px) {
    visibility: hidden;
  }
`;

const Disclaimer = styled.h1`
  font-size: 6rem;
  font-family: "Righteous", cursive;
  color: white;
  /* visibility: hidden;

  @media screen and (max-width: 700px) {
    visibility: visible;
  } */
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
  overflow: scroll;
  overflow-x: hidden;
  word-wrap: break-word;
  padding-bottom: 4rem;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const EntryContainer = styled.div`
  width: 100%;
`;

const Heading = styled.h1`
  color: rgb(26, 236, 131);
  font-size: 4rem;
  width: 100%;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
  margin-bottom: 0.5rem;
  /* font-family: "Righteous", cursive; */
  font-weight: bold;
  /* margin: 6rem 0 0; */
  padding-top: 1.5rem;
  margin: 20rem 0 0;
  /* font-family: "Cardo", serif; */
`;

const TalkTitle = styled.h2`
  color: white;
  margin: 0;
  font-family: "Inter", sans-serif;
  text-transform: uppercase;
  font-weight: normal;
`;

const blink = keyframes`
    0% {
      color: #00c8ff;
    }

    60% {
      color: #0091ff;
    }

    100% {
      color: #00ffff;
    }

`;

const Description = styled.h3`
  font-size: 2.4rem;
  text-transform: uppercase;
  font-family: "Inter", sans-serif;
  text-align: left;
  margin: 0;
  /* animation: ${blink} 5s infinite; */
  white-space: pre-wrap;
  color: white;
  position: absolute;
  top: 70%;
  z-index: -1;
  font-weight: lighter;
`;

const BigQuote = styled.p`
  color: white;
  font-size: 1.5rem;
  width: 100%;
  /* font-family: "Inter", sans-serif; */
  font-family: "Cormorant", serif;
  border: 3px solid;
  border-color: rgb(26, 236, 131);
  padding: 1rem;
  box-sizing: border-box;
  margin-top: 0;

  /* font-family: "Cardo", serif; */
`;

const Content = styled.p`
  color: white;
  font-size: 2rem;
  width: 100%;
  white-space: pre-wrap;
  margin-top: 1.5rem;

  margin-bottom: 6rem;

  /* font-family: "Inter", sans-serif; */
  font-family: "Cormorant", serif;

  /* font-family: "Cardo", serif; */
`;

const ModelContainer = styled.div`
  position: relative;
`;

const Anchor = styled.h1`
  visibility: hidden;
`;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return { width, height };
};

const useWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return windowDimensions;
};

export default function Home() {
  const refs = React.useRef<any>([]);
  const { height, width } = useWindowDimensions();

  const handleMarkerClick = (idx: number) => {
    refs.current[idx].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <GlobalStyle />
      {width < 800 ? (
        <Disclaimer>{`The Warped Earth Experience requires a wider screen`}</Disclaimer>
      ) : (
        <Container>
          <GlobeContainer>
            <MapboxGlobe onMarkerClick={handleMarkerClick} />
          </GlobeContainer>
          <RightSide>
            <EntryContainer>
              {/* <Header>{content.title}</Header> */}
              <Content>{content.intro}</Content>
              {data.map((presenter, idx) => (
                <>
                  <Heading
                    ref={(el) => {
                      refs.current[idx] = el;
                    }}
                  >
                    {presenter.name}
                  </Heading>
                  <TalkTitle>
                    <i>{presenter.title}</i>
                  </TalkTitle>
                  <ModelContainer>
                    <Model model={presenter.globe} />
                    <Description>{presenter.description}</Description>
                  </ModelContainer>

                  {presenter.quotes &&
                    presenter.quotes.map((quote) => (
                      <BigQuote>"{quote}"</BigQuote>
                    ))}
                </>
              ))}
            </EntryContainer>
          </RightSide>
        </Container>
      )}
    </>
  );
}
