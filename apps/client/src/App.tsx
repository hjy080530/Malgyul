/** @jsxImportSource @emotion/react */
//import styled from "@emotion/styled";
import GlobalStyles from './types/Global.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TypingPage from './pages/TypingPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import ResultPage from './pages/ResultPage.tsx';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/typing" element={<TypingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="result" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
