

export default function Input(props) {


    return (
        <li className="list-none flex flex-col justify-center items-start m-2">
            <label className="font-serif text-lg  text-ultraDarkBlue " htmlFor={props.inputData.id}>
                {props.labelName}
            </label>
            <input value={props.value} onChange={props.onChange}
                className="bg-grey w-30 h-12 text-lg p-3 font-serif focus:outline-none text-ultraDarkBlue placeholder:text-[#919781] "
                {...props.register}
                {...props.inputData}
            ></input>
        </li>
    );
}
