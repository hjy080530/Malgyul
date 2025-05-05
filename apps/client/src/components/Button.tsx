/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import font from '../types/fonts';
import { css } from '@emotion/react';
import color from '../types/color';

type ButtonProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <StyledButton {...props}>
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
  cursor: pointer;
`;

export default Button;
