import { motion as m } from "framer-motion"


export default function CvContainer(props){




    return(

        <m.div initial={{x:'-100vh'}} animate={{x:0}} transition={{duration:1, type:"spring", ease:"easeInOut"}} className=" flex flex-col items-center container h-5/6 bg-darkBlue m-2">
            {props.children}
        </m.div>
    )
}