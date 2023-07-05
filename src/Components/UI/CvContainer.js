import { motion , AnimatePresence } from "framer-motion"


export default function CvContainer(props){




    return(

        <motion.div initial={{x:'-100vh'}} animate={{x:0}} transition={{ duration:1, type:"spring", ease:"easeInOut", staggerChildren:0.5 }} className=" m-2 p-0 grid grid-cols-4  items-center   shadow-2xl rounded-sm sm:w-4/5 lg:w-3/5 h-full bg-white ">
                {props.children}
        </motion.div>
    )
}