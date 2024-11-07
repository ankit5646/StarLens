import notfound from '/404.webp'

const Notfound = () => {
  return (
      <div className='w-screen h-screen flex items-center justify-center bg-black'>
          
          <img className='h-[50%] object-cover' src={ notfound } alt="" />
    </div>
  )
}

export default Notfound