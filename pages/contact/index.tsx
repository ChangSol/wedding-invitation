import React, { useState } from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    
      <ContactContainer>
        <CloseBtn>X</CloseBtn>
        
        <ContactTile>
          <p>CONTACT</p>
          <h3>연락하기</h3>
        </ContactTile>

        <GroomWrap>
          <GroomTitle>
            신랑측
            <GroomEng>
              GROOM
            </GroomEng>
          </GroomTitle>
          <ContactLine></ContactLine>
          <GroomContact>
            <ContactTitle>
              <li>신랑</li>
              <li>신랑 아버지</li>
              <li>신랑 어머니</li>
            </ContactTitle>
            <ContactName>
              <li>이창주</li>
              <li>이정훈</li>
              <li>윤석이</li>
            </ContactName>
            <ConatactTel>
              <li>전화 문자</li>
              <li>전화 문자</li>
              <li>전화 문자</li>
            </ConatactTel>
          </GroomContact>
        </GroomWrap>

        <BrideWrap>
          <BrideTitle>
            신부측
            <BrideEng>
              BRIDE
            </BrideEng>
          </BrideTitle>
          <ContactLine></ContactLine>
          <BrideContact>
            <ContactTitle>
              <li>신랑</li>
              <li>신랑 아버지</li>
              <li>신랑 어머니</li>
            </ContactTitle>
            <ContactName>
              <li>이창주</li>
              <li>이정훈</li>
              <li>윤석이</li>
            </ContactName>
            <ConatactTel>
              <li>전화 계좌</li>
              <li>전화 문자</li>
              <li>전화 문자</li>
            </ConatactTel>
          </BrideContact>
        </BrideWrap>

      </ContactContainer>
      
  );
};


//닫기버튼
const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
`

const ContactLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;  
  margin: 5px 0; 
`;


const ContactContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #474747;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-family: 'omyu_pretty';
`

const ContactTile = styled.div`
  text-align: center;
  p {
    font-size: 15px;
    letter-spacing: 3px;
  }
`
const GroomWrap = styled.div`
  width: 90%;
  margin: 0 atuo;
  margin-top: 40px;
`
const GroomTitle = styled.p`
  font-size: 18px;
`
const GroomEng = styled.span`
  font-size: 15px;
  color: #c0c0c0;
  margin-left: 10px;
  letter-spacing: 3px;
`
const GroomContact = styled.div`
  display: flex;
  justify-content: space-between;
`


const BrideWrap = styled.div`
  width: 90%;
  margin: 0 atuo;
  margin-top: 40px;
`
const BrideTitle = styled.p`
  font-size: 18px;
`
const BrideEng = styled.span`
  font-size: 15px;
  color: #c0c0c0;
  margin-left: 10px;
  letter-spacing: 3px;
`
const BrideContact = styled.div`
  display: flex;
  justify-content: space-between;
`


//공통 목록
const ContactTitle = styled.ul`
  li {
    margin-bottom: 10px;
  }
`
const ContactName = styled.ul`
  li {
    margin-bottom: 10px;
  }
`
const ConatactTel = styled.ul`
  li {
    margin-bottom: 10px;
  }
`

export default Contact;
