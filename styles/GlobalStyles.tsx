import { Global } from "@mantine/core";

export default function GlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        "*, *::before, *::after": { boxSizing: "border-box" },
        html: {
          overflowX: "hidden",
          /* Prevent font scaling in landscape */
          WebkitTextSizeAdjust: "none" /*Chrome, Safari, newer versions of Opera*/,
          MozTextSizeAdjust: "none" /*Firefox*/,
          msTextSizeAdjust: "none" /*Ie*/,
          OTextSizeAdjust: "none" /*old versions of Opera*/,
        },
        body: {
          overflowX: "hidden",
          ...theme.fn.fontStyles(),
          fontSize: theme.fontSizes.sm,
          lineHeight: theme.lineHeight,
          backgroundColor: "#f4eee7",
          margin: "0",
        },
        a: {
          all: "unset",
        },
        p: {
          margin: 0,
          padding: 0,
        },
      })}
    />
  );
}
