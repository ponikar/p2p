import React from "react";

export const Loading = () => {
  return (
    <div
      style={{ borderTopColor: "#57837B" }}
      className="p-3 animate-spin border-secondryBack border-4 w-8 h-8 rounded-full"
    ></div>
  );
};

export const LoadingScreen = () => {
  return (
    <section className="h-screen center">
      <Loading />
    </section>
  );
};
