/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Logo from '../assets/images/malgyul_logo.tsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/typing');
  };
  return (
    <StyledHeader>
      <Logo css={{ width: '180px', height: 'fit-content', marginTop: '1.5rem' }} onClick={handleClick} />
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
