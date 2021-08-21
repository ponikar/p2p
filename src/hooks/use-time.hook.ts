import { useEffect, useState } from "react";
import { getCurrentTime } from "../utils/time.utills";

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return currentTime;
};
