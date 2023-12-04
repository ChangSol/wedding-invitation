import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Button,
  CloseButton,
  CopyButton,
  Divider,
  Grid,
  Group,
  Modal,
  Notification,
  Overlay,
  Paper,
  PasswordInput,
  Popover,
  Stack,
  Text,
  Textarea,
  TextInput,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconBrandMessenger,
  IconCheck,
  IconClipboard,
  IconClipboardCheck,
  IconCurrencyWon,
  IconEdit,
  IconHeart,
  IconLink,
  IconPhone,
  IconShare,
  IconWriting,
} from "@tabler/icons";
import styled from "styled-components";
import type { GetStaticProps, NextPage } from "next";
import KakaoMap from "../components/KakaoMap";
import Fs from "fs";
import path from "path";
import React, { useRef, useState } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import LocationModal from "../components/LocationModal";
import { NextLink } from "@mantine/next";
import { kakaoShare } from "../lib/KakaoShare";
import { useForm } from "@mantine/form";
import {
  ICongratulationCreate,
  ICongratulationData,
  ICongratulationParams,
  useDeleteCongratulationMutation,
  useGetCongratulationsInfinityQuery,
  usePostCongratulationMutation,
} from "../queries";
import Countdown from "../components/Countdown";
import { FaCircleInfo } from "react-icons/fa6";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Image from "next/image";

