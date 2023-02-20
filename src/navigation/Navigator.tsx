import styled from "styled-components";

export default function Navigator() {
  const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    backgroud: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  `;
  const Spacer = styled.div`
    height: 7rem;
  `;

  return (
    <>
      <HeaderBlock>123</HeaderBlock>
      <Spacer />
    </>
  );
}
