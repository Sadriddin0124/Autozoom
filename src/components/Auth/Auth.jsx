import React from 'react'

const Auth = () => {
  return (
    <div className='fixed left-0 top-0 w-full h-full bg-white z-[20] flex justify-center items-center'>
      <div className='p-[20px] border rounded-2xl'>
        <form>
            <input type="text" placeholder='Number'/>
            <input type="text" placeholder='Password'/>
        </form>
      </div>
    </div>
  )
}

export default Auth
