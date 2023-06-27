import ButtonSmall from "../UI/ButtonSmall"
import { memo } from "react"



 function BasicInfo({socialLinks, ...props}){


    //const socials = Object.entries(props).filter(entry=>(entry[0].includes('socials_') && entry[1].link))

    console.log(socialLinks)


    return(
    <div className=" bg-brightPink min-h-screen w-full h-full text-center rounded-sm">
        <h1 className="font-serif m-8 capitalize text-ultraDarkBlue text-3xl">{props.name}</h1>
        <p className="font-serif text-ultraDarkBlue text-xl">{props.email}</p>
        <p className="font-serif text-ultraDarkBlue text-xl">{props.profession}</p>
        <p className="font-serif text-ultraDarkBlue text-xl">{props.phoneNumber}</p>
        <p className="font-serif text-ultraDarkBlue text-xl">{props.address}</p>
        {/*socials && socials.map(entry=><p key={entry[0]} className="font-serif text-ultraDarkBlue mt-3 text-xl" >{`${entry[1].website.value}: ${entry[1].link}`}</p>) */}

        <ul className="mt-2">
            {socialLinks.length > 0 && socialLinks.map(link => <li key={link.link} className="font-serif text-ultraDarkBlue text-xl">{link.website}: {link.link}</li>)} 
        </ul>
        
        <ul>
            {props.skills.length > 0 && <li className="font-serif text-ultraDarkBlue mt-3 text-xl" > Skills: </li>}
            {props.skills.length > 0 && props.skills.map(entry =>
            <p className="font-serif text-ultraDarkBlue text-xl" key={entry}>{entry}</p>
            )}
            {props.showButtons && <ButtonSmall onClick={props.onClick}>Edit</ButtonSmall>}
        </ul>
    </div>
    )
}

BasicInfo = memo(BasicInfo)

export default BasicInfo