import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  // text-align: center;
  margin: 0 auto;
`;

export default function SwapModal() {
  return (
    <Wrapper>
      <div>
        토큰 선택
        {/* 닫기 이미지 <div></div> */}
        <div>이름 검색 또는 주소 붙여 넣기</div>
        {/* 최근 검색 토큰들 <div></div> */}
        {/* 검색하는 토큰 목록 <div></div> */}
        <div>토큰 목록 관리</div>
      </div>
    </Wrapper>
  );
}
