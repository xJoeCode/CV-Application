import {motion} from 'framer-motion'

export default function Button(props) {




    return (


        <motion.button variants={props.buttonAnimation} initial='initial' whileHover="hover"
            onClick={props.onClick}
            className={`w-60 h-16 p-4 m-2 text-center text-base shadow-lg text-[#2c2c27]  ${props.bgColor}  duration-300 ease-in-out hover:bg-brightPink `}
            type={props.buttonType}
        >
            {props.children}
        </motion.button>
    );
}
