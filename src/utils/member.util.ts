type ColorType = { [key: number]: string };
export const Colors: ColorType = {
  0: "#EEB76B",
  1: "#9C3D54",
  2: "#BECA5C",
  3: "#F3C583",
  4: "#C64756",
  5: "#FF75A0",
  6: "#99B898",
  7: "#B49C73",
  8: "#12D3CF",
  9: "#FCCB8F",
};

export const getRandomColor = () => {
  const key = Math.floor(Math.random() * 10);
  return Colors[key];
};
