/** @jsxImportSource @emotion/react */
import Header from '../components/Header.tsx';
import styled from '@emotion/styled';
import color from '../types/color.ts';
import Budda from "../assets/images/Buddasvg.tsx";

const ResultPage = () => {
  return (
    <StyledResultPage>
      <Header />
      <BuddaWrapper>
        <Budda width="265%" />
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
  background: 
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%), ${color.malgyulBlack};
  gap: 2rem;
`;

const BuddaWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 32rem;
  width: fit-content;
  height: fit-content;
  z-index: 10; 
  padding: 0;
  margin: 0;
`;