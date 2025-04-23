/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import fonts from "../types/fonts.ts";
import color from "../types/color.ts";
const TypingChecker = () => {
  const targetText = "예시 문장입니다";
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value)
  };
  const handleCompositionStart = () => {
    setIsComposing(true);
  };
  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    const nextValue = e.currentTarget.value;
    if (nextValue.length <= targetText.length) {
      setInput(nextValue);
    } else {
      setInput(nextValue.slice(0, targetText.length)); // 길이 초과 방지
    }
  };
  return (
    <StyledTypingChecker onClick={() => inputRef.current?.focus()}>
      <TextDisplay>
        {targetText.split("").map((char, idx) => {
          const typedChar = input[idx];
          let status: "correct" | "wrong" | "pending" = "pending";
          if (typedChar != null) {
            status = typedChar === char ? "correct" : "wrong";
          }
          return (
            <Char key={idx} status={status}>
              {char}
            </Char>
          );
        })}
        {input.length < targetText.length && <Caret />}
      </TextDisplay>
      <HiddenInput
        ref={inputRef}
        value={input}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </StyledTypingChecker>
  );
};

const StyledTypingChecker = styled.div`
  background-color: ${color.malgyulBlack};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 12px;
  font-family: ${fonts.P1};
  cursor: text;
  position: relative;
  width: 60%;
  padding: 1rem;
`;

const TextDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.1rem;
`;

const Char = styled.span<{ status: "correct" | "wrong" | "pending" }>`
  color: ${({ status }) =>
  status === "correct"
    ? color.malgyulWhite
    : status === "wrong"
      ? color.malgyulRed
      : "#666666"};
`;

const HiddenInput = styled.input`
  position: absolute;
  left: -9999px;
  top: 0;
`;

const Caret = styled.span`
  width: 1px;
  background-color: ${color.malgyulWhite};
  animation: blink 1s step-start infinite;
  margin-left: 1px;

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

export default TypingChecker;