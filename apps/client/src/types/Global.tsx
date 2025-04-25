/** @jsxImportSource @emotion/react */
import { Global, css } from '@emotion/react';
import BeanpoleBold from '../assets/fonts/beanpole-2020-Bold.woff';
import BeanpoleMedium from '../assets/fonts/beanpole-2020-Medium.woff';
import BeanpoleLight from '../assets/fonts/beanpole-2020-Light.woff';

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Beanpole';
        src: url(${BeanpoleLight}) format('woff');
        font-weight: 300;
        font-style: normal;
      }

      @font-face {
        font-family: 'Beanpole';
        src: url(${BeanpoleMedium}) format('woff');
        font-weight: 500;
        font-style: normal;
      }

      @font-face {
        font-family: 'Beanpole';
        src: url(${BeanpoleBold}) format('woff');
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
          format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Pretendard-Bold';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
          format('woff');
        font-weight: 600;
        font-style: normal;
      }

      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    `}
  />
);

export default GlobalStyle;
