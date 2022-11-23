


export default function EducationInfo(props){




    return(

        <div className=" m-3">
            <h1 className="font-serif text-beige text-5xl">{props.schoolName}</h1>
            <p className="font-serif text-beige text-2xl">{props.schoolLocation}</p>
            <p className="font-serif text-beige text-2xl">{props.graduationStartDate}</p>
            <p className="font-serif text-beige text-2xl">{props.graduationStartDate}</p>
        </div>
    )
    }