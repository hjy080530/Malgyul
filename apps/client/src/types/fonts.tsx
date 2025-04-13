import { css } from '@emotion/react';

const fontGenerator = (
    weight: number,
    size: number,
    lineHeight: number,
    letterSpacing: number
) => css`
  font-family: 'Beanpole', sans-serif;
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;
`;

const font = {
    H1: fontGenerator(700, 8.75,154,0),
    H2: fontGenerator(700, 5.625, 99, 0),
    H3: fontGenerator(500, 3.125, 55, 0),
    H4: fontGenerator(500, 2, 35.2, 0),
    H5: fontGenerator(500, 1.75, 30.8, 0),

    p1: fontGenerator(400, 3.25, 62.1, 2),
    p2: fontGenerator(600, 3.25, 62.1, 2),

    btn: fontGenerator(500, 2, 35.2, 0),

};

export default font;