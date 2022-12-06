import ButtonSmall from "../UI/ButtonSmall"


export default function BaiscInfo(props){




    return(

        <>
            <div className=" m-3">
            <h1 className="font-serif m-8 capitalize text-beige text-5xl">{props.name}</h1>
            <p className="font-serif text-beige text-2xl">{props.email}</p>
            <p className="font-serif text-beige text-2xl">{props.phoneNumber}</p>
            <p className="font-serif text-beige text-2xl">{props.address}</p>
            {props.showButtons && <ButtonSmall onClick={props.onClick}>Edit</ButtonSmall>}
            </div>
        </>
    )
}