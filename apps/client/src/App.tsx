import { Button } from './components/Button';
import font from "./types/fonts";
import { css } from "@emotion/react";
import GlobalStyle from './types/GlobalStyle';

const App = () => {
    return (
        <>
            <GlobalStyle/>
            <Button onClick={() => alert('눌렀다!')}>눌러봐~</Button>
            <h1 css={font.H1}>와 오아와</h1>
            <h2 css={font.H2}>와 오아와</h2>
            <h3 css={font.H3}>와 오아와</h3>
            <h1 css={css`font-weight: 700; font-size: 3rem;`}>빈폴체 Bold!</h1>
            <h2 css={css`font-weight: 500; font-size: 2rem;`}>빈폴체 Medium!</h2>
            <h3 css={css`font-weight: 300; font-size: 1.5rem;`}>빈폴체 Light!</h3>
        </>
    );
};

export default App;