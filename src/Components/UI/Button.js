

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={`w-30 h-20 p-4 m-8 text-center rounded-lg shadow-lg text-[#B4B6A2] ${props.bgColor}`}
            type={props.buttonType}
        >
            {props.children}
        </button>
    );
}
