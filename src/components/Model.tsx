import styled from "styled-components";

const Container = styled.div``;

interface Model {
  file: string;
  animation: string;
}

const Model = ({ model }: { model: Model }) => {
  return (
    <Container>
      {/* annoying but required because typescript doesn't recognize model-viewer
// @ts-ignore */}
      <model-viewer
        src={`./${model.file}`}
        alt="Earth Ball"
        disable-zoom
        interaction-prompt="none"
        field-of-view="45deg"
        camera-controls
        disable-tap
        auto-rotate
        autoplay
        animation-name={model.animation}
      >
        {/* 
// @ts-ignore */}
      </model-viewer>
    </Container>
  );
};

export default Model;
