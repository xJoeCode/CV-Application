


export default function EducationInfo(props){




    return(

        <div className=" m-3">
            <h1 className="font-serif text-center text-beige text-2xl">{`School: ${props.schoolName}`}</h1>
            <p className="font-serif text-beige text-center text-2xl">{`Location: ${props.schoolLocation}`}</p>
            <ul className=" flex p-3">
                <li>
                    <p className="font-serif text-beige  text-2xl">{`${props.graduationStartDate} -`}</p>
                </li>
                <li>
                    <p className="font-serif text-beige mx-2 text-2xl">{props.graduationStartDate}</p>
                </li>
            </ul>
            
            
        </div>
    )
    }