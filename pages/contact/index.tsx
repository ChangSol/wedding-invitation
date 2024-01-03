import { ActionIcon, Popover, Text, Stack, useMantineTheme, Box, CopyButton, Title } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconClipboard, IconClipboardCheck, IconCurrencyWon, IconPhoneCall } from '@tabler/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { BottomSheet } from 'react-spring-bottom-sheet';

import 'react-spring-bottom-sheet/dist/style.css';

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
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const [bottomPopupOpen, setBottomPopupOpen] = useState(false);

  const handleDismiss = () => {
    setBottomPopupOpen(false);
  };

  const [bankImageName, setBankImageName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  React.useEffect(() => {
    if (bankName === '기업은행') {
      setBankImageName('ibk');
    } else if (bankName === '신한은행') {
      setBankImageName('shinhan');
    } else if (bankName === '지역농협') {
      setBankImageName('nh');
    } else if (bankName === '토스뱅크') {
      setBankImageName('toss');
    }
  }, [bankName]);

  const copyStyle = {
    display: 'inline-block',
    outline: 0,
    appearance: 'none',
    padding: '0px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgb(249, 251, 250)',
    border: '1px solid rgb(137, 151, 155)',
    boxShadow: 'rgb(6 22 33 / 30%) 0px 1px 2px',
    color: 'rgb(61, 79, 88)',
    fontSize: '14px',
    fontWeight: 400,
    height: '36px',
    transition: 'all 150ms ease-in-out 0s',
    ':hover': {
      color: 'rgb(61, 79, 88)',
      backgroundColor: 'rgb(255, 255, 255)',
      border: '1px solid rgb(93, 108, 116)',
      boxShadow: 'rgb(0 0 0 / 30%) 0px 4px 4px, rgb(231 238 236) 0px 0px 0px 3px',
    },
  };
  return (
    <>
      <BottomSheet
        style={{ zIndex: 99999, position: 'fixed' }}
        open={bottomPopupOpen}
        snapPoints={({}) => [110, 120]}
        onDismiss={handleDismiss}
      >
        <Stack spacing={10} ml={20} mt={20} mr={20}>
          <div>
            <Image
              width={25}
              height={25}
              src={`/${bankImageName}.webp`}
              alt={`${bankImageName}`}
              placeholder="blur"
              blurDataURL={`/${bankImageName}.webp`}
            />
          </div>
          <div style={{ position: 'absolute', display: 'inline-block', marginLeft: '20px' }}>
            <Text sx={{ fontWeight: 600 }} ml={10}>
              {bankName}
            </Text>
            {/* <Text sx={{ position: 'absolute', display: 'inline-block', fontWeight: 500 }} ml={10}>
              {accountNumber}
            </Text> */}
            {/* <Text
              style={{
                position: 'absolute',
                display: 'inline-block',
                fontSize: '15px',
                fontWeight: 800,
                marginTop: '2px',
                marginLeft: '10px',
              }}
            >
              {bankName}
            </Text> */}
            {/* <Text
              style={{
                position: 'absolute',
                display: 'inline-block',
                fontSize: '15px',
                fontWeight: 800,
                marginTop: '2px',
                marginLeft: '90px',
              }}
            >
              {accountNumber}
            </Text> */}
          </div>
          <div style={{ position: 'absolute', display: 'inline-block', marginLeft: '85px' }}>
            <Text sx={{ fontWeight: 600 }} ml={10}>
              {accountNumber}
            </Text>
          </div>
          <div style={{ position: 'absolute', display: 'inline-block', top: 33, right: 20 }}>
            <CopyButton value={`${accountNumber}` + ' ' + `${bankName}`}>
              {({ copied, copy }) =>
                copied ? (
                  <CopyButton2>
                    <ActionIcon
                      sx={{
                        width: '100%',
                        padding: '2px',
                      }}
                      onClick={copy}
                      color="teal"
                    >
                      <IconClipboardCheck size={22} style={{ float: 'left' }} />
                      <Text
                        ml={5}
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        복사완료
                      </Text>
                    </ActionIcon>
                  </CopyButton2>
                ) : (
                  <CopyButton2>
                    <ActionIcon
                      sx={{
                        width: '100%',
                        padding: '2px',
                      }}
                      onClick={copy}
                      color=""
                    >
                      <IconClipboard size={22} style={{ float: 'left' }} />
                      <Text
                        ml={5}
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        복사하기
                      </Text>
                    </ActionIcon>
                  </CopyButton2>
                )
              }
            </CopyButton>
          </div>
        </Stack>
      </BottomSheet>

      <ContactContainer>
        <CloseBtn onClick={clickModal}>
          <IoClose />
        </CloseBtn>
        <ContactTitleHeader>
          <p>CONTACT</p>
          <h3>연락하기</h3>
        </ContactTitleHeader>

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
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_GROOM_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_GROOM_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_GROOM_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>
                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_GROOM_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_GROOM_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_GROOM_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
                  </div>
                </div>
                <div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_GROOM_DAD_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                      <li></li>
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_GROOM_DAD_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_GROOM_DAD_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>

                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                          <li></li>
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_GROOM_DAD_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_GROOM_DAD_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_GROOM_DAD_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
                  </div>
                </div>
                <div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_GROOM_MOM_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                      <li></li>
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_GROOM_MOM_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_GROOM_MOM_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>
                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                          <li></li>
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_GROOM_MOM_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_GROOM_MOM_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_GROOM_MOM_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
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
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_BRIDE_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                      <li></li>
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_BRIDE_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>
                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                          <li></li>
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_BRIDE_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
                  </div>
                </div>
                <div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_BRIDE_DAD_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                      <li></li>
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_BRIDE_DAD_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_BRIDE_DAD_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>
                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                          <li></li>
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_BRIDE_DAD_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_BRIDE_DAD_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_BRIDE_DAD_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
                  </div>
                </div>
                <div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon component={NextLink} href={'tel:' + `${process.env.NEXT_PUBLIC_BRIDE_MOM_PHONE}`}>
                      <IconPhoneCall size={20} color="white" />
                      <li></li>
                    </ActionIcon>
                  </div>
                  <div style={{ float: 'left' }}>
                    <ActionIcon
                      onClick={() => {
                        setBankName(`${process.env.NEXT_PUBLIC_BRIDE_MOM_BANK_NAME}`);
                        setAccountNumber(`${process.env.NEXT_PUBLIC_BRIDE_MOM_ACCOUNT}`);
                        setBottomPopupOpen(true);
                      }}
                    >
                      <IconCurrencyWon size={20} color="white" />
                    </ActionIcon>
                    {/* <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                      <Popover.Target>
                        <ActionIcon>
                          <IconCurrencyWon size={20} color="white" />
                          <li></li>
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown p={5} px={10}>
                        <Stack spacing={3} sx={{ position: 'relative' }} align="flex-end">
                          <Text color="black" size={theme.fontSizes.xs}>
                            {process.env.NEXT_PUBLIC_BRIDE_MOM_ACCOUNT}
                          </Text>
                          <Text
                            color="black"
                            size={theme.fontSizes.xs}
                            style={{
                              margin: '2px 9px 0px 0px',
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
                                float: 'left',
                                margin: '2px 5px 0px 0px',
                              }}
                            />
                            {process.env.NEXT_PUBLIC_BRIDE_MOM_BANK_NAME}
                          </Text>
                        </Stack>
                        <Box sx={{ position: 'absolute', top: 10, left: 5 }}>
                          <CopyButton
                            value={
                              `${process.env.NEXT_PUBLIC_BRIDE_MOM_ACCOUNT}` +
                              ' ' +
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
                    </Popover> */}
                  </div>
                </div>
              </ConatactTel>
            </BrideContact>
          </BrideWrap>
        </ContactContents>
      </ContactContainer>
    </>
  );
};

