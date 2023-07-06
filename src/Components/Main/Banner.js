import Logo from "../UI/Logos/Logo"
import {memo} from 'react'


function Banner({acc, signOut, ...props}){


    return(
        <div className='flex w-full h-auto border-b-4 border-green shadow-xl bg-[#F5F5F5] m-0 p-0 '>
        <Logo styles='w-1/12' />
        <div className='flex flex-col justify-center'>
        <p>Welcome</p>
        <p>{acc.email}</p>
        <a className=' text-[#678E7F] cursor-pointer' onClick={signOut} href="/">Sign Out</a>
        </div>
        
    </div>
    )
}

Banner = memo(Banner)

export default  Banner