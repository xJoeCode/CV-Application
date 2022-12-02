

export default function ButtonSmall(props) {
    return (
        <button
            onClick={props.onClick}
            className={`w-fit h-8 px-3 text-center text-base rounded-lg shadow-lg text-[#2c2c27] bg-[#BFBB00] duration-300 ease-in-out hover:bg-[#8E4C00]`}
        >
            {props.children}
        </button>
    );
}
