export default function Checkbox(props) {




    return (
        <li className="list-none flex justify-center items-center m-2">
            <input 
                className=" bg-beige w-9 h-9 p-3 font-serif focus: outline-none appearance-none checked:bg-[#FFF924]  border-4 border-black"
                {...props.register}
                {...props.inputData}
            ></input>
            <label className="font-serif text-lg m-2 text-[beige] " htmlFor={props.inputData.id}>
                {props.labelName}
            </label>
        </li>
    );
}
