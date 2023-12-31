import { Global } from '@mantine/core';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    
  @font-face {
      font-family: "GowunDodum-Regular";
      font-weight: normal;
      src: url("/fonts/GowunDodum-Regular.ttf") format("truetype");
  }
    
  // 서강체
  @font-face {
    font-family: 'SOGANGUNIVERSITYTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

`;

export default function GlobalStyles() {
	return (
		<>
			<GlobalStyle />
			<Global
				styles={(theme) => ({
					'*, *::before, *::after': { boxSizing: 'border-box' },
					html: {
						overflowX: 'hidden',
						/* Prevent font scaling in landscape */
						WebkitTextSizeAdjust: 'none' /*Chrome, Safari, newer versions of Opera*/,
						MozTextSizeAdjust: 'none' /*Firefox*/,
						msTextSizeAdjust: 'none' /*Ie*/,
						OTextSizeAdjust: 'none' /*old versions of Opera*/,
					},
					body: {
						overflowX: 'hidden',
						...theme.fn.fontStyles(),
						fontSize: theme.fontSizes.sm,
						lineHeight: theme.lineHeight,
						backgroundColor: '#f4eee7',
						margin: '0',
						fontFamily: 'GowunDodum-Regular',
					},
					a: {
						all: 'unset',
					},
					p: {
						margin: 0,
						padding: 0,
					},
				})}
			/>
		</>
	);
}

// @font-face {
//   font-family: "GowunDodum-Regular";
//   font-weight: normal;
//   src: url("../fonts/GowunDodum-Regular.ttf") format("truetype");
// }
