import './index.scss'
import { ReactNode } from 'react'

const InnerComp = (props: React.AllHTMLAttributes<HTMLDivElement>) => {
  const computedValue = props.value + '===' + '我派生出了一个新参数'
  return <div>{computedValue}</div>
}

const SoltComp = ({ children, ...props }: { children: (v: string) => ReactNode }) => {
  return (
    <button {...props} className='border-solid border-[2px] '>
      {children('我是参数')}
    </button>
  )
}

const ReactLearnDemo: React.FC = () => {
  return (
    <div>
      <SoltComp>{(v: string) => <InnerComp value={v}></InnerComp>}</SoltComp>
    </div>
  )
}

export default ReactLearnDemo
