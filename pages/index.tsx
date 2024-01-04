import {
  ActionIcon,
  Anchor,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTrashX } from '@tabler/icons';
import Fs from 'fs';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import path from 'path';
import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styled from 'styled-components';
import Countdown from '../components/Countdown';
import KakaoMap from '../components/KakaoMap';
import LocationModal from '../components/LocationModal';
import {
  ICongratulationCreate,
  ICongratulationData,
  ICongratulationParams,
  useDeleteCongratulationMutation,
  useGetCongratulationsInfinityQuery,
  usePostCongratulationMutation,
} from '../queries';
import Contact from './contact';
import moment from 'moment';

// gallery image props
export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), 'public/pictures'));
  return {
    props: { images },
  };
};

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCongratulation, setSelectedCongratulation] = useState<ICongratulationData | null>(null);
  const [commentPwModalOpened, setCommentPwModalOpened] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [params, setParams] = React.useState<ICongratulationParams>({
    sortType: 'NEW',
    limit: 10,
  });

  // 연락하기 모달
  const clickModalContact = () => setShowModalContact(!showModalContact);

  // gallery image object
  const imageObjects = images
    .filter((x) => x !== 'thumbnail')
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((image) => ({
      original: `/pictures/${image}`,
      thumbnail: `/pictures/thumbnail/${image}`,
    }));

  const [isFullScreen, setIsFullScreen] = useState(false);

  // 모달 오버레이에서 스크롤 방지
  React.useEffect(() => {
    console.log('isFullScreen useEffect');
    if (isFullScreen) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [isFullScreen]);

  // 축하글 조회 Query
  const getCongratulationsInfinityQuery = useGetCongratulationsInfinityQuery(params);

  // 축하글 Form
  const form = useForm<ICongratulationCreate>({
    initialValues: {
      name: '',
      password: '',
      contents: '',
    },
    validate: {
      name: (value) => {
        if (!value) {
          return '이름을 입력해주세요.';
        }
        if (value.length < 2) {
          return '이름을 2자 이상 입력해주세요.';
        }
        if (value.length > 10) {
          return '이름은 10자 이하만 가능합니다.';
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return '비밀번호를 입력해주세요. ';
        }
        if (value.length < 4) {
          return '비밀번호는 4자 이상 입력해주세요.';
        }
        if (value.length > 12) {
          return '비밀번호는 12자 이하로 입력해주세요.';
        }
        return null;
      },
      contents: (value) => {
        if (!value) {
          return '축하글을 입력해주세요.';
        }
        if (value.length > 200) {
          return '200자 이하까지 작성 가능합니다.';
        }
        return null;
      },
    },
  });

  // 축하글 삭제 Password Form
  const deletePwForm = useForm({
    initialValues: {
      password: '',
    },
  });

  // 축하글 등록 Query
  const postCongratulationMutation = usePostCongratulationMutation();

  // 축하글 등록
  const onSubmitComment = async (data: ICongratulationCreate) => {
    const ok = window.confirm('축하글을 남기시겠습니까? ');
    if (ok) {
      setLoading(true);

      postCongratulationMutation.mutate(data, {
        onSuccess: () => alert('축하글을 남겼습니다.'),
        onError: (error: any) =>
          alert(error?.response?.data?.message ?? '서버에 문제가 발생헀습니다. 다시 시도해주세요.'),
      });
      form.reset();
      setLoading(false);
    }
  };

  // 축하글 삭제 Query
  const deleteCongratulationMutation = useDeleteCongratulationMutation();

  // 축하글 삭제
  const onDeleteComment = async (password: any) => {
    if (!selectedCongratulation) return;
    const ok = window.confirm('정말 삭제하시겠습니까? ');
    if (ok) {
      setLoading(true);

      deleteCongratulationMutation.mutate(
        { id: selectedCongratulation.id, password: password },
        {
          onSuccess: () => alert('삭제되었습니다.'),
          onError: (error: any) =>
            alert(error?.response?.data?.message ?? '서버에 문제가 발생헀습니다. 다시 시도해주세요.'),
        }
      );

      setLoading(false);
      setCommentPwModalOpened(false);
      deletePwForm.reset();
    }
  };

  // 축하글 무한 조회 스크롤 이벤트 처리
  React.useEffect(() => {
    function listener(event: DocumentEventMap['scroll']) {
      if (!loading && Math.ceil(window.scrollY + window.innerHeight + 30) > document.body.offsetHeight) {
        setLoading(true);
        getCongratulationsInfinityQuery.fetchNextPage();
      }
    }
    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
      setLoading(false);
    };
  }, [getCongratulationsInfinityQuery, loading]);

  return (
    <Stack
      p={0}
      justify="center"
      spacing="sm"
      sx={{
        margin: '0 auto',
        width: '100%',
        overflowY: 'scroll',
        overflowX: 'hidden',
      }}
    >
      <Main>
        <Day>2024 02 24</Day>
        <MainWrap>
          <MainImage>
            <Image
              src="/images/mobilemain.webp"
              alt="mobilemain"
              placeholder="blur"
              blurDataURL="/images/mobilemain.webp"
              layout="fill"
              objectFit="contain"
            />
          </MainImage>
        </MainWrap>
        <TextName>Changju and Shinhee</TextName>
        <TextDay>2024 02 24 SAT 1PM</TextDay>
      </Main>

      <Dday>
        <DdayWrap>
          <Countdown targetDate="2024-02-24T13:00:00" />
        </DdayWrap>
      </Dday>
      {/* 인사문구, 연락처 */}
      <Greetings>
        <TextWrap>
          <TitleEng>wedding day</TitleEng>
          <TitleKor>
            02
            <br />
            24
          </TitleKor>
          <Text
            align="center"
            sx={(theme) => ({
              fontSize: '16px',
              fontFamily: 'GowunDodum-Regular',
              lineHeight: 2.4,
              marginTop: '20px',
              marginBottom: '20px',
            })}
          >
            <GreetingDay>2024년 2월 24일 토요일 오후 1시</GreetingDay>
            <GreetingTitle>소중한 분들을 초대합니다.</GreetingTitle>
            평생을 함께 할 사람을 만났습니다. <br />
            지금까지 살아온 모습도 걸어온 길도 달랐지만 <br /> 이제 같은 곳을 바라보며 함께 걸어가고 싶습니다. <br />
            <br />
            손을 맞잡은 이 순간부터 <br />
            아름답고 소중한 기쁨으로 채워나갈 <br /> 저희의 여정을 지켜봐주세요. <br />
          </Text>
        </TextWrap>

        <FaceWrap>
          <Group id="avatarWrapper" position="center" spacing={10} sx={{ flexWrap: 'nowrap' }}>
            <Stack align="center" spacing="xs" className="face">
              <Text style={{ marginBottom: '10px', fontFamily: 'GowunDodum-Regular' }}>
                {process.env.NEXT_PUBLIC_GROOM_DAD_NAME} • {process.env.NEXT_PUBLIC_GROOM_MOM_NAME}
              </Text>
              <Text
                size={15}
                style={{
                  fontFamily: 'GowunDodum-Regular',
                }}
              >
                장남 <b>{process.env.NEXT_PUBLIC_GROOM_NAME}</b>
              </Text>
              <Face>
                <Image
                  src="/images/changju.webp"
                  alt="changju"
                  placeholder="blur"
                  blurDataURL="/images/changju.webp"
                  layout="fill"
                  objectFit="contain"
                />
              </Face>
            </Stack>

            <Stack align="center" spacing="xs">
              <Text style={{ marginBottom: '10px', fontFamily: 'GowunDodum-Regular' }}>
                {process.env.NEXT_PUBLIC_BRIDE_DAD_NAME} • {process.env.NEXT_PUBLIC_BRIDE_MOM_NAME}
              </Text>
              <Text
                size={15}
                style={{
                  fontFamily: 'GowunDodum-Regular',
                }}
              >
                장녀 <b>{process.env.NEXT_PUBLIC_BRIDE_NAME}</b>
              </Text>
              <Face>
                <Image
                  src="/images/shinhee.webp"
                  alt="shinhee"
                  placeholder="blur"
                  blurDataURL="/images/shinhee.webp"
                  layout="fill"
                  objectFit="contain"
                />
              </Face>
            </Stack>
          </Group>
        </FaceWrap>

        {/* 혼주에게 연락하기 */}
        <ContactParentsTitle onClick={clickModalContact}>혼주에게 연락하기</ContactParentsTitle>
        {showModalContact && <Contact clickModal={clickModalContact} />}
      </Greetings>

      <ImageGalleryWrapper>
        <GalleryTitle>Gallery</GalleryTitle>
        <ImageGallery
          items={imageObjects}
          autoPlay={false}
          infinite={true}
          showPlayButton={false}
          showFullscreenButton={true}
          showThumbnails={true}
          showIndex={false}
          showBullets={false}
          showNav={true}
          lazyLoad={true}
          useBrowserFullscreen={false}
          onScreenChange={(x) => {
            setIsFullScreen(x);
          }}
        />
      </ImageGalleryWrapper>

      {/* 지도  여기 오시는 길 부분*/}
      <Location>
        <div
          style={{
            fontFamily: 'CrimsonText-Regular',
            color: '#05652c',
            textAlign: 'center',
            fontSize: '14px',
            width: '80px',
            height: '24px',
            lineHeight: '24px',
            margin: '0 auto',
            border: '1px solid #05652c',
            borderRadius: '20px',
          }}
        >
          Location
        </div>
        <div style={{ height: '50px', clear: 'both' }}></div>
        <div
          style={{
            fontFamily: 'GowunDodum-Regular',
            // fontWeight: "bold",
            color: '#000',
            textAlign: 'center',
          }}
        >
          경기 부천시 부천로 3-1 <br />
          (지번) 경기도 부천시 원미구 심곡동 173-1
        </div>
        <div
          style={{
            fontFamily: 'GowunDodum-Regular',
            fontWeight: '600',
            color: '#333',
            // font-size: 4vw;
            textAlign: 'center',
            marginTop: '7px',
          }}
        >
          부천채림웨딩홀 6층 컨벤션홀
        </div>
        <div style={{ height: '30px', clear: 'both' }}></div>
        <KakaoMap />

        <div
          style={{
            width: '90%',
            margin: '0 auto',
            padding: '18px 0',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#F7F5EF',
          }}
        >
          <div
            style={{
              fontFamily: 'GowunDodum-Regular',
              fontSize: '13px',
              textAlign: 'center',
              borderRadius: '10px',
              color: '#333333',
              width: '30%',
              height: '40px',
              lineHeight: '40px',
              float: 'left',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              boxShadow: '3px 3px 4px rgba(0,0,0,0.1)',
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() => router.push('https://map.kakao.com/link/to/부천채림웨딩홀,37.484695,126.781874')}
            >
              <Image
                src="/kakaomap.webp"
                alt="kakaomap"
                placeholder="blur"
                blurDataURL="/kakaomap.webp"
                width={15}
                height={15}
              />
              <Text style={{ marginLeft: '5px', fontFamily: 'GowunDodum-Regular' }} size={theme.fontSizes.xs}>
                카카오맵
              </Text>
            </ActionIcon>
          </div>
          <div
            style={{
              fontFamily: 'MaruBuri-Regular',
              fontSize: '13px',
              textAlign: 'center',
              borderRadius: '10px',
              color: '#333333',
              width: '30%',
              height: '40px',
              lineHeight: '40px',
              float: 'left',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              boxShadow: '3px 3px 4px rgba(0,0,0,0.1)',
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() => router.push('https://map.naver.com/p/entry/place/13352022?c=15.00,0,0,0,dh')}
            >
              <Image
                src="/navermap.webp"
                width={15}
                height={15}
                alt="navermap"
                placeholder="blur"
                blurDataURL="/navermap.webp"
              />
              <Text style={{ marginLeft: '5px', fontFamily: 'GowunDodum-Regular' }} size={theme.fontSizes.xs}>
                네이버지도
              </Text>
            </ActionIcon>
          </div>
          <div
            style={{
              fontFamily: 'GowunDodum-Regular',
              fontSize: '13px',
              textAlign: 'center',
              borderRadius: '10px',
              color: '#333333',
              width: '30%',
              height: '40px',
              lineHeight: '40px',
              float: 'left',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              boxShadow: '3px 3px 4px rgba(0,0,0,0.1)',
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() =>
                router.push(
                  'https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=5YthFr8gDz2aQpXivtKab7Fe5IWlxDlW5V2VyPKP&lat=37.484695&lon=126.781874&name=%EB%B6%80%EC%B2%9C%EC%B1%84%EB%A6%BC%EC%9B%A8%EB%94%A9%ED%99%80'
                )
              }
            >
              <Image src="/tmap.webp" width={15} height={15} alt="tmap" placeholder="blur" blurDataURL="/tmap.webp" />
              <Text style={{ marginLeft: '5px', fontFamily: 'GowunDodum-Regular' }} size={theme.fontSizes.xs}>
                티맵
              </Text>
            </ActionIcon>
          </div>
        </div>
        <LocationModal />
      </Location>

      <Parking>
        <ParkingInfo>
          <ParkingInfoTitle>
            <ParkingInfoP>🅿️ 주차안내</ParkingInfoP>
          </ParkingInfoTitle>
          <ParkingInfoText>
            전용 주차장에 주차 가능 (무료 3시간) <br />
            만차 시 이마트 주차 가능 (5000원 제공) <br />
            안내원의 유도에 따라주시면 감사하겠습니다.
          </ParkingInfoText>
        </ParkingInfo>
      </Parking>

      {/* Comment Section*/}
      <Paper
        px="sm"
        mx={0}
        my={10}
        py={5}
        radius="md"
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f9f4',
          color: theme.colors.dark[4],
          position: 'relative',
        }}
      >
        <Text my={10} size="md" align="center" sx={{ fontWeight: 300, fontFamily: 'GowunDodum-Regular' }}>
          😊 Celebrations 😊 <br />
          따뜻한 축하글을 남겨주세요 :)
        </Text>
        <Line />
        <Stack spacing={10} mb={5}>
          <Box
            p={5}
            py={10}
            sx={{
              backgroundColor: '#f8f9f4',
              borderRadius: theme.radius.md,
              fontFamily: 'GowunDodum-Regular',
              position: 'relative',
            }}
          >
            <form onSubmit={form.onSubmit(onSubmitComment)}>
              <Stack spacing={10} style={{ marginLeft: '30px', marginRight: '30px' }}>
                <TextInput
                  label="이름"
                  placeholder="이름을 입력해주세요."
                  minLength={2}
                  maxLength={10}
                  withAsterisk
                  {...form.getInputProps('name')}
                  styles={{
                    label: {
                      // Adjust the margin for the label
                      marginBottom: '5px', // You can adjust the value accordingly
                    },
                  }}
                  sx={{
                    width: '100%',
                    fontFamily: 'GowunDodum-Regular',
                  }}
                />

                <PasswordInput
                  label="비밀번호"
                  placeholder="비밀번호을 입력해주세요."
                  withAsterisk
                  minLength={4}
                  maxLength={12}
                  styles={{
                    label: {
                      // Adjust the margin for the label
                      marginBottom: '5px', // You can adjust the value accordingly
                    },
                  }}
                  sx={{
                    width: '100%',
                    fontFamily: 'GowunDodum-Regular',
                  }}
                  {...form.getInputProps('password')}
                />

                <TextInput
                  label="축하글"
                  placeholder="축하글을 작성해주세요."
                  minLength={1}
                  maxLength={200}
                  withAsterisk
                  {...form.getInputProps('contents')}
                  styles={{
                    label: {
                      // Adjust the margin for the label
                      marginBottom: '5px', // You can adjust the value accordingly
                    },
                  }}
                  sx={{
                    width: '100%',
                    fontFamily: 'GowunDodum-Regular',
                  }}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  sx={{
                    backgroundColor: '#05652c',
                    alignSelf: 'flex-end',
                    width: '100%',
                    height: 40,
                    fontFamily: 'GowunDodum-Regular',
                  }}
                  mt={5}
                >
                  축하글 남기기
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>

        {[...(getCongratulationsInfinityQuery.data?.pages.flat() ?? [])].map((data, i) => (
          <Box
            key={i}
            id="aComment"
            py={5}
            mt={7}
            mb={7}
            sx={{
              width: '90%',
              margin: '0 auto',
              backgroundColor: '#F7F5EF',
              borderRadius: theme.radius.md,
              fontFamily: 'GowunDodum-Regular',
              position: 'relative',
            }}
          >
            <Group noWrap>
              <Stack>
                <Group>
                  <Text
                    size="sm"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 700,
                      marginTop: '9px',
                      marginLeft: '10px',
                      fontFamily: 'GowunDodum-Regular',
                    }}
                  >
                    {data.name}
                  </Text>
                  <Text
                    size="sm"
                    color="dimmed"
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      fontFamily: 'GowunDodum-Regular',
                      position: 'absolute',
                      top: 10,
                      right: 40,
                    }}
                    pt={5}
                  >
                    {moment(new Date(data.createdAt)).format('YYYY-MM-DD')}
                  </Text>
                </Group>
                <Text
                  size="sm"
                  sx={{
                    lineBreak: 'anywhere',
                    marginLeft: '10px',
                    marginTop: '10px',
                    marginRight: '10px',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: 'GowunDodum-Regular',
                  }}
                >
                  {data.contents}
                </Text>
              </Stack>
            </Group>
            <Group sx={{ position: 'absolute', top: 10, right: 5 }} spacing="xs">
              <ActionIcon
                color="red"
                onClick={() => {
                  setSelectedCongratulation(data);
                  setCommentPwModalOpened(true);
                }}
              >
                <IconTrashX size={25} />
              </ActionIcon>
            </Group>
          </Box>
        ))}
      </Paper>

      {/* Comment PW Modal */}
      <Modal
        opened={commentPwModalOpened}
        centered
        withCloseButton={false}
        onClose={() => setCommentPwModalOpened(false)}
        size={350}
        styles={{
          modal: {
            background: theme.fn.rgba(theme.white, 0.8),
          },
        }}
      >
        <form onSubmit={deletePwForm.onSubmit(onDeleteComment)}>
          <Stack spacing={10} mb={5}>
            <Box
              p={5}
              py={10}
              sx={{
                backgroundColor: '#f4eee7',
                borderRadius: theme.radius.md,
                fontFamily: 'GowunDodum-Regular',
                position: 'relative',
              }}
            >
              <Stack spacing={10} style={{ marginLeft: '30px', marginRight: '30px' }}>
                <PasswordInput
                  label="비밀번호"
                  placeholder="비밀번호을 입력해주세요."
                  withAsterisk
                  minLength={4}
                  maxLength={12}
                  styles={{
                    label: {
                      // Adjust the margin for the label
                      marginBottom: '5px', // You can adjust the value accordingly
                    },
                  }}
                  sx={{
                    width: '100%',
                    fontFamily: 'GowunDodum-Regular',
                  }}
                  {...deletePwForm.getInputProps('password')}
                />

                <Button
                  disabled={loading}
                  type="submit"
                  sx={{
                    backgroundColor: 'red',
                    alignSelf: 'flex-end',
                    width: '100%',
                    height: 40,
                    fontFamily: 'GowunDodum-Regular',
                  }}
                  mt={5}
                >
                  축하글 삭제
                </Button>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Modal>

      {/* Footer */}
      <Anchor
        align="center"
        href="https://github.com/changsol"
        mt={10}
        mb={30}
        color="gray"
        style={{
          fontFamily: 'GowunDodum-Regular',
        }}
      >
        Copyright 2024. ChangSol all rights reserved.
      </Anchor>
    </Stack>
  );
};

