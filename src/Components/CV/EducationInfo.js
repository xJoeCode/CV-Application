import ButtonSmall from "../UI/ButtonSmall"


export default function EducationInfo(props){

    const editHandler = () =>{
        props.handleEdit(props.id,'education')
    }
    const deleteHandler = () =>{
        props.handleDelete(props.id,'education')
    }


    return(

        <div className=" flex flex-col items-center m-3">
            <p className="font-serif text-center text-ultraDarkBlue text-xl">{`School: ${props.schoolName}`}</p>
            <p className="font-serif text-ultraDarkBlue text-center text-xl">{`Location: ${props.schoolLocation}`}</p>
            <p className="font-serif text-ultraDarkBlue text-center text-xl">{`Qualifications: ${props.qualifications.value}`}</p>
            <ul className=" flex justify-center">
                <li>
                    <p className="font-serif text-ultraDarkBlue  text-xl">{`${props.graduationStartDate} -`}</p>
                </li>
                <li>
                    <p className="font-serif text-ultraDarkBlue mx-2 text-xl">{props.graduationEndDate}</p>
                </li>
            </ul>
            <div>
            {props.showButtons && <ButtonSmall onClick={editHandler}>Edit</ButtonSmall>}
            {props.showButtons && <ButtonSmall onClick={deleteHandler}>Delete</ButtonSmall>}
            </div>
            
            
        </div>
    )
    }