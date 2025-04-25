/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import SelectProperty from '../components/SelectProperty.tsx';
import color from '../types/color.ts';
import Header from '../components/Header';
import TypingChecker from '../components/TypingChecker.tsx';
const MainPage = () => {
  return (
    <StyledMainPage>
      <Header />
      <SelectProperty />
      <TypingChecker />
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%),
    ${color.malgyulBlack};
`;

export default MainPage;
