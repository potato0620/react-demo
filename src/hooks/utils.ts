import { useEffect } from "react"

const onMounted = (cb: Function) => {
	useEffect(() => {
		cb()
	}, [])
}

export {
  onMounted
}