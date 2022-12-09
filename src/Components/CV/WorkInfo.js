import ButtonSmall from "../UI/ButtonSmall"


export default function WorkInfo(props){

    const editHandler = () =>{
        props.handleEdit(props.id)
    }
    const deleteHandler = () =>{
        props.handleDelete(props.id)
    }


    return(

        <div className=" flex flex-col items-center m-3">
            <h1 className="font-serif text-center text-beige text-2xl">{`School: ${props.jobTitle}`}</h1>
            <p className="font-serif text-beige text-center text-2xl">{`Location: ${props.country}`}</p>
            <p className="font-serif text-beige text-center text-2xl">{`Qualifications: ${props.employer}`}</p>
            <ul className=" flex justify-center">
                <li>
                    <p className="font-serif text-beige  text-2xl">{`${props.startDate} -`}</p>
                </li>
                <li>
                    <p className="font-serif text-beige mx-2 text-2xl">{props.endDate}</p>
                </li>
            </ul>
            <div>
            {props.showButtons && <ButtonSmall onClick={editHandler}>Edit</ButtonSmall>}
            {props.showButtons && <ButtonSmall onClick={deleteHandler}>Delete</ButtonSmall>}
            </div>
            
            
        </div>
    )
    }