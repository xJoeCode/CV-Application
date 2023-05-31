import {motion} from 'framer-motion'
import { memo } from 'react';

 function ButtonSmall(props) {
    return (
        <motion.button initial={{opacity:0}} animate={{opacity:1}} 
            onClick={props.onClick}
            className={`w-fit h-8 px-3 m-2 text-center text-base rounded-lg shadow-lg text-[#2c2c27] bg-green duration-300 ease-in-out hover:bg-[#7A7D91] ${props.className}`}
        >
            {props.children}
        </motion.button>
    );
}

ButtonSmall = memo(ButtonSmall)

export default ButtonSmall
