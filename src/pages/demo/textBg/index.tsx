import './index.scss'

const TextDemo: React.FC = () => {
  return (
    <div className="top-wrapper w-full h-100vh relative flex items-center justify-center">
      <img src="/imgs/bgImage.jpg" className="absolute top-0 left-0 w-full h-full" alt="" />
      <div className='mask absolute left-0 w-full h-full flex items-center justify-center'></div>
      <h1 className='text w-full h-full flex items-center justify-center'>choose a demo sb</h1>
    </div>
  )

}

export default TextDemo