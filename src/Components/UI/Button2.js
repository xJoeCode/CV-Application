import {motion} from 'framer-motion'


function Button(props) {




    return (
        <motion.button 
            onClick={props.onClick} initial={{opacity:0}}  whileInView={{opacity:1}}
            className={`lg:w-60 w-40 h-14 p-2 m-2 text-center text-base shadow-lg box-border text-[#8f8f8f]  bg-black `}
            type={props.buttonType}
        >
            {props.children}
        </motion.button>
    )
}


export default Button

