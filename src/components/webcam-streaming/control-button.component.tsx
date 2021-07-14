import React, { ButtonHTMLAttributes, FC } from "react";
import { Icon } from "react-feather";

interface StreamingControlButtonType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  IconComponent: Icon;
  buttonClassName?: string;
  iconClassName?: string;
}
export const StreamControlButton: FC<StreamingControlButtonType> = ({
  IconComponent,
  buttonClassName,
  iconClassName,
  ...props
}) => {
  return (
    <button {...props} className={`${buttonClassName} bg-white mx-1 p-2 rounded-full`}>
      <IconComponent className={iconClassName} size={15} />
    </button>
  );
};
