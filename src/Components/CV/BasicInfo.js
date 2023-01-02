import ButtonSmall from "../UI/ButtonSmall"


export default function BaiscInfo(props){




    return(

        <>
            <div className=" bg-brightPink w-full h-full text-center ">
            <h1 className="font-serif m-8 capitalize text-ultraDarkBlue text-3xl">{props.name}</h1>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.email}</p>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.phoneNumber}</p>
            <p className="font-serif text-ultraDarkBlue text-xl">{props.address}</p>
            {props.showButtons && <ButtonSmall onClick={props.onClick}>Edit</ButtonSmall>}
            </div>
        </>
    )
}