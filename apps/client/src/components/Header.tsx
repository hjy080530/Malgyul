/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Logo from '../assets/images/malgyul_logo.tsx';

const Header = () => {
  return (
    <StyledHeader>
      <Logo css={{ width: '180px', height: 'fit-content', marginTop: '1.5rem' }} />
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: fit-content;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;