export default Home;

const Main = styled.div`
  position: relative;
  background-color: #f8f9f4;
  padding: 3rem 1rem 3rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: 'INVITE YOU TO THE WEDDING';
    display: block;
    position: absolute;
    left: -57px;
    transform: rotate(270deg);
    font-size: 12px;
  }
  &::after {
    content: 'IT’S THE WEDDING DAY';
    display: block;
    position: absolute;
    right: -40px;
    transform: rotate(90deg);
    font-size: 12px;
  }
`;
const Day = styled.p`
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  border: 1px solid #05652c;
  margin-bottom: 20px;
  padding: 0 5px;
  border-radius: 25px;
`;

const Dday = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  background-color: #05652c;
`;

const MainWrap = styled.div`
  position: relative;
  width: 70%;
`;

const MainImage = styled.div`
  position: relative;
  // background-image: url("/images/mobilemain.jpg");
  // background-repeat: no-repeat;
  // background-size: 150%;
  // background-position: center;
  width: 100%;
  height: 380px;
  margin: 0 auto;
  border: 1px solid transparent;
  // filter: grayscale(100%);
`;

const TextName = styled.p`
  font-family: 'SOGANGUNIVERSITYTTF';
  position: relative;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 340px;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 1px;
  color: #03652b;
`;

const TextDay = styled.p`
  color: #547360;
