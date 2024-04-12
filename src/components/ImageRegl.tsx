import { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import createREGL from 'regl'
import { DPR } from '@/common/ts/index'

interface Props {
  name: string
  exec: (regl: createREGL.Regl, image: HTMLImageElement) => Promise<void>
  children?: React.ReactNode
}

export default function ImageRegl({ exec, name, children }: Props) {
  const image = useRef<HTMLImageElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    canvas.current!.width = canvas.current!.offsetWidth * DPR
    canvas.current!.height = canvas.current!.offsetHeight * DPR
    const regl = createREGL({ canvas: canvas.current! })
    exec(regl, image.current!)

    return () => {
      regl.destroy()
    }
  }, [])

  return (
    <div className={name}>
      <img
        ref={image}
        src="src/assets/jojo.jpg"
        css={css`
          display: none;
        `}
      />
      {children}
      <canvas ref={canvas}></canvas>
    </div>
  )
}
