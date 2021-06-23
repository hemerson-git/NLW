import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function CustomButton(props: ButtonProps) {
  return (
    <button className="button" {...props}>
      {props.children}
    </button>
  );
}

export default CustomButton;
