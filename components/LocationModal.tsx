import { Anchor, Box, Image, Text } from "@mantine/core";
import styled from 'styled-components';

export default function LocationModal() {
  return (
    <LocationModalWrap>
      <Box sx={(theme) => ({ fontSize: theme.fontSizes.sm })}>
        <CenteredBoldText>
          경기 부천시 부천로 3-1 <br />
          (지번) 경기도 부천시 원미구 심곡동 173-1
        </CenteredBoldText>
        {/* <Divider />
        <Anchor href="tel:032-228-8000">📞 032-228-8000</Anchor>
        <br />
        <Anchor href="https://www.chaerimwedding.com" target="_blank">
          https://www.chaerimwedding.com/
        </Anchor> */}
        <Image
          src="https://www.chaerimwedding.com/modules/page/skins/sub/img/about/about_location_info_item_map.jpg"
          width="100%"
          alt="map"
          my={20}
        />
        <dl className="mapUse">
          <dt>
            <strong>지하철 이용시</strong>
          </dt>
          <dd className="color">
          📍지하철 1호선 부천역 (북부역광장 방면)
            <li>3번, 4번, 7번출구 이용</li>
          </dd>
          <dt>
            <strong>버스 이용시</strong>
          </dt>
          <dd>
          📍부천북부역 하차
            <li>
              3, 5, 5-3, 5-4, 5-5, 8, 11, 12-1, 23-1, 50, 66, 70-2, 75, 606, 661{" "}
              <br />
            </li>
          </dd>
          <dt>
            <strong>자가용 이용시</strong>
          </dt>
          <dd className="color">
          📍네비게이션 : 채림웨딩홀, <br/> 부천시 원미구 심곡동 173-1
            <li>경인고속도로 부천 IC에서 약 15분 소요</li>
            <li>서울 외곽순환도로 시흥 IC에서 약 15분 소요</li>
            <li>주차 : 전용주차장 3시간 무료</li>
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

const Divider = styled.div`
  width: 80%;
  margin: 10px auto;
  border-bottom: 1px solid black; 
`;

const LocationModalWrap = styled.div`
  padding: 15px;
  text-align: center;
  .mapUse {
    text-align: center;
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
