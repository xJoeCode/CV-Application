export default function Input(props) {
    return (
        <>
            <label htmlFor={props.inputData.id}>{props.labelName}</label>
            <input {...props.inputData}></input>
        </>
    );
}
