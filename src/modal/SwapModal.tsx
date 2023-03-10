import { PropsWithChildren, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { getCoinList } from "../api/Api";
// import { useQuery } from "@tanstack/react-query";
import History from "./SearchHistory";
import axios from "axios";
import styled from "styled-components";

type CoinInfo = { id: string; symbol: string };
interface ModalDefaultType {
  onClickToggleModal: () => void;
  setCoin: React.Dispatch<React.SetStateAction<CoinInfo[]>>;
  isCoin: CoinInfo[];
  children: boolean;
}

export default function Modal({
  onClickToggleModal,
  setCoin,
  isCoin,
  children,
}: PropsWithChildren<ModalDefaultType>) {
  // children === true 위에 버튼
  // children === false 아래에 버튼
  const [isText, setText] = useState<string>("");
  const [data, setData] = useState<object[]>([]);
  // 시작할 때 목록 불러오기
  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  // 검색 할 때 value값 저장
  const TextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value);
  };

  // 목록에서 코인 누를 시 값 변환
  const ChangeCoin = (e1: string, e2: string) => {
    // 코인 선택 시 History에 저장
    let todos = localStorage.getItem("coin");
    if (todos === null) {
      let symbol = JSON.stringify([e2]);
      localStorage.setItem("coin", symbol);
    } else {
      let newtodos = JSON.parse(todos);
      // 중복된 값 제거
      newtodos.push(e2);
      let newArr = newtodos.filter(
        (element: string, index: number) => newtodos.indexOf(element) === index
      );

      if (newArr.length > 7) {
        newArr.shift();
      }
      localStorage.setItem("coin", JSON.stringify(newArr));
    }
    // 선택한 값 children의 boolean 값으로 확인하여 저장
    if (children === true) {
      setCoin([
        { id: e1, symbol: e2 },
        { id: isCoin[1].id, symbol: isCoin[1].symbol },
      ]);
    } else {
      setCoin([
        { id: isCoin[0].id, symbol: isCoin[0].symbol },
        { id: e1, symbol: e2 },
      ]);
    }
  };

  return (
    <ModalWrapper>
      <DialogBox>
        <SwapText>
          <span className="left_text">토큰 선택</span>
          <FontAwesomeIcon
            icon={faX}
            className="right_icon"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (onClickToggleModal) {
                onClickToggleModal();
              }
            }}
          />
        </SwapText>
        <SearchBox>
          <input
            id="first"
            type="string"
            className="InputCoinName"
            placeholder="이름 검색 또는 주소 붙여 넣기"
            value={isText}
            onChange={TextChange}
          />
        </SearchBox>
        <History />
        <CoinList>
          {data
            .filter(
              (coin) =>
                coin.id.toLowerCase().indexOf(isText) !== -1 ||
                coin.symbol.toLowerCase().indexOf(isText) !== -1
            )
            .map((coin) => (
              <div
                key={coin.id}
                className="eachList"
                onClick={() => {
                  ChangeCoin(coin.id, coin.symbol.toUpperCase());
                  if (onClickToggleModal) {
                    onClickToggleModal();
                  }
                }}
              >
                <div>{coin.symbol.toUpperCase()}</div>
                <div>{coin.id}</div>
              </div>
            ))}
        </CoinList>
        <CoinManage>
          <div onClick={() => alert("준비 중입니다")} className="listManage">
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>토큰 목록 관리</span>
          </div>
        </CoinManage>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();

          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
const DialogBox = styled.dialog`
  display: flex;
  width: 60%;
  height: 600px;
  top: 10px;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

const SwapText = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  color: #000000;
  align-items: center;
  justify-content: center;
  .left_text {
    font-size: 18px;
    font-weight: bold;
    margin-right: auto;
    margin-left: 18px;
  }
  .right_icon {
    width: 18px;
    height: 18px;
    margin-top: 4px;
    margin-right: 18px;
    cursor: pointer;
  }
`;
const SearchBox = styled.div`
  display: flex;
  width: 100%;
  height: 55px;
  .InputCoinName {
    width: 97%;
    text-indent: 10px;
    font-size: 16px;
    border: 2px solid #908790;
    border-radius: 15px;
    color: #000000;
    background: #ffffff;
  }
`;
const CoinList = styled.div`
  width: 100%;
  height: 300px;
  border-bottom: 1px solid;
  overflow-x: hidden;
  overflow-y: auto;
  .eachList {
    display: flex;
    border: 1px solid #000000;
    border-radius: 5px;
    background: #908790;
    font-size: 16px;
    color: #ffffff;
    text-indent: 16px;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  div:hover {
    background: #5babab;
  }
`;
const CoinManage = styled.span`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
  color: #5babab;
  .listManage {
    cursor: pointer;
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;
