import './index.scss'

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
    </>
  )
}

export default FlexLayout