export default Contact;

const CommonMarginBottom = `
  margin-bottom: 10px;
`;

//닫기버튼
const CloseBtn = styled.div`
  position: absolute;
  top: 1%;
  right: 2%;
  cursor: pointer;
  font-size: 26px;
  font-family: 'GowunDodum-Regular';
`;

const ContactLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 5px 0 20px 0;
`;

const ContactContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #1f2520;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  font-family: 'GowunDodum-Regular';
  z-index: 9998;
  font-size: 18px;
`;
// font-family: "omyu_pretty";

const ContactTitleHeader = styled.div`
  position: absolute;
  top: 15%;
  text-align: center;
  letter-spacing: 3px;
  p {
    font-size: 10px;
    letter-spacing: 2.5px;
    color: rgba(255, 255, 255, 0.7);
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
  font-size: 14px;
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
  font-size: 14px;
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
    color: rgba(255, 255, 255, 0.7);
  }
`;
const ContactName = styled.ul`
  li {
    margin-bottom: 10px;
    font-weight: 600;
  }
`;
const ConatactTel = styled.ul`
  display: flex;
  flex-direction: column;
  li {
    margin-bottom: 10px;
  }
  > div {
    ${CommonMarginBottom}
  }
`;

const CopyButton2 = styled.button`
  display: inline-block;
  outline: 0;
  appearance: none;
  padding: 0px 12px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  background-color: rgb(249, 251, 250);
  border: 1px solid rgb(137, 151, 155);
  box-shadow: rgb(6 22 33 / 30%) 0px 1px 2px;
  color: rgb(61, 79, 88);
  font-size: 14px;
  font-weight: 400;
  height: 36px;
  transition: all 150ms ease-in-out 0s;

  &:hover {
    color: rgb(61, 79, 88);
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(93, 108, 116);
    box-shadow:
      rgb(0 0 0 / 30%) 0px 4px 4px,
      rgb(231 238 236) 0px 0px 0px 3px;
  }
`;
