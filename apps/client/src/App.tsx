/** @jsxImportSource @emotion/react */
//import styled from "@emotion/styled";
import GlobalStyles from './types/Global';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TypingPage from './pages/TypingPage';
import LandingPage from './pages/LandingPage';
import ResultPage from './pages/ResultPage';

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
