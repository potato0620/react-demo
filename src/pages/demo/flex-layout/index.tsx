import './index.scss'
import { cn } from '@/utils'

const FlexLayout: React.FC = () => {
  return (
    <>
      <div className='flex-wrapper w-full flex flex-wrap gap-[10px] mt-[150px]'>
        <span className='flex-item bg-red-400 flex-[1_0_49%]'>1</span>
        <span className='flex-item bg-yellow-100 flex-[1_0_49%]'>1</span>
        <span className='flex-item bg-orange-600 flex-[1_1_49%]'>1</span>
        <span className='flex-item bg-green-600 flex-[1_1_49%]'>1</span>
        <h1>flex-[1,0,xxpx]</h1>
      </div>
      <div className='flex-wrapper h-[100px] flex bg-pink-300 gap-[10px] mt-[100px]'>
        <span className='flex-item bg-red-400 flex-[0_0_100px]'>1</span>
        <span className='flex-item bg-yellow-100 flex-[0_0_100px]'>1</span>
        <span className='flex-item bg-orange-600 flex-[0_1_100px]'>1</span>
        <span className='flex-item bg-green-600 flex-[0_1_100px]'>1</span>
        <h1>flex</h1>
      </div>
      <div className='flex-wrapper h-[100px] inline-flex bg-pink-300 gap-[10px] mt-[100px]'>
        <span className='flex-item bg-red-400 w-[100px]'>1</span>
        <span className='flex-item bg-yellow-100 w-[100px]'>1</span>
        <span className='flex-item bg-orange-600 w-[100px]'>1</span>
        <span className='flex-item bg-green-600 w-[100px]'>1</span>
        <h1>inline-flex</h1>
      </div>
      <div className='w-full h-100px bg-teal-300 flex'>
        <div className='item flex-[50%] bg-red-200'>
          <div className='w-900px'></div>
        </div>
        <div className='item flex-[50%]  bg-dark-300'></div>
      </div>
      <div>添加overflow hidden 即可保持宽度与flex-1 一致</div>

      <div
        className={cn('w-[100px] h-[100px] bg-red-400', {
          'color-red': true,
          'bg-black': true
        })}
      >
        className 合并测试
      </div>
    </>
  )
}

export default FlexLayout
