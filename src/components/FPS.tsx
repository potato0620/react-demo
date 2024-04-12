import { useWindowSize } from 'react-use'
import { css } from '@emotion/react'
import { useFps } from '@/hooks/useFPS'

export function Fps() {
  const { width } = useWindowSize()
  const { avgFps } = useFps(Math.floor(width / 2))

  return (
    <div
      className="flex center"
      css={css`
        position: fixed;
        background: white;
        top: 0.5em;
        left: 0.5em;
        width: fit-content;
        padding: 0 1em;
        height: 2.5em;
        border-radius: 0.1em;
        border: 0.08em dashed black;
        cursor: pointer;
        z-index: 99;
      `}
    >
      <span style={{ fontSize: '12px' }}>{avgFps}</span>
    </div>
  )
}
