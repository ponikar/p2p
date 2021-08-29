import { createContext, useEffect, useState } from "react";

export const useMakeContext = <ContextType>(INITIAL_STATE: ContextType) => {
  const [context, setContext] = useState<ContextType>(INITIAL_STATE);

  return [context, setContext];
};

export const makeContext = <T>(INITIAL_STATE: T) => {
  return createContext<T>(INITIAL_STATE);
};
