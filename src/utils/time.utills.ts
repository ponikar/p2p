export const getMessageTime = (time: string) => {
  const timestamp = new Date(time).toLocaleString();
  return timestamp.split(" ")[1].substr(0, 5);
};

export const getCurrentTime = () => {
  const date = new Date().toLocaleTimeString();
  return date.split(" ")[0].substr(0,5);
};
