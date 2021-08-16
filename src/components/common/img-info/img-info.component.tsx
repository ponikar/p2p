import React, { FC, ImgHTMLAttributes } from "react";

interface ImgInfoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  message?: string;
}

export const ImgInfo: FC<ImgInfoProps> = ({
  src,
  message,
  children,
  ...rest
}) => {
  return (
    <div className="flex flex-col">
      <img {...rest} src={src} className="w-9/12 mx-auto" />
      <div className="mt-5 text-center">
        {message} {children}
      </div>
    </div>
  );
};
