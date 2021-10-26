import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

function CustomButton({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`${isOutlined && "outlined"} button`} {...props}>
      {props.children}
    </button>
  );
}

export default CustomButton;
