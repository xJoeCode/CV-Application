

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className="w-30 h-20 p-4 m-3 text-center rounded-lg bg-[#414F36] shadow-lg text-[#B4B6A2]"
            type={props.buttonType}
        >
            {props.children}
        </button>
    );
}
