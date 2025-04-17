/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import font from '../types/fonts.ts';
import { css } from '@emotion/react';
import color from '../types/color.ts';

type ButtonProps = {
  children: React.ReactNode;
};

const Button = ({ children }: ButtonProps) => {
  return (
    <StyledButton>
      <p
        css={[
          font.btn1,
          css`
            color: ${color.malgyulWhite};
          `,
        ]}
      >
        {children}
      </p>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 0px 20px;
  margin: 0 20px;
  background-color: ${color.malgyulGreen};
  border: none;
  border-radius: 10px;
`;

export default Button;