export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), "public/pictures"));
  return {
    props: { images },
  };
};

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  // const [photoModalOpened, setPhotoModalOpened] = useState(false);
  // const [navigation, setNavigation] = useState(false);
  // const [locationInfo, setLocationInfo] = useState(false);
  // const [share, setShare] = useState(false);
  const [commentInputOpened, setCommentInputOpened] = useState(true);
  const [loading, setLoading] = useState(false);
  const [commentsArray, setCommentsArray] = useState<ICongratulationData[] | null>(null);
  const [selectedCongratulation, setSelectedCongratulation] = useState<ICongratulationData | null>(null);
  const [commentPasswordError, setCommentPasswordError] = useState(false);
  const [commentPwModalOpened, setCommentPwModalOpened] = useState(false);
  const [commentEditModalOpened, setCommentEditModalOpened] = useState(false);
  // const [isFullScreen, setIsFullScreen] = useState(false);
  // const [imagesArray, setImagesArray] = useState<string[]>(images);
  const [params, setParams] = React.useState<ICongratulationParams>({
    sortType: "NEW",
    limit: 10,
  });

  const getCongratulationsInfinityQuery = useGetCongratulationsInfinityQuery(params); //[];

  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries([CONGRATULATION_QUERY_KEY]);
  // const selectImage = (image: string) => {
  //   const copiedImages = [...images];
  //   const index = copiedImages.findIndex((item) => item === image);
  //   const previousImages = copiedImages.splice(0, index);
  //   const sortedImages = [...copiedImages, ...previousImages];
  //   setImagesArray(sortedImages);
  //   setPhotoModalOpened(true);
  // };

  const myImageGalleryRenderer = (item: any) => {
    return (
      <div>
        <Image
          src={item.original}
          alt={item.original}
          placeholder="blur"
          blurDataURL={item.original}
          layout="fill"
          objectFit="contain"
        />
      </div>
    );
  };

  const imageObjects = images
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((image) => ({
      original: `/pictures/${image}`,
      thumbnail: `/pictures/${image}`,
    }));

  // const imageGalleryRef = useRef<ImageGallery | null>(null);

  // const onClickHandlerImageGallery = () => {
  //   if (isFullScreen) {
  //     imageGalleryRef.current!.exitFullScreen();
  //     setIsFullScreen(false);
  //   } else {
  //     imageGalleryRef.current?.fullScreen();
  //     setIsFullScreen(true);
  //   }
  // };

  // const slides = imagesArray.map((image, i) => (
  //   <Carousel.Slide
  //     key={i}
  //     sx={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}
  //   >
  //     <Image src={`/pictures/${image}`} alt="wedding" width={600} sx={{ objectFit: 'cover' }} />
  //   </Carousel.Slide>
  // ));

  // const imagesGrid = images.map((image, i) => {
  //   const IMAGE = (
  //     <Image
  //       src={`/pictures/${image}`}
  //       alt="wedding"
  //       sx={{ width: '100%', cursor: 'pointer' }}
  //       radius="sm"
  //       onClick={() => {
  //         selectImage(image);
  //       }}
  //     />
  //   );
  //   if (i === 0) {
  //     return (
  //       <Grid.Col key={i} span={12}>
  //         {IMAGE}
  //       </Grid.Col>
  //     );
  //   }

  //   if (image.includes('wide')) {
  //     return (
  //       <Grid.Col key={i} span={6} sx={{ display: 'flex', alignItems: 'center' }}>
  //         {IMAGE}
  //       </Grid.Col>
  //     );
  //   }

  //   return (
  //     <Grid.Col key={i} span={4}>
  //       {IMAGE}
  //     </Grid.Col>
  //   );
  // });

  const form = useForm<ICongratulationCreate>({
    initialValues: {
      name: "",
      password: "",
      contents: "",
    },
    validate: {
      name: (value) => {
        if (!value) {
          return "이름을 입력해주세요.";
        }
        if (value.length < 2) {
          return "이름을 2자 이상 입력해주세요.";
        }
        if (value.length > 10) {
          return "이름은 10자 이하만 가능합니다.";
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return "비밀번호를 입력해주세요. ";
        }
        if (value.length < 4) {
          return "비밀번호는 4자 이상 입력해주세요.";
        }
        if (value.length > 12) {
          return "비밀번호는 12자 이하로 입력해주세요.";
        }
        return null;
      },
      contents: (value) => {
        if (!value) {
          return "축하글을 입력해주세요.";
        }
        if (value.length > 1000) {
          return "1000자 이하까지 작성 가능합니다.";
        }
        return null;
      },
    },
  });

  const postCongratulationMutation = usePostCongratulationMutation();
  const deleteCongratulationMutation = useDeleteCongratulationMutation();
  const commentOnSubmit = async (data: ICongratulationCreate) => {
    setLoading(true);

    postCongratulationMutation.mutate(data, {
      onSuccess: () => alert("등록되었습니다."),
      onError: (error: any) =>
        alert(error?.response?.data?.message ?? "서버에 문제가 발생헀습니다. 다시 시도해주세요."),
    });

    setLoading(false);
    setCommentInputOpened(false);
  };

  const editPwForm = useForm({
    initialValues: {
      password: "",
    },
  });

  const onDeleteComment = async (password: any) => {
    if (!selectedCongratulation) return;
    const ok = window.confirm("정말 삭제하시겠습니까? ");
    if (ok) {
      setLoading(true);

      deleteCongratulationMutation.mutate(
        { id: selectedCongratulation.id, password: password },
        {
          onSuccess: () => alert("삭제되었습니다."),
          onError: (error: any) =>
            alert(error?.response?.data?.message ?? "서버에 문제가 발생헀습니다. 다시 시도해주세요."),
        }
      );

      setLoading(false);
      setCommentEditModalOpened(false);
      setCommentInputOpened(false);
      setCommentPwModalOpened(false);
      editPwForm.reset();
    }
  };

  React.useEffect(() => {
    function listener(event: DocumentEventMap["scroll"]) {
      if (Math.ceil(window.scrollY + window.innerHeight + 30) > document.body.offsetHeight) {
        getCongratulationsInfinityQuery.fetchNextPage();
      }
    }
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [getCongratulationsInfinityQuery]);

  const myGalleryRenderItem = (item: any) => {
    return (
      <div className="image-gallery-image">
        <Image
          src={item.original}
          alt={item.original}
          placeholder="blur"
          blurDataURL={item.original}
          width={500}
          height={500}
        />
      </div>
    );
  };

  return (
    <Stack
      p={0}
      justify="center"
      spacing="sm"
      sx={{
        margin: "0 auto",
        maxWidth: theme.breakpoints.xs,
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      {/* Hero */}
      <div
        style={{ zIndex: 5000, position: "fixed", top: 0, left: 0 }}
        onClick={() => {
          getCongratulationsInfinityQuery.fetchNextPage();
        }}
      ></div>

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
        <TextDay>2024 2 24 SAT 1PM</TextDay>
        {/* <TextHall>부천채림웨딩홀</TextHall> */}
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
              fontSize: theme.fontSizes.sm,
            })}
          >
            평생을 함께 할 사람을 만났습니다. <br />
            지금까지 살아온 모습도 걸어온 길도 달랐지만 <br /> 이제 같은 곳을 바라보며 함께 걸어가고 싶습니다. <br />
            <br />
            손을 맞잡은 이 순간부터 <br />
            아름답고 소중한 기쁨으로 채워나갈 <br /> 저희의 여정을 지켜봐주세요. <br />
            <br />
            언젠가 &apos;서로 사랑하며 살아도 너무 짧은 삶이었다&apos;고 <br />
            말할 수 있도록 함께 노력하며 살겠습니다.
          </Text>
        </TextWrap>
        <Line></Line>
        <FaceWrap>
          <Group id="avatarWrapper" position="center" spacing={10} sx={{ flexWrap: "nowrap" }}>
            <Stack align="center" spacing="xs" className="face">
              <Stack spacing={0}>
                <Group spacing={5} sx={{ flexWrap: "nowrap" }}>
                  <Text>
                    {process.env.NEXT_PUBLIC_GROOM_DAD_NAME} • {process.env.NEXT_PUBLIC_GROOM_MOM_NAME}
                  </Text>
                </Group>
              </Stack>

              <Text>
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
              <Group spacing={7} sx={{ flexWrap: "nowrap" }}>
                <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_GROOM_PHONE}`}>
                  <IconPhone size={20} />
                </ActionIcon>
                <ActionIcon component="a" href={`${process.env.NEXT_PUBLIC_GROOM_KAKAO_QR}`} target="_blank">
                  <IconBrandMessenger size={20} />
                </ActionIcon>
                <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                  <Popover.Target>
                    <ActionIcon>
                      <IconCurrencyWon size={20} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown p={5} px={10}>
                    <Stack spacing={3} sx={{ position: "relative" }} align="flex-end">
                      <Text size={theme.fontSizes.xs}>{process.env.NEXT_PUBLIC_GROOM_ACCOUNT}</Text>
                      <Text
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
              </Group>
            </Stack>

            <Stack align="center" spacing="xs">
              <Stack spacing={0}>
                <Group spacing={5} sx={{ flexWrap: "nowrap" }}>
                  <Text>
                    {process.env.NEXT_PUBLIC_BRIDE_DAD_NAME} • {process.env.NEXT_PUBLIC_BRIDE_MOM_NAME}
                  </Text>
                </Group>
              </Stack>

              <Text>
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
              <Group spacing={7} sx={{ flexWrap: "nowrap" }}>
                <ActionIcon component={NextLink} href={"tel:" + `${process.env.NEXT_PUBLIC_BRIDE_PHONE}`}>
                  <IconPhone size={20} />
                </ActionIcon>
                <ActionIcon component="a" href={`${process.env.NEXT_PUBLIC_BRIDE_KAKAO_QR}`} target="_blank">
                  <IconBrandMessenger size={20} />
                </ActionIcon>
                <Popover width={140} position="bottom" withArrow shadow="md" radius="md">
                  <Popover.Target>
                    <ActionIcon>
                      <IconCurrencyWon size={20} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown p={5} px={10}>
                    <Stack spacing={2} sx={{ position: "relative" }} align="flex-end">
                      <Text size={theme.fontSizes.xs}>{process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}</Text>
                      <Text
                        size={theme.fontSizes.xs}
                        style={{
                          margin: "2px 9px 0px 0px",
                        }}
                      >
                        <Image
                          src="/kakaobank.webp"
                          alt="kakaobank"
                          placeholder="blur"
                          blurDataURL="/kakaobank.webp"
                          width={15}
                          height={15}
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
              </Group>
            </Stack>
          </Group>
        </FaceWrap>
        <></>
      </Greetings>

      <ImageGalleryWrapper>
        <GalleryTitle>Gallery</GalleryTitle>
        <ImageGallery
          items={imageObjects}
          // renderItem={myGalleryRenderItem}
          autoPlay={false}
          infinite={true}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={true}
          showIndex={true}
          showBullets={false}
          lazyLoad={true}
          // ref={imageGalleryRef}
          // onClick={onClickHandlerImageGallery}
        />
      </ImageGalleryWrapper>

      {/* <div style={{ height: "40px", clear: "both" }}></div> */}

      {/* 지도  여기 오시는 길 부분*/}
      <Location>
        <div
          style={{
            fontFamily: "CrimsonText-Regular",
            color: "#05652c",
            textAlign: "center",
            fontSize: "0.6rem",
            width: "60px",
            height: "16px",
            lineHeight: "16px",
            margin:"0 auto",
            border: "1px solid #05652c",
            borderRadius: "20px"
          }}
        >
          LOCATION
        </div>
        {/* <div
          style={{
            background: "#132F93",
            height: "1px",
            width: "7vw",
            margin: "15px auto",
          }}
        /> */}
        
        {/* <div
          style={{
            // fontFamily: "MaruBuri-Regular",
            color: "#05652c",
            fontSize: "1.2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          오시는길
        </div> */}
        <div style={{ height: "40px", clear: "both" }}></div>
        <div
          style={{
            fontFamily: "MaruBuri-Regular",
            // fontWeight: "bold",
            color: "#000",
            textAlign: "center",
          }}
        >
          경기 부천시 부천로 3-1 <br />
          (지번) 경기도 부천시 원미구 심곡동 173-1
        </div>
        <div
          style={{
            fontFamily: "MaruBuri-Regular",
            fontWeight: "600",
            color: "#333",
            // font-size: 4vw;
            textAlign: "center",
            marginTop: "7px",
          }}
        >
          부천채림웨딩홀 6층 컨벤션홀
        </div>
        <div style={{ height: "30px", clear: "both"  }}></div>
        <KakaoMap />
        {/* <div style={{ height: "20px", clear: "both" }}></div> */}
        <div style={{ width: "100%", margin: "0 auto", padding: "20px",
              display: "flex", justifyContent: "space-between",
              backgroundColor: "#F9F9F7"
              }}>
          <div
            style={{
              fontFamily: "MaruBuri-Regular",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "10px",
              color: "#333333",
              width: "30%",
              height: "40px",
              lineHeight: "40px",
              float: "left",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              boxShadow: "3px 3px 4px rgba(0,0,0,0.1)"
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() => router.push("https://map.kakao.com/link/to/부천채림웨딩홀,37.484695,126.781874")}
            >
              <Image
                src="/kakaomap.webp"
                alt="kakaomap"
                placeholder="blur"
                blurDataURL="/kakaomap.webp"
                width={15}
                height={15}
              />
              <Text style={{ marginLeft: "5px" }} size={theme.fontSizes.xs}>
                카카오맵
              </Text>
            </ActionIcon>
          </div>
          <div
            style={{
              fontFamily: "MaruBuri-Regular",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "10px",
              color: "#333333",
              width: "30%",
              height: "40px",
              lineHeight: "40px",
              float: "left",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              boxShadow: "3px 3px 4px rgba(0,0,0,0.1)"
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() => router.push("https://map.naver.com/p/entry/place/13352022?c=15.00,0,0,0,dh")}
            >
              <Image
                src="/navermap.webp"
                width={15}
                height={15}
                alt="navermap"
                placeholder="blur"
                blurDataURL="/navermap.webp"
              />
              <Text style={{ marginLeft: "5px" }} size={theme.fontSizes.xs}>
                네이버지도
              </Text>
            </ActionIcon>
          </div>
          <div
            style={{
              fontFamily: "MaruBuri-Regular",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "10px",
              color: "#333333",
              width: "30%",
              height: "40px",
              lineHeight: "40px",
              float: "left",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              boxShadow: "3px 3px 4px rgba(0,0,0,0.1)"
            }}
          >
            <ActionIcon
              sx={{ width: 130 }}
              onClick={() =>
                router.push(
                  "https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=5YthFr8gDz2aQpXivtKab7Fe5IWlxDlW5V2VyPKP&lat=37.484695&lon=126.781874&name=%EB%B6%80%EC%B2%9C%EC%B1%84%EB%A6%BC%EC%9B%A8%EB%94%A9%ED%99%80"
                )
              }
            >
              <Image src="/tmap.webp" width={15} height={15} alt="tmap" placeholder="blur" blurDataURL="/tmap.webp" />
              <Text style={{ marginLeft: "5px" }} size={theme.fontSizes.xs}>
                티맵
              </Text>
            </ActionIcon>
          </div>
        </div>
        <LocationModal />
        {/*<Button*/}
        {/*  color="yellow.5"*/}
        {/*  sx={{ width: "84%" }}*/}
        {/*  onClick={() => setShare(true)}*/}
        {/*>*/}
        {/*  <IconShare size={15} /> <Text ml={5}>공유하기</Text>*/}
        {/*</Button>*/}
        {/*<Navigation>*/}
        {/*  /!*<Button*!/*/}
        {/*  /!*  color="blue.5"*!/*/}
        {/*  /!*  sx={{ width: "40%", marginRight: "10%" }}*!/*/}
        {/*  /!*  onClick={() => setLocationInfo(true)}*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*</Button>*!/*/}
        {/*  <Button*/}
        {/*    color="green.5"*/}
        {/*    sx={{ width: "40%" }}*/}
        {/*    onClick={() => setNavigation(true)}*/}
        {/*  >*/}
        {/*    🚘 네비게이션*/}
        {/*  </Button>*/}

        {/*  /!*<Button*!/*/}
        {/*  /!*  color="yellow.5"*!/*/}
        {/*  /!*  sx={{ width: "84%" }}*!/*/}
        {/*  /!*  onClick={() => setShare(true)}*!/*/}
        {/*  /!*>*!/*/}
        {/*  /!*  <IconShare size={15} /> <Text ml={5}>공유하기</Text>*!/*/}
        {/*  /!*</Button>*!/*/}
        {/*</Navigation>*/}
      </Location>
      {/* <BackgroundImage src={heroImage.src}>

      <BackgroundImage src={heroImage.src}>
        <Stack
          id="hero"
          m={0}
          p={0}
          align="center"
          justify="space-between"
          sx={{
            width: '100%',
            height: '100vh',
            maxHeight: 700,
            color: theme.colors.gray[0],
          }}
        >
          <Stack
            justify="space-between"
            sx={{
              flex: 1,
            }}
          >
            <Text
              align="center"
              py={10}
              sx={{
                fontSize: theme.fontSizes.md,
                letterSpacing: 8,
                fontWeight: 600,
                background: 'linear-gradient(to bottom,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))',
              }}
            >
              결혼한다람쥐🐿️
            </Text>
            <Text
              align="center"
              py={1}
              sx={{
                fontSize: theme.fontSizes.md,
                letterSpacing: 8,
                marginTop: 80,
                paddingRight: 65,
                fontWeight: 600,
                background: 'black',
              }}
            >
              뱃살가려
            </Text>
            <Stack
              id="heroBottom"
              align="center"
              spacing="xs"
              pb={5}
              sx={{
                width: theme.breakpoints.xs,
                background: 'linear-gradient(to top,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))',
              }}
            >
              <Text
                align="center"
                sx={{
                  fontSize: theme.fontSizes.sm,
                  fontWeight: 400,
                  letterSpacing: 10,
                }}
              >
                창솔루션 ❤️ 시니천사
              </Text>
              <Text
                align="center"
                sx={{
                  fontSize: theme.fontSizes.xl,
                  fontWeight: 700,
                  letterSpacing: 12,
                }}
              >
                결혼합니다
              </Text>
              <Text
                align="center"
                sx={{
                  fontSize: theme.fontSizes.sm,
                  fontWeight: 300,
                  letterSpacing: 3,
                }}
              >
                2024 . 02 . 24 . 오후 01 : 00
              </Text>
              <Text
                mt={-8}
                align="center"
                sx={{
                  fontSize: theme.fontSizes.xs,
                  fontWeight: 300,
                  letterSpacing: 9,
                }}
              >
                채림 웨딩홀
              </Text>
              <UnstyledButton
                sx={{
                  color: theme.colors.gray[0],
                }}
                onClick={() => scrollIntoView({ alignment: 'start' })}
              >
                <IconArrowDownCircle size={30} opacity={0.8} />
              </UnstyledButton>
            </Stack>
          </Stack>
        </Stack>
      </BackgroundImage> */}
      
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
      </Parking>

      {/* Avatar Info */}
      {/* <Paper
        shadow="sm"
        px="sm"
        mx={5}
        py={5}
        radius="md"
        withBorder
        sx={{
          height: "100%",
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      > */}
        {/* <Image src="/flower.svg" alt="flower" width={250} mx="auto" mb="xl" /> */}

        {/* <Group id="avatarWrapper" position="center" spacing={8} sx={{ flexWrap: "nowrap" }}>
          <Box>
            <IconHeart size={25} opacity={0.3} />
          </Box>
        </Group> */}
        {/* <Image src="/flower2.svg" alt="flower" width={250} mx="auto" mt={9} /> */}
      {/* </Paper> */}
      

      {/* Comment Section*/}
      <Paper
        shadow="sm"
        px="sm"
        mx={5}
        py={5}
        radius="md"
        withBorder
        sx={{
          height: "100%",
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
          position: "relative",
        }}
      >
        <ActionIcon
          hidden={commentInputOpened}
          color="blue"
          sx={{ position: "absolute", top: 10, right: 20 }}
          onClick={() => setCommentInputOpened(true)}
        >
          <IconWriting size={30} />
        </ActionIcon>
        <Text my={10} size="md" align="center" sx={{ fontWeight: 300 }}>
          😊 Celebrations 😊 <br />
          따뜻한 축하글을 남겨주세요 :)
        </Text>
        <Stack spacing={10} mb={5}>
          <Transition mounted={commentInputOpened} transition="fade" duration={500} timingFunction="ease">
            {(styles) => (
              <Box
                style={styles}
                p={5}
                py={20}
                sx={{
                  backgroundColor: theme.colors.gray[2],
                  borderRadius: theme.radius.md,
                  position: "relative",
                }}
              >
                <form onSubmit={form.onSubmit(commentOnSubmit)}>
                  <Stack spacing={10}>
                    <Group spacing={0} position="center">
                      <TextInput
                        placeholder="성함을 입력해주세요."
                        label="성함"
                        minLength={2}
                        maxLength={10}
                        withAsterisk
                        {...form.getInputProps("name")}
                        sx={{
                          width: 180,
                        }}
                      />
                      <PasswordInput
                        label="비밀번호"
                        withAsterisk
                        ml={10}
                        minLength={4}
                        maxLength={12}
                        sx={{ width: 98 }}
                        {...form.getInputProps("password")}
                      />
                      <CloseButton
                        size="lg"
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={() => setCommentInputOpened(false)}
                      />
                    </Group>
                    <Stack align="center" spacing={10}>
                      <Textarea
                        placeholder="축하 인사말을 작성해주세요."
                        label="인사말"
                        withAsterisk
                        {...form.getInputProps("contents")}
                        sx={{
                          width: 290,
                        }}
                        m={0}
                      />

                      <Button
                        disabled={loading}
                        type="submit"
                        mr={20}
                        sx={{
                          alignSelf: "flex-end",
                          width: 90,
                          height: 35,
                        }}
                      >
                        입력
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            )}
          </Transition>

          {[...(getCongratulationsInfinityQuery.data?.pages.flat() ?? [])].map((data, i) => (
            <Box
              key={i}
              id="aComment"
              p={5}
              style={{
                height: "100%",
                position: "relative",
                backgroundColor: theme.colors.gray[2],
                borderRadius: theme.radius.md,
              }}
            >
              <Group noWrap>
                <Stack spacing={0}>
                  <Group>
                    작성자명 :
                    <Text size="sm" sx={{ fontWeight: 500 }}>
                      {data.name}
                    </Text>
                    작성일시 :
                    <Text size={10} color="dimmed">
                      {new Date(data.createdAt).toLocaleDateString("ko")}
                    </Text>
                  </Group>
                  작성내용
                  <Text size="sm" mt={5} sx={{ lineBreak: "anywhere" }}>
                    {data.contents}
                  </Text>
                </Stack>
              </Group>
              <Group sx={{ position: "absolute", top: 5, right: 5 }} spacing="xs">
                <ActionIcon
                  color="blue"
                  onClick={() => {
                    setSelectedCongratulation(data);
                    setCommentPwModalOpened(true);
                  }}
                >
                  <IconEdit size={20} />
                </ActionIcon>
              </Group>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Navigation Modal */}
      {/* <Modal
        opened={navigation}
        onClose={() => setNavigation(false)}
        centered
        withCloseButton={true}
        styles={{
          modal: {
            width: "200px",
            height: "auto",
            background: theme.fn.rgba(theme.white, 0.5),
          },
          close: {
            margin: "0px 10px 0px 0px",
            // backgroundColor: theme.fn.rgba(theme.white, 0.5),
            color: theme.colors.dark[4],
            // borderRadius: "50%",
          },
          // title: {
          //   margin: "0 auto",
          // },
        }}
      >
        <Group position="center" spacing="xl">
          <ActionIcon
            sx={{ width: 200 }}
            onClick={() => router.push("https://map.kakao.com/link/to/부천채림웨딩홀,37.484695,126.781874")}
          >
            <Image src="/kakaomap.png" width={20} alt="kakaomap" placeholder="blur" />
            <Text size={theme.fontSizes.xs}>카카오맵</Text>
          </ActionIcon>
          <ActionIcon
            sx={{ width: 200 }}
            onClick={() => router.push("https://map.naver.com/p/entry/place/13352022?c=15.00,0,0,0,dh")}
          >
            <Image src="/navermap.png" width={20} alt="navermap" placeholder="blur" />
            <Text size={theme.fontSizes.xs}>네이버지도</Text>
          </ActionIcon>

          <ActionIcon
            sx={{ width: 200 }}
            onClick={() =>
              router.push(
                "https://www.tmap.co.kr/tmap2/mobile/route.jsp?appKey=5YthFr8gDz2aQpXivtKab7Fe5IWlxDlW5V2VyPKP&lat=37.484695&lon=126.781874&name=%EB%B6%80%EC%B2%9C%EC%B1%84%EB%A6%BC%EC%9B%A8%EB%94%A9%ED%99%80"
              )
            }
          >
            <Image src="/tmap.jpg" width={20} alt="tmap" placeholder="blur" />
            <Text size={theme.fontSizes.xs}>티맵</Text>
          </ActionIcon>
        </Group>
      </Modal> */}

      {/* 오시는 길 Modal */}
      {/* <Modal
        title="채림웨딩홀 오시는 길"
        opened={locationInfo}
        onClose={() => setLocationInfo(false)}
        size="md"
        overflow="inside"
        withCloseButton={true}
        centered
        styles={{
          title: {
            margin: "15px auto 15px 145px",
          },
          close: {
            margin: "0px 15px 0px 0px",
          },
        }}
      >
        <LocationModal />
      </Modal> */}

      {/* Share Modal */}
      {/* <Modal
        opened={share}
        onClose={() => setShare(false)}
        centered
        withCloseButton={false}
        styles={{
          modal: {
            background: theme.fn.rgba(theme.white, 0.5),
          },
          close: {
            backgroundColor: theme.fn.rgba(theme.white, 0.5),
            color: theme.colors.dark[4],
            borderRadius: "50%",
          },
          title: {
            margin: "0 auto",
          },
        }}
      >
        <Group position="center" spacing="xl">
          <ActionIcon sx={{ width: 50 }} onClick={() => kakaoShare()}>
            <Image
              src="/kakaotalk.png"
              width={50}
              alt="kakaotalk"
              placeholder="blur"
              onClick={() => router.push("/")}
            />
          </ActionIcon>

          <CopyButton value="https://wedding-invitation.chang-ju.shin-hee.com">
            {({ copied, copy }) => {
              if (copied) {
                return (
                  <>
                    <Notification
                      icon={<IconCheck size={18} />}
                      color="teal"
                      sx={{
                        width: 200,
                        position: "absolute",
                        top: -60,
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                        zIndex: 999,
                      }}
                    >
                      주소 복사 완료
                    </Notification>
                    <ActionIcon
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: theme.colors.red[5],
                      }}
                      onClick={copy}
                    >
                      <IconLink size={40} color="white" />
                    </ActionIcon>
                  </>
                );
              } else {
                return (
                  <>
                    <Notification
                      icon={<IconCheck size={18} />}
                      color="teal"
                      sx={{
                        width: 200,
                        position: "absolute",
                        top: -60,
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                        zIndex: 999,
                      }}
                    >
                      주소 복사 미완료
                    </Notification>
                    <ActionIcon
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: theme.colors.green[5],
                      }}
                      onClick={copy}
                    >
                      <IconLink size={40} color="white" />
                    </ActionIcon>
                  </>
                );
              }
            }}
          </CopyButton>
        </Group>
      </Modal> */}

      {/* Comment PW Modal */}
      <Modal
        opened={commentPwModalOpened}
        centered
        withCloseButton={false}
        onClose={() => setCommentPwModalOpened(false)}
        size={240}
        styles={{
          modal: {
            background: theme.fn.rgba(theme.white, 0.8),
          },
        }}
      >
        <form onSubmit={editPwForm.onSubmit(onDeleteComment)}>
          <Group spacing={5} align="flex-end">
            <PasswordInput
              data-autofocus
              label="비밀번호"
              withAsterisk
              minLength={4}
              maxLength={8}
              sx={{ width: 160 }}
              {...editPwForm.getInputProps("password")}
            />
            <Button
              type="submit"
              p={0}
              sx={{
                width: 35,
                height: 35,
              }}
            >
              삭제
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Footer */}
      <Anchor align="center" href="https://github.com/changsol" mb={30} color="gray">
        Made by ChangSol
      </Anchor>
    </Stack>
  );
};

const Main = styled.div`
  position: relative;
  background-color: #f4eee7;
  padding: 3rem 1rem 3rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  &::before {
    content: "INVITE YOU TO THE WEDDING";
    display: block;
    position: absolute;
    left: -57px;
    transform: rotate(270deg);
    font-size: 12px;
  }
  &::after {
    content: "IT’S THE WEDDING DAY";
    display: block;
    position: absolute;
    right: -40px;
    transform: rotate(90deg);
    font-size: 12px;
  }
