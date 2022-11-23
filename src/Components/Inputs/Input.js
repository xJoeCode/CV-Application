export default function Input(props) {
    return (
        <li className="list-none flex flex-col justify-center items-start m-2">
            <label className="font-serif text-lg  text-[beige] " htmlFor={props.inputData.id}>
                {props.labelName}
            </label>
            <input
                className="bg-beige w-30 h-12 text-lg p-3 font-serif focus:outline-none text-darkBlue placeholder:text-[#5C6052] "
                {...props.register}
                {...props.inputData}
            ></input>
        </li>
    );
}
