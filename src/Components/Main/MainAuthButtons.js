import {Link, Outlet, useLocation} from 'react-router-dom'
import Button from '../UI/Button'
import Button2 from "../UI/Button2"
import { motion, AnimatePresence } from 'framer-motion'



export default function MainAuthButtons(){


    const {pathname} = useLocation()




    return(
        <>
        <div className="w-full h-screen flex justify-center items-center" >
            <div  className={pathname !== '/' ? " bg-beige w-4/5 h-3/5 flex flex-row justify-center items-center rounded-md shadow-xl" : " bg-beige w-1/5 h-3/5 flex flex-col justify-center items-center rounded-md shadow-xl"}>
                <div  className={pathname !== '/' ?'flex bg-brightPink h-full flex-col justify-center w-2/5' : 'flex h-full flex-col justify-center'}>
                    
                        <Link to='register'>
                            <Button2
                            bgColor='bg-green'>Register</Button2>
                        </Link>
                        <Link to='login'>
                            <Button2 bgColor='bg-green'>Login</Button2>
                        </Link>
                        <Button2 bgColor='bg-green'>Use Sample</Button2>
                    
                </div >
                <div className=" w-screen h-max flex justify-center items-start">
                    <Outlet/>
                </div>
                </div>
                
        </div>  
    </>
    )
}