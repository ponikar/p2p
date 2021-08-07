import React, { ButtonHTMLAttributes, FC } from "react";

type StandardButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButton: FC<StandardButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`${className} center text-base py-2 px-3 text-white bg-primary rounded-sm`}
      {...props}
    >
      {children}
    </button>
  );
};
