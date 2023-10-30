import {
  ActionIcon,
  Alert,
  Anchor,
  Avatar,
  BackgroundImage,
  Box,
  Button,
  CopyButton,
  Center,
  CloseButton,
  Divider,
  Grid,
  Group,
  Image,
  Modal,
  Notification,
  Overlay,
  Paper,
  PasswordInput,
  Popover,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconArrowDownCircle,
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
  IconUser,
  IconWriting,
  IconX,
} from "@tabler/icons";
import styled from 'styled-components';
import type { GetStaticProps, NextPage } from "next";
import KakaoMap from "../components/KakaoMap";
import heroImage from "../public/images/main.jpg";
import geonyAvatar from "../public/images/geony-profile.jpeg";
import boraAvatar from "../public/images/bora-edit.jpeg";
import Fs from "fs";
import path from "path";
import React, { useEffect, useRef, useState } from "react";
import { useClipboard, useScrollIntoView } from "@mantine/hooks";
import { useRouter } from "next/router";
import LocationModal from "../components/LocationModal";
import { NextLink } from "@mantine/next";
import { kakaoShare } from "../lib/KakaoShare";
import { useForm } from "@mantine/form";
import getRandomEmoji from "../lib/randomEmojis";
import { Carousel } from "@mantine/carousel";
import { api } from "../apis";
import { useQuery, useQueryClient } from "react-query";
import {
  CONGRATULATION_QUERY_KEY,
  ICongratulationData,
  ICongratulationParams,
  useGetCongratulationsInfinityQuery,
  useGetCongratulationsQuery,
} from "../queries";
import ClipboardJS from "clipboard";
import Countdown from "../components/Countdown";

interface CommentFormValues {
  name: string;
  password: string;
  payload: string;
}
interface IComment extends CommentFormValues {
  id: string;
  createdAt: number;
  avatar: string;
}

interface EditPwFormValues {
  password: string;
}

export const getStaticProps: GetStaticProps = () => {
  const images = Fs.readdirSync(path.join(process.cwd(), "public/pictures"));
  return {
    props: { images },
  };
};

const isMatchCommentPassword = (password: string, comment: IComment) => {
  if (comment.password === password) {
    return true;
  }
  return false;
};

const COMMENT = "comment";

