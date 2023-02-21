import styled from "styled-components";

export default function Navigator() {
  const HeaderBlock = styled.div`
    display: table;
    table-layout: fixed;
    width: 100%;
    height: 50px;
    background: #ddd;
    text-align: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

    .HeaderBlock_item {
      display: table-cell;
      vertical-align: middle;
    }
  `;

  const Spacer = styled.div`
    height: 20px;
  `;

  return (
    <>
      <HeaderBlock>
        <span className="HeaderBlock_item"> Uniswap! </span>
      </HeaderBlock>
      <Spacer />
    </>
  );
}
