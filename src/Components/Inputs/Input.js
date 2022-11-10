export default function Input(props) {
    return (
        <>
            <label className="font-serif text-lg m-2 text-[beige] " htmlFor={props.inputData.id}>
                {props.labelName}
            </label>
            <input className="bg-beige w-30 h-12 text-lg p-3 font-serif focus: outline-none focus:bg-[#8D9539]"{...props.register} {...props.inputData}></input>
        </>
    );
}
