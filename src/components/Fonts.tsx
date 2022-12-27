import { Global } from '@emotion/react'

const Fonts = ({
  headingFontFamily,
  bodyFontFamily,
}: {
  headingFontFamily: string
  bodyFontFamily: string
}) => (
  <Global
    styles={`
    @font-face {
        font-family: 'Heading Font Family';
        font-display: swap;
        src: url("https://cdn.jsdelivr.net/npm/@fontsource/${headingFontFamily}/files/${headingFontFamily}-latin-400-normal.woff") format('woff');
      }
    @font-face {
        font-family: 'Body Font Family';
        font-display: swap;
        src: url("https://cdn.jsdelivr.net/npm/@fontsource/${bodyFontFamily}/files/${bodyFontFamily}-latin-400-normal.woff") format('woff');
      }
      `}
  />
)

export default Fonts
