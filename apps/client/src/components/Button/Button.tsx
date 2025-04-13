// components/Button/Button.tsx
import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
    return <button onClick={onClick}>{children}</button>;
};

export default Button;