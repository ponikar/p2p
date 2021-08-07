import React, { FC, useContext, useEffect } from "react"
import { ToastContext } from "./toast.context"

export const Toast: FC = () => {
	const { setToastProps, show, text } = useContext(ToastContext)
	useEffect(() => {
		if (show) setTimeout(() => setToastProps({ show: false }), 3000)
	}, [show])
	if (!show) return <div />
	return (
		<div className="w-2/12 fixed bottom-5 left-5 text-highlight p-4 bg-secondryBack shadow-lg rounded-md">
			{text}
		</div>
	)
}
