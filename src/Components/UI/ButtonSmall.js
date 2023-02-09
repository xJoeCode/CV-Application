

export default function ButtonSmall(props) {
    return (
        <button
            onClick={props.onClick}
            className={`w-fit h-8 px-3 m-2 text-center text-base rounded-lg shadow-lg text-[#2c2c27] bg-green duration-300 ease-in-out hover:bg-brightPink ${props.className}`}
        >
            {props.children}
        </button>
    );
}
