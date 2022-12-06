import ButtonSmall from "../UI/ButtonSmall"


export default function EducationInfo(props){

    const clickHandler = () =>{
        props.onClick(props.id)
    }


    return(

        <div key={props.id} className=" flex flex-col items-center m-3">
            <h1 className="font-serif text-center text-beige text-2xl">{`School: ${props.schoolName}`}</h1>
            <p className="font-serif text-beige text-center text-2xl">{`Location: ${props.schoolLocation}`}</p>
            <p className="font-serif text-beige text-center text-2xl">{`Qualifications: ${props.degree}`}</p>
            <ul className=" flex justify-center">
                <li>
                    <p className="font-serif text-beige  text-2xl">{`${props.graduationStartDate} -`}</p>
                </li>
                <li>
                    <p className="font-serif text-beige mx-2 text-2xl">{props.graduationStartDate}</p>
                </li>
            </ul>
            {props.showButtons && <ButtonSmall onClick={clickHandler}>Edit/ Delete</ButtonSmall>}
            
        </div>
    )
    }