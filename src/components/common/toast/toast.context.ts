import { createContext } from "react";

type ToastType = "success" | "danger" | "info";
export interface ToastPropsType {
  text: string;
  type: ToastType;
  show: boolean;
}

export type SetToastPropsType = { text?: string; type?: ToastType, show?: boolean };

export interface ToastContextType extends ToastPropsType {
  setToastProps: (props: SetToastPropsType) => void;
}

export const TOAST_DEFAULT_STATE: ToastPropsType = {
  show: false,
  type: "info",
  text: "",
};

export const ToastContext = createContext<ToastContextType>({
  ...TOAST_DEFAULT_STATE,
  setToastProps: () => {},
});
