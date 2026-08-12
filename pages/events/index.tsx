import {
  ActionIcon,
  Box,
  Button,
  CloseButton,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Textarea,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { IconWriting } from "@tabler/icons";
import React, { useState } from "react";
import styled from "styled-components";
const Event = () => {
  const theme = useMantineTheme();
  return (
    <Stack
      p={0}
      justify="center"
      spacing="sm"
      sx={{
        margin: "0 auto",
        width: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <div>
        이벤트 페이지 입니다.
        <div>test</div>
        <ContactParentsTitle>혼주에게 연락하기</ContactParentsTitle>
      </div>
    </Stack>
  );
};

const ContactParentsTitle = styled.p`
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  padding: 10px 0;
  text-align: center;
  background-color: #05652c;
  color: #fff;
`;

export default Event;
