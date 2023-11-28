import { Anchor, Box, Image, Text } from "@mantine/core";
import styled from "styled-components";
import {FaCircleInfo} from "react-icons/fa6";
import React from "react";

export default function LocationModal() {
  return (
    <LocationModalWrap>
      <Box sx={(theme) => ({ fontSize: theme.fontSizes.sm })}>
        {/* <Divider />
        <Anchor href="tel:032-228-8000">📞 032-228-8000</Anchor>
        <br />
        <Anchor href="https://www.chaerimwedding.com" target="_blank">
          https://www.chaerimwedding.com/
        </Anchor> */}
        {/*<Image*/}
        {/*  src="https://www.chaerimwedding.com/modules/page/skins/sub/img/about/about_location_info_item_map.jpg"*/}
        {/*  width="100%"*/}
        {/*  alt="map"*/}
        {/*  my={20}*/}
        {/*/>*/}
        <dl className="mapUse">
          <LocationTitle>지하철로 오시는 길</LocationTitle>
          <dd className="color">
            📍지하철 1호선 부천역 (북부역광장 방면)
            <li>3번, 4번, 7번출구 이용</li>
          </dd>
          <LocationTitle>버스로 오시는 길</LocationTitle>
          {/*<dt>*/}
          {/*  <strong>버스 이용시</strong>*/}
          {/*</dt>*/}
          <dd>
            📍부천북부역 하차
            <li>
              3, 5, 5-3, 5-4, 5-5, 8, 11, 12-1, 23-1, 50, 66, 70-2, 75, 606, 661{" "}
              <br />
            </li>
          </dd>
          <LocationTitle>자가용으로 오시는 길</LocationTitle>
          {/*<dt>*/}
          {/*  <strong>자가용 이용시</strong>*/}
          {/*</dt>*/}
          <dd className="color">
            <li>📍네비게이션 : 부천채림웨딩홀 </li>
            <li>경기 부천시 부천로 3-1</li>
            <li>경인고속도로 부천 IC에서 약 15분 소요</li>
            <li>서울 외곽순환도로 시흥 IC에서 약 15분 소요</li>
            {/*<li>주차 : 전용주차장 3시간 무료</li>*/}

            <Parking>
              <ParkingInfo>
                <ParkingInfoTitle>
                  <FaCircleInfo /> <ParkingInfoP>주차안내</ParkingInfoP>
                </ParkingInfoTitle>
                <ParkingInfoText>
                  전용 주차장에 주차 가능 (무료 3시간) <br />
                  만차 시 이마트 주차 가능 (5000원 제공) <br />
                  안내원의 유도에 따라주시면 감사하겠습니다.
                </ParkingInfoText>
              </ParkingInfo>
              {/* <Alert
            icon={<IconAlertCircle size={16} />}
            title="주차 안내ㄴ"
          >
            <Text
              sx={(theme) => ({
                fontSize: theme.fontSizes.xs,
              })}
            >
              전용 주차장에 주차 가능 (무료 3시간) <br />
              만차 시 이마트 주차 가능 (5000원 제공) <br />
              안내원의 유도에 따라주시면 감사하겠습니다.
            </Text>
          </Alert> */}
            </Parking>
          </dd>
        </dl>
      </Box>
    </LocationModalWrap>
  );
}

const CenteredBoldText = styled(Text)`
  text-align: center;
  font-weight: bold;
`;

const LocationTitle = styled(Text)`
  color: #132F93;
  //font-size: 1vw;
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
  background: #F2F4FB;
  border-radius: 25px;
  padding: 8px 15px;
  left: -35px;
  position: relative;
`;

const Divider = styled.div`
  width: 80%;
  margin: 10px auto;
  border-bottom: 1px solid black;
`;

const LocationModalWrap = styled.div`
  padding: 15px;
  text-align: center;
  .mapUse {
    text-align: left;
    padding: 0 20px;
    dt {
      margin-top: 16px;
      text-decoration: underline;
      font-style: italic;
    }

    dd {
      &.color {
      }
      li {
        list-style-type: none;
        margin-top: 0;
        &:first-child {
          margin-top: 5px;
        }
      }
      display: block;
      margin-inline-start: 0;
    }
  }
`;

const Parking = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f7;
  border-radius: 10px;
`;

// 주차안내 부분
const ParkingInfo = styled.div`
  color: #684e3b;
`;

const ParkingInfoTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ParkingInfoP = styled.p`
  margin-left: 5px;
  font-weight: 600;
`;
const ParkingInfoText = styled.p`
  margin-left: 10px;
  margin-top: 8px;
  line-height: 1.3;
`;