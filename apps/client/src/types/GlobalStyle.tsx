/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import colors from './colors';
const GlobalStyle = () => (
    <Global
        styles={css`
      @font-face {
        font-family: 'Beanpole';
        src: url('/fonts/beanpole_2020_OTF_Bold.woff') format('woff');
        font-weight: 300;
        font-style: normal;
      }
            @font-face {
                font-family: 'Beanpole';
                src: url('/fonts/beanpole_2020_OTF_Light.woff') format('woff');
                font-weight: 500;
                font-style: normal;
            }
            
            @font-face {
                font-family: 'Beanpole';
                src: url("/fonts/beanpole_2020_OTF_Medium.woff") format("woff");
                font-weight: 700;
                font-style: normal;
            }
            @font-face {
                font-family: 'Pretendard-Regular';
                src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
                font-weight: 400;
                font-style: normal;
            }
            @font-face {
                font-family: 'Pretendard-Bold';
                src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff') format('woff');
                font-weight: 600;
                font-style: normal;
            }
            @font-face {'beanpole','pretendard-regular',san-serif;}
      html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Beanpole', sans-serif;
      }

      *, *::before, *::after {
        box-sizing: inherit;
      }
    `}
    />
);

export default GlobalStyle;