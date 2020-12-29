import React from "react";
import { Global, css, connect } from "frontity";
import InterMedium from "../../fonts/inter/Inter-Medium.woff2";
import InterBold from "../../fonts/inter/Inter-Bold.woff2";
import InterSemiBold from "../../fonts/inter/Inter-SemiBold.woff2";
import InterMediumUS from "../../fonts/inter/Inter-Medium-US-ASCII.woff2";
import InterBoldUS from "../../fonts/inter/Inter-Bold-US-ASCII.woff2";
import InterSemiBoldUS from "../../fonts/inter/Inter-SemiBold-US-ASCII.woff2";
import InterMediumLatin from "../../fonts/inter/Inter-Medium-LATIN.woff2";
import InterBoldLatin from "../../fonts/inter/Inter-Bold-LATIN.woff2";
import InterSemiBoldLatin from "../../fonts/inter/Inter-SemiBold-LATIN.woff2";

const fonts = {
  "us-ascii": [InterMediumUS, InterSemiBoldUS, InterBoldUS],
  latin: [InterMediumLatin, InterSemiBoldLatin, InterBoldLatin],
  all: [InterMedium, InterSemiBold, InterBold],
};

const FontFace = ({ state }) => {
  const font = fonts[state.theme.fontSets] || fonts["all"];

  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-display: "swap";
          src: url(${font[0]}) format("woff2");
        }

        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 600;
          font-display: "swap";
          src: url(${font[1]}) format("woff2");
        }

        @font-face {
          font-family: "Inter";
          font-style: normal;
          font-weight: 700;
          font-display: "swap";
          src: url(${font[2]}) format("woff2");
        }
      `}
    />
  );
};

export default connect(FontFace);
