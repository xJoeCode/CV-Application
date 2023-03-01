import ButtonSmall from "../UI/ButtonSmall"



export default function BaiscInfo(props){


    const socials = Object.entries(props).filter(entry=>(entry[0].includes('socials_') && entry[1].link))
 


    return(

        <>
            <div className=" bg-brightPink w-full h-full text-center ">
            <h1 className="font-serif m-8 capitalize text-ultraDarkBlue text-3xl">{props.name}</h1>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.email}</p>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.profession}</p>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.phoneNumber}</p>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.address}</p>
            {socials && socials.map(entry=><p key={entry[0]} className="font-serif text-ultraDarkBlue mt-3 text-xl" >{`${entry[1].website.value}: ${entry[1].link}`}</p>)}
            {props.showButtons && <ButtonSmall onClick={props.onClick}>Edit</ButtonSmall>}
            </div>
        </>
    )
}