`;
const Day = styled.p`
  font-size: 0.6rem;
  display: flex;
  justify-content: center;
  border: 1px solid #03652b;
  margin-bottom: 20px;
  padding: 0 5px;
  border-radius: 25px;
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
  position: relative;
  bottom: 20px;
  font-family: "Hankc";
  display: flex;
  justify-content: center;
  width: 290px;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 1px;
  color: #03652b;
`;
const TextDay = styled.p``;
const TextHall = styled.span``;

const Face = styled.div`
  border-image-source: none;
  width: 60px;
  height: 72px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 12px;
  position: relative;
`;
const Dday = styled.div`
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  background-color: #05652c;
`;
const DdayWrap = styled.div`
  border-radius: 0.3rem;
`;

const Greetings = styled.div`
  padding: 2.6rem 1rem;
  background-color: #f4eee7;
  //background-image: url('/images/main.jpg');
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  // &::before {
  //   position: absolute;
  //   content: "";
  //   top:0px;
  //   left:0px;
  //   width: 100%;
  //   height: 100%;
  //   background-color: rgba(0,0,0,0.4);
`;
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TitleEng = styled.h3`
  font-size: 0.6rem;
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
  width: 1px;
  height: 30px;
  margin: 40px auto;
  background-color: #05652c;
  transform: rotateZ(45deg);
