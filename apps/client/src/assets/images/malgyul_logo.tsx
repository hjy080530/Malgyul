import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="226"
      height="88"
      viewBox="0 0 226 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M155.588 73.4H117.988V78.6H156.988V87.6H107.788V64.8H145.388V59.8H107.788V50.8H155.588V73.4ZM138.288 43.2H105.588V2.7H138.288V43.2ZM155.588 1.69999V18.5H162.888V28.3H155.588V47.2H145.188V1.69999H155.588ZM128.088 11.9H115.788V34H128.088V11.9ZM219.5 73.4H180.6V78.6H220.7V87.6H170.4V64.8H209.3V59.8H170.4V50.8H219.5V73.4ZM168.1 11.9V2.7H202.3V11.9L201.6 12.9H209.1V1.69999H219.5V47.2H209.1V38.9H194.9V29.7H209.1V22.1H195.1L179 45.2H166.9L190.4 11.9H168.1Z"
        fill="white"
      />
      <path
        d="M90 0C90 11.9347 85.2589 23.3807 76.8198 31.8198C68.3807 40.2589 56.9347 45 45 45C33.0653 45 21.6193 40.2589 13.1802 31.8198C4.74106 23.3807 1.8021e-06 11.9347 0 6.79481e-06L45 0H90Z"
        fill="url(#paint0_radial_137_31)"
      />
      <path
        d="M0 88C0 76.0653 4.74106 64.6193 13.1802 56.1802C21.6193 47.7411 33.0653 43 45 43C56.9347 43 68.3807 47.7411 76.8198 56.1802C85.2589 64.6193 90 76.0653 90 88L45 88H0Z"
        fill="url(#paint1_radial_137_31)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_137_31"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(44.2458 60.3352) rotate(-89.3772) scale(92.5194 92.5112)"
        >
          <stop offset="0.0961538" stopColor="#C2FF0C" />
          <stop offset="0.211538" stopColor="#95FF00" />
          <stop offset="0.552885" stopColor="#00903E" />
          <stop offset="0.831731" stopColor="#003F70" />
        </radialGradient>
        <radialGradient
          id="paint1_radial_137_31"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(45.7542 27.6648) rotate(90.6228) scale(92.5194 92.5112)"
        >
          <stop offset="0.0961538" stopColor="#C2FF0C" />
          <stop offset="0.211538" stopColor="#95FF00" />
          <stop offset="0.552885" stopColor="#00903E" />
          <stop offset="0.831731" stopColor="#003F70" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Logo;
