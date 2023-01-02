import { motion as m } from "framer-motion"


export default function CvContainer(props){




    return(

        <m.div initial={{x:'-100vh'}} animate={{x:0}} transition={{duration:1, type:"spring", ease:"easeInOut"}} className=" m-2 p-0 grid grid-cols-4  items-center min-w-[1000px]  w-3/5 h-full bg-beige ">
            {props.children}
        </m.div>
    )
}