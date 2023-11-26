import styled from "styled-components";
import Ball from "@/components/Ball";

const Index = () => {
  return (
    <Container>
      <Ball />
    </Container>
  );
};
export default Index;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;