const Home: NextPage<{ images: string[] }> = ({ images }) => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  const [photoModalOpened, setPhotoModalOpened] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [locationInfo, setLocationInfo] = useState(false);
  const [share, setShare] = useState(false);
  const [commentInputOpened, setCommentInputOpened] = useState(true);
  const [loading, setLoading] = useState(false);
  const [commentsArray, setCommentsArray] = useState<
    ICongratulationData[] | null
  >(null);
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [commentPasswordError, setCommentPasswordError] = useState(false);
  const [commentPwModalOpened, setCommentPwModalOpened] = useState(false);
  const [commentEditModalOpened, setCommentEditModalOpened] = useState(false);
  const [imagesArray, setImagesArray] = useState<string[]>(images);
  const [params, setParams] = React.useState<ICongratulationParams>({
    sortType: "NEW",
    limit: 10,
  });
  const getCongratulationsInfinityQuery =
    useGetCongratulationsInfinityQuery(params);

  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries([CONGRATULATION_QUERY_KEY]);
  const selectImage = (image: string) => {
    const copiedImages = [...images];
    const index = copiedImages.findIndex((item) => item === image);
    const previousImages = copiedImages.splice(0, index);
    const sortedImages = [...copiedImages, ...previousImages];
    setImagesArray(sortedImages);
    setPhotoModalOpened(true);
  };

  const slides = imagesArray.map((image, i) => (
    <Carousel.Slide
      key={i}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={`/pictures/${image}`}
        alt="wedding"
        width={600}
        sx={{ objectFit: "cover" }}
      />
    </Carousel.Slide>
  ));

  const imagesGrid = images.map((image, i) => {
    const IMAGE = (
      <Image
        src={`/pictures/${image}`}
        alt="wedding"
        sx={{ width: "100%", cursor: "pointer" }}
        radius="sm"
        onClick={() => {
          selectImage(image);
        }}
      />
    );
    if (i === 0) {
      return (
        <Grid.Col key={i} span={12}>
          {IMAGE}
        </Grid.Col>
      );
    }

    if (image.includes("wide")) {
      return (
        <Grid.Col
          key={i}
          span={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {IMAGE}
        </Grid.Col>
      );
    }

    return (
      <Grid.Col key={i} span={4}>
        {IMAGE}
      </Grid.Col>
    );
  });

  const form = useForm<CommentFormValues>({
    initialValues: {
      name: "",
      password: "",
      payload: "",
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
        if (value.length > 8) {
          return "비밀번호는 8자 이하로 입력해주세요.";
        }
        return null;
      },
      payload: (value) => {
        if (!value) {
          return "내용을 입력해주세요.";
        }
        if (value.length > 100) {
          return "100자 이하까지 작성 가능합니다.";
        }
        return null;
      },
    },
  });

  const commentOnSubmit = async (data: CommentFormValues) => {
    const currentDate = Date.now();
    const commentData = {
      ...data,
      createdAt: currentDate,
      avatar: getRandomEmoji(),
    };
    setLoading(true);
    // await addDoc(collection(db, COMMENT), commentData)

    setLoading(false);
    setCommentInputOpened(false);
  };

  const editPwForm = useForm({
    initialValues: {
      password: "",
    },
  });

  const editPwFormOnSubmit = ({ password }: EditPwFormValues) => {
    if (!commentsArray || !selectedComment) return;
    if (!isMatchCommentPassword(password, selectedComment)) {
      setCommentPasswordError(true);
      return;
    }
    setCommentPwModalOpened(false);
    setCommentEditModalOpened(true);
    editForm.setValues({
      ...selectedComment,
    });
  };

  const editForm = useForm<CommentFormValues>({
    initialValues: {
      name: selectedComment?.name || "",
      password: selectedComment?.password || "",
      payload: selectedComment?.payload || "",
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
        if (value.length > 8) {
          return "비밀번호는 8자 이하로 입력해주세요.";
        }
        return null;
      },
      payload: (value) => {
        if (!value) {
          return "내용을 입력해주세요.";
        }
        if (value.length > 100) {
          return "100자 이하까지 작성 가능합니다.";
        }
        return null;
      },
    },
  });

  const editFormOnSubmit = async (data: CommentFormValues) => {
    if (!selectedComment) return;
    setLoading(true);
    // await updateDoc(doc(db, COMMENT, selectedComment.id), {
    //   selectedComment,
    //   ...data,
    //   avatar: getRandomEmoji(),
    // })
    setLoading(false);
    setCommentEditModalOpened(false);
  };

  const onDeleteComment = async (id?: string) => {
    if (!id) return;
    const ok = window.confirm("정말 삭제하시겠습니까? ");
    if (ok) {
      setLoading(true);
      // await deleteDoc(doc(db, COMMENT, id))
      setLoading(false);
      setCommentEditModalOpened(false);
      setCommentInputOpened(true);
    }
  };

  React.useEffect(() => {
    function listener(event: DocumentEventMap["scroll"]) {
      if (
        Math.ceil(window.scrollY + window.innerHeight + 30) >
        document.body.offsetHeight
      ) {
        getCongratulationsInfinityQuery.fetchNextPage();
      }
    }
    document.addEventListener("scroll", listener);
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

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
          <MainImage />
        </MainWrap>
        <TextName>Changju and Shinhee</TextName>
        <TextDay>2024 2 24 SAT 1PM</TextDay>
        <TextHall>부천채림웨딩홀</TextHall>
      </Main>

      <Dday>
        <DdayWrap>
          <Countdown targetDate="2024-02-24T13:00:00" />
        </DdayWrap>
      </Dday>

      <Greetings>
        <TextWrap>
          <TitleEng>
            wedding day
          </TitleEng>
          <TitleKor>
            02<br />24
          </TitleKor>
          <Text
            align="center"
            sx={(theme) => ({
              fontSize: theme.fontSizes.sm,
            })}
          >
            평생을 함께 할 사람을 만났습니다. <br />
            지금까지 살아온 모습도 걸어온 길도 달랐지만 <br /> 이제 같은 곳을
            바라보며 함께 걸어가고 싶습니다. <br />
            <br />
            손을 맞잡은 이 순간부터 <br />
            아름답고 소중한 기쁨으로 채워나갈 <br /> 저희의 여정을 지켜봐주세요.{" "}
            <br />
            <br />
            언젠가 &apos;서로 사랑하며 살아도 너무 짧은 삶이었다&apos;고 <br />
            말할 수 있도록 함께 노력하며 살겠습니다.
          </Text>
        </TextWrap>
        <Line></Line>
        <>
            
        </>
      </Greetings>
      
      <BackgroundImage src={heroImage.src}>
        <Stack
          id="hero"
          m={0}
          p={0}
          align="center"
          justify="space-between"
          sx={{
            width: "100%",
            height: "100vh",
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
                background:
                  "linear-gradient(to bottom,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))",
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
                background: "black",
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
                background:
                  "linear-gradient(to top,rgba(0,0,0,.5) 10%,rgba(0,0,0,0.01))",
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
                onClick={() => scrollIntoView({ alignment: "start" })}
              >
                <IconArrowDownCircle size={30} opacity={0.8} />
              </UnstyledButton>
            </Stack>
          </Stack>
        </Stack>
      </BackgroundImage>

      <Divider variant="dotted" mx={10} ref={targetRef} />

      {/* Avatar Info */}
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
        }}
      >
        <Image src="/flower.svg" alt="flower" width={250} mx="auto" mb="xl" />
        <Text
          align="center"
          sx={(theme) => ({
            fontSize: theme.fontSizes.sm,
          })}
        >
          평생을 함께 할 사람을 만났습니다. <br />
          지금까지 살아온 모습도 걸어온 길도 달랐지만 <br /> 이제 같은 곳을
          바라보며 함께 걸아가고 싶습니다. <br />
          <br />
          손을 맞잡은 이 순간부터 <br />
          아름답고 소중한 기쁨으로 채워나갈 <br /> 저희의 여정을 지켜봐주세요.{" "}
          <br />
          <br />
          언젠가 &apos;서로 사랑하며 살아도 너무 짧은 삶이었다&apos;고 <br />
          말할 수 있도록 함께 노력하며 살겠습니다.
        </Text>
        <Space h="md" />
        <Divider variant="dashed" />
        <Space h="md" />
        <Group
          id="avatarWrapper"
          position="center"
          spacing={8}
          sx={{ flexWrap: "nowrap" }}
        >
          <Stack align="center" spacing="xs">
            {/* <Avatar
              // src={geonyAvatar.src}
              size="lg"
              sx={{ borderRadius: "50%" }}
              alt="geony"
            /> */}
            
            <CjFace/>
            {/* <img className="phoneImage" alt="iPhone_01" src="/images/changju.png'" /> */}
            <Group id="name" spacing={5} align="flex-end">
              <Text size="xs">장남</Text>
              <Text size="sm">{process.env.NEXT_PUBLIC_GROOM_NAME}</Text>
            </Group>
            <Group spacing={7} sx={{ flexWrap: "nowrap" }}>
              <ActionIcon
                component={NextLink}
                href={"tel:" + `${process.env.NEXT_PUBLIC_GROOM_PHONE}`}
              >
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href={`${process.env.NEXT_PUBLIC_GROOM_KAKAO_QR}`}
                target="_blank"
              >
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <Popover
                width={140}
                position="bottom"
                withArrow
                shadow="md"
                radius="md"
              >
                <Popover.Target>
                  <ActionIcon>
                    <IconCurrencyWon size={20} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p={5} px={10}>
                  <Stack
                    spacing={2}
                    sx={{ position: "relative" }}
                    align="flex-end"
                  >
                    <Text size={theme.fontSizes.xs}>
                      {process.env.NEXT_PUBLIC_GROOM_ACCOUNT}
                    </Text>
                    <Text size={theme.fontSizes.xs}>
                      {process.env.NEXT_PUBLIC_GROOM_BANK_NAME}{" "}
                      {process.env.NEXT_PUBLIC_GROOM_NAME}
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
            <Stack spacing={0}>
              <Group spacing={5} sx={{ flexWrap: "nowrap" }}>
                <Text size="xs">
                  아버지 : {process.env.NEXT_PUBLIC_GROOM_DAD_NAME}
                </Text>
                <ActionIcon component={NextLink} href="tel:010-1234-1234">
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
              <Group spacing={5}>
                <Text size="xs">
                  어머니 : {process.env.NEXT_PUBLIC_GROOM_MOM_NAME}
                </Text>
                <ActionIcon component={NextLink} href="tel:010-1234-1234">
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
            </Stack>
          </Stack>
          <Box>
            <IconHeart size={25} opacity={0.3} />
          </Box>
          <Stack align="center" spacing="xs">
            {/* <Avatar
              // src={boraAvatar.src}
              size="lg"
              sx={{ borderRadius: "50%" }}
              alt="geony"
            /> */}
            <ShFace/>
            <Group id="name" spacing={5} align="flex-end">
              <Text size="xs">장녀</Text>
              <Text size="sm">{process.env.NEXT_PUBLIC_BRIDE_NAME}</Text>
            </Group>
            <Group spacing={7} sx={{ flexWrap: "nowrap" }}>
              <ActionIcon
                component={NextLink}
                href={"tel:" + `${process.env.NEXT_PUBLIC_BRIDE_PHONE}`}
              >
                <IconPhone size={20} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href={`${process.env.NEXT_PUBLIC_BRIDE_KAKAO_QR}`}
                target="_blank"
              >
                <IconBrandMessenger size={20} />
              </ActionIcon>
              <Popover
                width={140}
                position="bottom"
                withArrow
                shadow="md"
                radius="md"
              >
                <Popover.Target>
                  <ActionIcon>
                    <IconCurrencyWon size={20} />
                  </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown p={5} px={10}>
                  <Stack
                    spacing={2}
                    sx={{ position: "relative" }}
                    align="flex-end"
                  >
                    <Text size={theme.fontSizes.xs}>
                      {process.env.NEXT_PUBLIC_BRIDE_ACCOUNT}
                    </Text>
                    <Text size={theme.fontSizes.xs}>
                      {process.env.NEXT_PUBLIC_BRIDE_BANK_NAME}{" "}
                      {process.env.NEXT_PUBLIC_BRIDE_NAME}
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
            <Stack spacing={0}>
              <Group spacing={5}>
                <Text size="xs">
                  아버지 : {process.env.NEXT_PUBLIC_BRIDE_DAD_NAME}
                </Text>
                <ActionIcon component={NextLink} href="tel:010-1234-1234">
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
              <Group spacing={5}>
                <Text size="xs">
                  어머니 : {process.env.NEXT_PUBLIC_BRIDE_MOM_NAME}
                </Text>
                <ActionIcon component={NextLink} href="tel:010-1234-1234">
                  <IconPhone size={15} />
                </ActionIcon>
              </Group>
            </Stack>
          </Stack>
        </Group>
        <Image src="/flower2.svg" alt="flower" width={250} mx="auto" mt={9} />
      </Paper>

      <Divider variant="dotted" mx={10} />

      {/* Photo Grid */}
      <Paper
        shadow="sm"
        mx={5}
        p="sm"
        py="md"
        radius="md"
        withBorder
        sx={{
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Grid grow gutter={6}>
          {imagesGrid}
        </Grid>
      </Paper>

      <Divider variant="dotted" mx={10} />

      {/* Photo Modal */}
      {photoModalOpened && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 990,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseButton
            size={35}
            p={5}
            sx={{
              position: "absolute",
              top: 30,
              right: 30,
              zIndex: 999,
              backgroundColor: theme.fn.rgba(theme.white, 0.5),
              borderRadius: "50%",
              cursor: "pointer",
            }}
            onClick={() => setPhotoModalOpened(false)}
          />
          <Carousel
            loop
            sx={{
              width: "100%",
              zIndex: 998,
            }}
            styles={{
              control: {
                width: 35,
                height: 35,
              },
            }}
          >
            {slides}
          </Carousel>
          <Overlay
            color="black"
            onClick={() => {
              setPhotoModalOpened(false);
            }}
          />
        </div>
      )}

      {/* Bottom */}
      <Paper
        mx={5}
        shadow="sm"
        p="sm"
        py="md"
        mb={10}
        radius="md"
        withBorder
        sx={{
          backgroundColor: theme.colors.gray[0],
          color: theme.colors.dark[4],
        }}
      >
        <Stack align="center">
          <Text sx={{ fontSize: theme.fontSizes.md, fontWeight: 400 }}>
            2023 . 02 . 24 (토) PM 01 : 00
          </Text>
          <Text
            align="center"
            id="location"
            sx={{ fontSize: theme.fontSizes.md, fontWeight: 400 }}
          >
            부천채림웨딩홀
            <Text sx={{ fontSize: theme.fontSizes.sm, fontWeight: 300 }}>
              (경기 부천시 부천로 3-1)
            </Text>
          </Text>
          <KakaoMap />
          <Alert
            icon={<IconAlertCircle size={16} />}
            px={15}
            py={7}
            title="주차 안내"
            sx={{ width: "90%" }}
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
          </Alert>
          <Group sx={{ width: "100%" }} position="center">
            <Button
              color="blue.5"
              sx={{ width: "40%" }}
              onClick={() => setLocationInfo(true)}
            >
              🚍 오시는길
            </Button>
            <Button
              color="green.5"
              sx={{ width: "40%" }}
              onClick={() => setNavigation(true)}
            >
              🚘 네비게이션
            </Button>
          </Group>
          <Button
            color="yellow.5"
            sx={{ width: "84%" }}
            onClick={() => setShare(true)}
          >
            <IconShare size={15} /> <Text ml={5}>공유하기</Text>
          </Button>
        </Stack>
      </Paper>

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
          축하글을 남기면 추첨을 통해 기프티콘을 드립니다. <br />
          (로그인 필수)
        </Text>
        <Stack spacing={10} mb={5}>
          <Transition
            mounted={commentInputOpened}
            transition="fade"
            duration={500}
            timingFunction="ease"
          >
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
                        maxLength={8}
                        sx={{ width: 98 }}
                        {...form.getInputProps("password")}
                      />
                      <CloseButton
                        size="lg"
                        sx={{ position: "absolute", top: 5, right: 5 }}
                        onClick={() => setCommentInputOpened(false)}
                      />
                    </Group>
                    <Group spacing={0} position="center">
                      <TextInput
                        placeholder="휴대폰번호(전화번호)를 입력해주세요."
                        label="전화번호"
                        minLength={6}
                        maxLength={10}
                        {...form.getInputProps("name")}
                        sx={{
                          width: 290,
                        }}
                      />
                    </Group>
                    <Stack align="center" spacing={10}>
                      <Textarea
                        placeholder="축하 인사말을 작성해주세요."
                        label="인사말"
                        withAsterisk
                        {...form.getInputProps("payload")}
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

          {[...(getCongratulationsInfinityQuery.data?.pages.flat() ?? [])].map(
            (comment, i) => (
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
                  {/*<Avatar color="blue" radius="xl">*/}
                  {/*  {comment.avatar ? (*/}
                  {/*    <Text size="xl">{comment.avatar}</Text>*/}
                  {/*  ) : (*/}
                  {/*    <IconUser size={25} />*/}
                  {/*  )}*/}
                  {/*</Avatar>*/}
                  <Stack spacing={0}>
                    <Group>
                      <Text size="sm" sx={{ fontWeight: 500 }}>
                        {comment.name}
                      </Text>
                      <Text size={10} color="dimmed">
                        {new Date(comment.createdAt).toLocaleDateString("ko")}
                      </Text>
                    </Group>
                    <Text size="sm" mt={5} sx={{ lineBreak: "anywhere" }}>
                      {comment.contents}
                    </Text>
                  </Stack>
                </Group>
                <Group
                  sx={{ position: "absolute", top: 5, right: 5 }}
                  spacing="xs"
                >
                  <ActionIcon
                    color="blue"
                    onClick={() => {
                      // setSelectedComment(comment);
                      setCommentPwModalOpened(true);
                    }}
                  >
                    <IconEdit size={20} />
                  </ActionIcon>
                </Group>
              </Box>
            ),
          )}
        </Stack>
      </Paper>

      {/* Navigation Modal */}
      <Modal
        opened={navigation}
        onClose={() => setNavigation(false)}
        centered
        size={200}
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
          <ActionIcon sx={{ width: 50 }}>
            <Image
              src="/kakaomap.png"
              width={50}
              alt="kakaomap"
              onClick={() =>
                router.push(
                  "https://map.kakao.com/link/to/부천채림웨딩홀,37.484695,126.781874",
                )
              }
            />
          </ActionIcon>
          <ActionIcon sx={{ width: 50 }}>
            <Image
              src="/navermap.png"
              width={50}
              alt="navermap"
              onClick={() =>
                router.push(
                  "nmap://navigation?dlat=37.484695,126.781874&dname=부천채림웨딩홀&appname=http://localhost:3000",
                )
              }
            />
          </ActionIcon>
        </Group>
      </Modal>

      {/* 오시는 길 Modal */}
      <Modal
        title="채림웨딩홀 오시는 길"
        opened={locationInfo}
        onClose={() => setLocationInfo(false)}
        size="sm"
        overflow="inside"
        styles={{
          title: {
            margin: "0 auto",
          },
        }}
      >
        <LocationModal />
      </Modal>

      {/* Share Modal */}
      <Modal
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
              onClick={() => router.push("/")}
            />
          </ActionIcon>

          <CopyButton value="https://github.com/changsol/">
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
      </Modal>

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
        <form onSubmit={editPwForm.onSubmit(editPwFormOnSubmit)}>
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
              입력
            </Button>
          </Group>
        </form>
        {commentPasswordError && (
          <Notification
            icon={<IconX size={18} />}
            color="red"
            onClose={() => setCommentPasswordError(false)}
          >
            비밀번호가 틀렸습니다.
          </Notification>
        )}
      </Modal>

      {/* Comment Edit Modal */}
      <Modal
        centered
        size={340}
        opened={commentEditModalOpened}
        onClose={() => {
          setCommentEditModalOpened(false);
          setSelectedComment(null);
        }}
        styles={{
          header: {
            height: 0,
          },
        }}
      >
        <form onSubmit={editForm.onSubmit(editFormOnSubmit)}>
          <Stack spacing={0} align="center">
            <Group
              sx={{ width: 350, height: 80 }}
              spacing={0}
              position="center"
            >
              <TextInput
                placeholder="성함을 입력해주세요."
                label="성함"
                minLength={2}
                maxLength={10}
                withAsterisk
                {...editForm.getInputProps("name")}
                sx={{
                  width: 140,
                }}
              />
              <PasswordInput
                label="비밀번호"
                withAsterisk
                ml={10}
                minLength={4}
                maxLength={8}
                sx={{ width: 98 }}
                {...editForm.getInputProps("password")}
              />
            </Group>
            <Stack spacing={10}>
              <Textarea
                placeholder="축하 인사말을 작성해주세요."
                withAsterisk
                {...editForm.getInputProps("payload")}
                sx={{
                  width: 250,
                }}
                m={0}
              />
              <Group position="apart" px={20}>
                <Button
                  color="red"
                  disabled={loading}
                  p={0}
                  sx={{
                    width: 90,
                    height: 35,
                  }}
                  onClick={() => onDeleteComment(selectedComment?.id)}
                >
                  삭제 하기
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  p={0}
                  sx={{
                    width: 90,
                    height: 35,
                  }}
                >
                  수정 완료
                </Button>
              </Group>
            </Stack>
          </Stack>
        </form>
      </Modal>

      {/* Footer */}
      <Anchor
        align="center"
        href="https://github.com/changsol"
        mb={30}
        color="gray"
      >
        Made by ChangSol
      </Anchor>
    </Stack>
  );
};

const Main = styled.div`
  position: relative;
  background-color: #FFFAEB;
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
`
const Day = styled.p`
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  border: 1px solid #03652B;
  margin-bottom: 20px;
  padding: 0 5px;
  border-radius: 25px;
`
const MainWrap = styled.div`
  position: relative;
  width: 60%;
`

const MainImage = styled.img`
  position: relative;
  background-image: url('/images/mobilemain.jpg');
  background-repeat: no-repeat;
  background-size: 150%;
  background-position: center;
  width: 100%;
  height: 380px;
  margin: 0 auto;
  // filter: grayscale(100%);
`
const TextName = styled.p`
  position: relative;
  bottom: 20px;
  font-family: 'Hankc';
  display: flex;
  justify-content: center;
  width: 290px;
  font-size: 28px;
  font-style: italic;
  font-weight: 600;
  letter-spacing: 1px;
  color: #03652B;
`
const TextDay = styled.p`
`
const TextHall = styled.span`
`

const CjFace = styled.img`
  background-image: url('/images/changju.png');
  border-image-source: none;
  width: 60px;
  height: 72px;
  background-repeat: no-repeat;
  background-size: cover;
`
const ShFace = styled.img`
  background-image: url('/images/shinhee.png');
  border-image-source: none;
  width: 60px;
  height: 72px;
  background-repeat: no-repeat;
  background-size: cover;
`

const Dday = styled.div`
  width:100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  background-color: #05652c;
`
const DdayWrap = styled.div`
  border-radius: .3rem;
`

const Greetings = styled.div`
  padding: 2.6rem 1rem;
  background-color: #FFFAEB;
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
}
`
const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const TitleEng = styled.h3`
  font-size: 0.5rem;
  color: #05652c;
`
const TitleKor = styled.p`
  font-size: 1.2rem;
  line-height: 1;
  margin: 5px 0 40px 0;
  font-weight: bold;
  color: #05652c;
`

const Line = styled.div`
  width:1px;
  height: 40px;
  margin: 40px auto;
  background-color: #05652c;
  //transform: rotate(45deg);
`

export default Home;