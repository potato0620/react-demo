import { useEffect } from "react"


/**
 * 类似于vue的onMounted
 * @param cb 回调函数
 * Usage: just a example
 * ```
 * const xin = (a,b) => {
 *  return a+b
 * }
 * 
 * ```
 * 
 * 
 * 
 */
const onMounted = (cb: Function, unCb?: Function) => {
	useEffect(() => {
		cb()
		return () => {
			unCb && unCb()
		}
	}, [])
}
/**
 * 类似于vue的 onBeforeUnmount
 * @param cb 回调函数
 */
const onBeforeUnmount = (cb: Function) => {
	useEffect(() => {
		return () => {
			cb() && cb()
		}
	}, [])
}

/**
 * 获取一个在指定范围内的随机数
 * @param min 
 * @param max 
 * @returns 随机数(非整数)
 */
const getRandom = (min:	number, max: number) => {
	return Math.random() * (max - min) + min;
}

export {
	onMounted,
	getRandom,
	onBeforeUnmount
}