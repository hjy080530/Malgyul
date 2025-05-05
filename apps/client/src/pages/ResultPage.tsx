/** @jsxImportSource @emotion/react */
import Header from '../components/Header';
import styled from '@emotion/styled';
import color from '../types/color';
import fonts from '../types/fonts';
import { css } from '@emotion/react';
import Budda from '../assets/images/Buddasvg';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ResultPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { wpm, accuracy, errorRate } = state || {};
  const handleClick = () => {
    navigate('/typing');
  };
  return (
    <StyledResultPage>
      <Header />
      <ResultTextSort>
        <TextSort>
          <TitleSort>
            <h1
              css={[
                fonts.H1,
                css`
                  color: ${color.malgyulWhite};
                `,
              ]}
            >
              정진의 속도
            </h1>
            <h3
              css={[
                fonts.H3,
                css`
                  color: ${color.malgyulGray};
                `,
              ]}
            >
              WPM
            </h3>
          </TitleSort>
          <p
            css={[
              fonts.D1,
              css`
                color: ${color.malgyulGreen};
              `,
            ]}
          >
            {wpm} 단어
          </p>
        </TextSort>
        <SmallTextSort>
          <TextSort>
            <TitleSort>
              <h1
                css={[
                  fonts.H1,
                  css`
                    color: ${color.malgyulWhite};
                  `,
                ]}
              >
                정견의 정도
              </h1>
              <h3
                css={[
                  fonts.H3,
                  css`
                    color: ${color.malgyulGray};
                  `,
                ]}
              >
                정확도
              </h3>
            </TitleSort>
            <p
              css={[
                fonts.D2,
                css`
                  color: ${color.malgyulGreen};
                `,
              ]}
            >
              {accuracy}%
            </p>
          </TextSort>
          <TextSort>
            <TitleSort>
              <h1
                css={[
                  fonts.H1,
                  css`
                    color: ${color.malgyulWhite};
                  `,
                ]}
              >
                번뇌의 흔적
              </h1>
              <h3
                css={[
                  fonts.H3,
                  css`
                    color: ${color.malgyulGray};
                  `,
                ]}
              >
                오타율
              </h3>
            </TitleSort>
            <p
              css={[
                fonts.D2,
                css`
                  color: ${color.malgyulGreen};
                `,
              ]}
            >
              {errorRate} %
            </p>
          </TextSort>
        </SmallTextSort>
      </ResultTextSort>
      <Button onClick={handleClick}>다시하기</Button>
      <BuddaWrapper>
        <Budda width="800px" />
      </BuddaWrapper>
    </StyledResultPage>
  );
};

export default ResultPage;

const StyledResultPage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), ${color.malgyulBlack};
  gap: 2rem;
  overflow: hidden;
`;

const TextSort = styled.div`
  display: flex;
  flex-direction: column;
  gap: -100px;
  & h1,
  & h4,
  & p,
  & h3 {
    margin: 0;
    padding: 10px 0 0 0;
    line-height: 1;
  }
`;

const TitleSort = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
  flex-direction: row;
`;
const SmallTextSort = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;
const BuddaWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: fit-content;
  height: fit-content;
  z-index: 10;
  padding: 0;
  margin: 0;
`;
const ResultTextSort = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: -40%;
  margin-top: 3%;
`;