


export default function NavigationButton(props) {




    return (


        <button 
            onClick={props.onClick}
            className={` m-3 text-center text-lg  text-[#2c2c27] font-raleway border-0  hover:border-b `}
            type={props.buttonType}
        >
            {props.children}
        </button>
    );
}




