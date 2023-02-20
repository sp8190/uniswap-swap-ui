import Navigator from "./navigation/Navigator";
import SwapUI from "./screen/SwapUI";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export default function App() {
  return (
    <Wrapper>
      <Navigator />
      <SwapUI />
    </Wrapper>
  );
}
