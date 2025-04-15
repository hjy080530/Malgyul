/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import BackgroundImg from '../assets/images/langing_background.svg';
import font from '../types/fonts.ts';
import color from "../types/color.ts";
import { css } from "@emotion/react";
import Logo from '../assets/images/malgyul_logo.tsx';
import Button from "../components/button";

const LandingPage = () => {
    return (
        <StyledBackground>
                <Logo css={{ width: '350px', height:'fit-content',marginTop: '2rem' }} />
            <SortElements>
                <h1 css={[font.H1, css`color: ${color.malgyulWhite};`]}>마음이 머무는 그곳에 글이 머뭅니다.</h1>
                <Button>들어가기</Button>
            </SortElements>
        </StyledBackground>
    )
};

export default LandingPage;

const StyledBackground=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${BackgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    flex-direction: column;
    gap:20px;
`;

const SortElements=styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
`;