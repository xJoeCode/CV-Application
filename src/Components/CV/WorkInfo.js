import ButtonSmall from "../UI/ButtonSmall"
import {motion} from 'framer-motion'


export default function WorkInfo(props){

    const editHandler = () =>{
        props.handleEdit(props.id,'work')
    }
    const deleteHandler = () =>{
        props.handleDelete(props.id,'work')
    }


    return(

        <motion.div variants={props.animation} className=" flex flex-col items-start m-3">
            <h1 className="font-serif text-center text-ultraDarkBlue text-xl">{`Job Title: ${props.jobTitle}`}</h1>
            <p className="font-serif text-ultraDarkBlue text-left text-xl">{`Employer: ${props.employer}`}</p>
            <p className="font-serif text-ultraDarkBlue text-left text-xl">{`Location: ${props.location}`}</p>
            <p className="font-serif text-ultraDarkBlue text-left text-xl m-4">{props.jobDescription}</p>
            <ul className=" flex justify-center">
                <li>
                    <p className="font-serif text-ultraDarkBlue  text-xl">{`${props.startDate} -`}</p>
                </li>
                <li>
                    <p className="font-serif text-ultraDarkBlue mx-2 text-xl">{props.endDate}</p>
                </li>
            </ul>
            <div>
                {props.showButtons && <ButtonSmall onClick={editHandler}>Edit</ButtonSmall>}
                {props.showButtons && <ButtonSmall onClick={deleteHandler}>Delete</ButtonSmall>}
            </div>
        </motion.div>
    )
    }