`;

const Face = styled.div`
  border-image-source: none;
  width: 60px;
  height: 72px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 12px;
  position: relative;
`;

const DdayWrap = styled.div`
  border-radius: 0.3rem;
`;

const Greetings = styled.div`
  padding: 60px 10px 80px;
  background-color: #f8f9f4;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 16px;
`;

const GreetingDay = styled.h3`
  font-size: 18px;
  color: #1f2520;
`;
const GreetingTitle = styled.h3`
  font-size: 21px;
  margin-bottom: 30px;
  color: #1f2520;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
`;
const TitleEng = styled.h3`
  font-size: 1rem;
  color: #05652c;
`;
const TitleKor = styled.p`
  font-size: 1.2rem;
  line-height: 1;
  margin: 5px 0 40px 0;
  font-weight: bold;
  color: #05652c;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #f7f5ef;
  opacity: 0.3;
`;

const Location = styled.div`
  padding-top: 80px;
  background-color: #f7f5ef;
`;
const Navigation = styled.div`
  padding: 1.5rem;
  text-align: center;
`;
const FaceWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin: 40px 0 30px 0;
  & > #avatarWrapper {
    gap: 40px;
  }
`;

const ImageGalleryWrapper = styled.div`
  background-color: #f8f9f4;
  padding: 30px 0 10px 0;

  p {
    width: 70px;
    height: 24px;
    line-height: 24px;
    color: rgb(5, 101, 44);
    text-align: center;
    font-size: 14px;
    margin: 0px auto;
    border: 1px solid rgb(5, 101, 44);
    border-radius: 20px;
  }

  .image-gallery {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 50px 0 60px 0;
    background-color: #f8f9f4;
  }

  .image-gallery-swipe {
    position: relative;
  }

  .image-gallery-index {
    display: none;
  }

  .image-gallery-slide img {
    width: 100%;
    height: 570px;
    object-fit: cover;
    overflow: hidden;
    object-position: center center;
  }

  .image-gallery-thumbnails-container {
    width: 100%;
    margin: 0 auto;
  }

  .image-gallery-thumbnails {
    padding: 10px 0;
    background-color: #f8f9f4;
  }

  /* .image-gallery-content.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #f8f9f4;
    display: flex;
    flex-direction: column;
    z-index: 9999;
  } */

  /* .image-gallery-thumbnail.active,
	.image-gallery-thumbnail:focus {
		border: none;
	}

	.image-gallery-left-nav,
	.image-gallery-right-nav {
		display: none;
	} */

  .image-gallery-thumbnail.active,
  .image-gallery-thumbnail:focus {
    border: 3px solid #05652c;
  }
`;
const GalleryTitle = styled.p``;

const Parking = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  padding: 1rem;
  background-color: #fdfdfd;
  margin-bottom: 50px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 4px;
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

// 부모님 연락처 추가
const ParentsWrap = styled.div`
  margin-top: 18px;
  text-align: center;
  .parent {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
  span {
    font-size: 16px;
    margin-left: 3px;
  }
  .parents_name {
    margin-top: 15px;
  }
  .parents_send {
    display: flex;
  }
`;
// 혼주에게 연락하기
const ContactParents = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 2rem 0;
  background-color: #f4eee7;
`;
const ContactParentsTitle = styled.p`
  width: 65%;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 8px;
  padding: 10px 0;
  text-align: center;
  background-color: #f8f9f4;
  border: 1px solid #05652c;
  color: #05652c;
`;
const Parent = styled.div``;
