import React, { FC } from "react";

interface TitleProps {
  title: string;
}

export const SectionTitle: FC<TitleProps> = ({ title }) => {
  return <h2 className="text-xl lg:text-3xl"> {title} </h2>;
};

export const HeaderTitle: FC<TitleProps> = ({ title }) => {
  return <h2 className="text-2xl lg:text-3xl"> {title} </h2>;
};
