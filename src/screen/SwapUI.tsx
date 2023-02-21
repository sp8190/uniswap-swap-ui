import SwapModal from "../modal/SwapModal";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { faGear, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useCallback } from "react";

type Information = { first: undefined | number; second: undefined | number };
type CoinInfo = { id: string };
const url = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=USD&ids=`;

export default function SwapUI() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isNumModal, setNumModal] = useState<boolean>(false);
  const [isCoin, setCoin] = useState<CoinInfo[]>([
    { id: "DAI" },
    { id: "USDC" },
  ]);
  const [isNumber, setNumber] = useState<Information>({
    first: undefined,
    second: undefined,
  });
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // 바꿔야함
  const nameChange = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // const axiosFirstCoin = () => {
  //   return axios.get(url + isCoin[0].id);
  // };
  // const axiosSecondCoin = () => {
  //   return axios.get(url + isCoin[1].id);
  // };

  // const firstCoin = useQuery(["first"], axiosFirstCoin);
  // const secondCoin = useQuery(["second"], axiosSecondCoin);

  const { first, second } = isNumber;

  const NumberChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (Number(e.target.value) === 0 || e.target.value === undefined) {
      setNumber({
        ...isNumber,
        [e.target.id]: undefined,
      });
    } else {
      setNumber({
        ...isNumber,
        [e.target.id]: Number(e.target.value),
      });
    }
  };

  const onStart = () => {
    alert("준비 중입니다.");
  };
  const onCheckList = (): boolean => {
    const listComponent = Object(isNumber);
    if (listComponent.first === 0 || listComponent.first === undefined)
      return false;
    else if (listComponent.second === 0 || listComponent.second === undefined)
      return false;
    else {
      return true;
    }
  };

  return (
    <Wrapper>
      <div className="rounded">
        <SwapText>
          <span className="left_text">스왑</span>
          <FontAwesomeIcon
            icon={faGear}
            className="right_icon"
            // onClick={() => alert("준비 중입니다")}
            onClick={() => alert(isCoin)}
            // onClick={() => alert(isNumber.first + " " + isNumber.second)}
          />
        </SwapText>
        <CoinBox>
          <div className="InputBox">
            <input
              id="first"
              type="number"
              className="InputNumber"
              step="0.0000000001"
              placeholder="0.0"
              value={first}
              onChange={NumberChange}
            />

            <div
              onClick={() => {
                onClickToggleModal();
                setNumModal(true);
              }}
              className="openModal"
            >
              <span className="text">{isCoin[0].id} ▽</span>
            </div>
          </div>
          <div className="arrowDown">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          <div className="InputBox">
            <input
              id="second"
              type="number"
              className="InputNumber"
              step="0.0000000001"
              placeholder="0.0"
              value={second}
              onChange={NumberChange}
            />
            {isOpenModal && (
              <SwapModal
                onClickToggleModal={onClickToggleModal}
                nameChange={nameChange}
              >
                {isNumModal}
              </SwapModal>
            )}
            <div
              onClick={() => {
                onClickToggleModal();
                setNumModal(false);
              }}
              className="openModal down"
            >
              <span className="text">{isCoin[1].id} ▽</span>
            </div>
          </div>
        </CoinBox>

        {onCheckList() ? (
          <div>
            <InfoBox>123123</InfoBox>
            <SwapButton onClick={onStart} className="swap">
              스왑
            </SwapButton>
          </div>
        ) : (
          <NoSwapButton onClick={onStart} className="noSwap" disabled>
            금액을 입력하세요.
          </NoSwapButton>
        )}
      </div>

      <div>Uniswap 사용 가능 : {/* English 버튼 */}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  .rounded {
    margin: 0 0 0 30%;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 40%;

    border-radius: 15px;
    background: #908790;
  }
`;

const SwapText = styled.div`
  height: 40px;
  color: #ffffff;
  .left_text {
    font-size: 18px;
    font-weight: bold;
    margin-left: 18px;
    float: left;
  }
  .right_icon {
    width: 18px;
    height: 18px;
    margin-right: 18px;
    float: right;
    cursor: pointer;
  }
`;

const CoinBox = styled.div`
  position: relative;
  height: 200px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input::placeholder {
    color: #cfcbcf;
  }

  .InputBox {
    height: 95px;
  }
  .InputNumber {
    width: 97%;
    height: 85px;
    text-indent: 10px;
    font-size: 22px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    color: #ffffff;
    background: #766c76;
  }
  .arrowDown {
    position: absolute;
    color: #ffffff;
    width: 20px;
    height: 20px;
    background-color: #766c76;
    border: 4px solid #908790;
    border-radius: 10px;
    margin-top: -20px;
    z-index: 5;
    right: 48%;
    top: 48%;
  }
  .openModal {
    cursor: pointer;
    position: absolute;
    height: 30px;
    background-color: #908790;
    border: 1px solid #908790;
    border-radius: 10px;
    color: #cfcbcf;
    right: 5%;
    bottom: 70%;
    z-index: 5;
  }
  .down {
    bottom: 23%;
  }
  .text {
    font-weight: bold;
    vertical-align: sub;
    padding-left: 10px;
    margin: 10px;
  }
`;

const SwapButton = styled.button`
  width: 97%;
  height: 55px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  color: #ffffff;
  background: #5babab;
`;

const NoSwapButton = styled.button`
  width: 97%;
  height: 55px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 15px;
  color: #ffffff;
  background: #766c76;
`;

const InfoBox = styled.div`
  margin-bottom: 10px;
  text-indent: 20px;
  color: #ffffff;
  font-weight: bold;
  float: left;
`;
