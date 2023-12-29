import { ActionIcon, Popover, Text, Stack, useMantineTheme, Box, CopyButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconClipboard, IconClipboardCheck, IconCurrencyWon, IconPhoneCall } from "@tabler/icons";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const Contact = (props: any) => {
  // 전달받은 state 함수
  const { clickModal } = props;
  const theme = useMantineTheme();

  React.useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <ContactContainer>
      <CloseBtn onClick={clickModal}>X</CloseBtn>
      <ContactTile>
        <p>CONTACT</p>
        <h3>연락하기</h3>
      </ContactTile>

      <ContactContents>
        <GroomWrap>
          <GroomTitle>
            신랑측
            <GroomEng>GROOM</GroomEng>
          </GroomTitle>
          <ContactLine></ContactLine>
          <GroomContact>
            <ContactTitle>
              <li>신랑</li>
              <li>신랑 아버지</li>
              <li>신랑 어머니</li>
            </ContactTitle>
            <ContactName>
              <li>{process.env.NEXT_PUBLIC_GROOM_NAME}</li>
              <li>{process.env.NEXT_PUBLIC_GROOM_DAD_NAME}</li>
              <li>{process.env.NEXT_PUBLIC_GROOM_MOM_NAME}</li>
            </ContactName>
            <ConatactTel>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_GROOM_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_GROOM_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_GROOM_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_GROOM_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_GROOM_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_GROOM_DAD_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_GROOM_DAD_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_GROOM_DAD_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_GROOM_DAD_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_GROOM_DAD_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_GROOM_MOM_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_GROOM_MOM_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_GROOM_MOM_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_GROOM_MOM_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_GROOM_MOM_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
            </ConatactTel>
          </GroomContact>
        </GroomWrap>

        <BrideWrap>
          <BrideTitle>
            신부측
            <BrideEng>BRIDE</BrideEng>
          </BrideTitle>
          <ContactLine></ContactLine>
          <BrideContact>
            <ContactTitle>
              <li>신랑</li>
              <li>신랑 아버지</li>
              <li>신랑 어머니</li>
            </ContactTitle>
            <ContactName>
              <li>{process.env.NEXT_PUBLIC_BRIDE_NAME}</li>
              <li>{process.env.NEXT_PUBLIC_BRIDE_DAD_NAME}</li>
              <li>{process.env.NEXT_PUBLIC_BRIDE_MOM_NAME}</li>
            </ContactName>
            <ConatactTel>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_BRIDE_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_BRIDE_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_BRIDE_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_BRIDE_DAD_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_BRIDE_DAD_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_BRIDE_DAD_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_BRIDE_DAD_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_BRIDE_DAD_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
              <div>
                <div style={{ float: "left" }}>
                  <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_BRIDE_MOM_PHONE}`}>
                    <IconPhoneCall size={20} color="white" />
                    <li>전화</li>
                  </ActionIcon>
                </div>
                <div style={{ float: "left" }}>
                  <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                    <Popover.Target>
                      <ActionIcon>
                        <IconCurrencyWon size={20} color="white" />
                        <li>계좌</li>
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown p={5} px={10}>
                      <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                        <Text color="black" size={theme.fontSizes.xs}>
                          {process.env.NEXT_PUBLIC_BRIDE_MOM_ACCOUNT}
                        </Text>
                        <Text
                          color="black"
                          size={theme.fontSizes.xs}
                          style={{
                            margin: "2px 9px 0px 0px",
                          }}
                        >
                          <Image
                            width={15}
                            height={15}
                            src="/kakaobank.webp"
                            alt="kakaobank"
                            placeholder="blur"
                            blurDataURL="/kakaobank.webp"
                            style={{
                              float: "left",
                              margin: "2px 5px 0px 0px",
                            }}
                          />
                          {process.env.NEXT_PUBLIC_BRIDE_MOM_BANK_NAME}
                        </Text>
                      </Stack>
                      <Box sx={{ position: "absolute", top: 10, left: 5 }}>
                        <CopyButton
                          value={
                            `${process.env.NEXT_PUBLIC_BRIDE_MOM_ACCOUNT}` +
                            " " +
                            `${process.env.NEXT_PUBLIC_BRIDE_MOM_BANK_NAME}`
                          }
                        >
                          {({ copied, copy }) =>
                            copied ? (
                              <ActionIcon onClick={copy} color="teal">
                                <IconClipboardCheck size={20} />
                              </ActionIcon>
                            ) : (
                              <ActionIcon onClick={copy} color="blue">
                                <IconClipboard size={20} />
                              </ActionIcon>
                            )
                          }
                        </CopyButton>
                      </Box>
                    </Popover.Dropdown>
                  </Popover>
                </div>
              </div>
            </ConatactTel>
          </BrideContact>
        </BrideWrap>
      </ContactContents>
    </ContactContainer>
  );
};

export default Contact;

//닫기버튼
const CloseBtn = styled.div`
  position: absolute;
  top: 1%;
  right: 5%;
  cursor: pointer;
  font-size: 20px;
`;

const ContactLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 5px 0;
`;

const ContactContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #474747;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-family: "omyu_pretty";
  z-index: 10000;
`;

const ContactTile = styled.div`
  position: absolute;
  top: 15%;
  text-align: center;
  p {
    font-size: 15px;
    letter-spacing: 3px;
  }
`;

const ContactContents = styled.div`
  position: absolute;
  top: 25%;
  left: 10%;
  width: 90%;
`;

const GroomWrap = styled.div`
  width: 90%;
  margin: 0 atuo;
  margin-top: 40px;
`;
const GroomTitle = styled.p`
  font-size: 18px;
`;
const GroomEng = styled.span`
  font-size: 15px;
  color: #c0c0c0;
  margin-left: 10px;
  letter-spacing: 3px;
`;
const GroomContact = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BrideWrap = styled.div`
  width: 90%;
  margin: 0 atuo;
  margin-top: 40px;
`;
const BrideTitle = styled.p`
  font-size: 18px;
`;
const BrideEng = styled.span`
  font-size: 15px;
  color: #c0c0c0;
  margin-left: 10px;
  letter-spacing: 3px;
`;
const BrideContact = styled.div`
  display: flex;
  justify-content: space-between;
`;

//공통 목록
const ContactTitle = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;
const ContactName = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;
const ConatactTel = styled.ul`
  li {
    margin-bottom: 10px;
  }
`;
