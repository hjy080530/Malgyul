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
    const nextValue = e.target.value;
    if (!isComposing && nextValue.length <= targetText.length) {
      setInput(nextValue);
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    const nextValue = e.currentTarget.value;
    if (nextValue.length <= targetText.length) {
      setInput(nextValue);
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
        {input.length < targetText.length && (
          <Caret>{input}</Caret>
        )}
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
                          : "#666666"
  };
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const Caret = styled.span`
  width: 1px;
  background-color: ${color.malgyulWhite};
  margin-left: 1px;
  animation: blink 1s step-start infinite;
  color: ${color.malgyulWhite};

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;
export default TypingChecker;