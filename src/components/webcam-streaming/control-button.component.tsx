import React, { ButtonHTMLAttributes, FC } from "react";
import { Icon } from "react-feather";

interface StreamingControlButtonType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconComponent: Icon;
  buttonClassName?: string;
  iconClassName?: string;
  size?: number;
}
export const StreamControlButton: FC<StreamingControlButtonType> = ({
  IconComponent,
  buttonClassName,
  iconClassName,
  size = 15,
  ...props
}) => {
  return (
    <button
      className={`${buttonClassName} bg-white mx-1 p-2 shadow-lg rounded-full`}
      {...props}
    >
      <IconComponent className={iconClassName} size={size} />
    </button>
  );
};