`;

const Location = styled.div`
  background-color: #f4eee7;
`;
const Navigation = styled.div`
  padding: 1.5rem;
  text-align: center;
`;
const FaceWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  & > #avatarWrapper {
    gap: 40px;
  }
`;

// const Modal = styled.div`
//   padding: 10px;
// `

const ImageGalleryWrapper = styled.div`
background-color: #f4eee7;
padding: 20px 0 10px 0;

  p {
    width: 60px;
    line-height: 16px;
    color: rgb(5, 101, 44);
    text-align: center;
    font-size: 0.6rem;
    margin: 0px auto;
    border: 1px solid rgb(5, 101, 44);
    border-radius: 20px;
  }

  .image-gallery {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 40px 0 60px 0;
  }

  .image-gallery-swipe {
    position: relative;
  }
  
  .image-gallery-index {
    display: none;
  }
  
  .image-gallery-slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    overflow: hidden;
    object-position: center center;
  }

  .image-gallery-thumbnails-container {
    width: 100%;
    margin: 0 auto;
  }

  .image-gallery-thumbnail.active, .image-gallery-thumbnail:focus {
    border: none;
  }
  
  .image-gallery-left-nav, .image-gallery-right-nav {
    display: none;
  }
`;
const GalleryTitle = styled.p`
  
`

const Parking = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  background-color: #f9f9f7;
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
export default Home;
