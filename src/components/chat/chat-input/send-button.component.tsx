import React, { ButtonHTMLAttributes, FC } from "react";

export const SendButton:FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
    return (
      <button {...props} className="center text-sm p-1 rounded-full">
      Send
      </button>
    );
  };