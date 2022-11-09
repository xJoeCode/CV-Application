import Input from "../Inputs/Input";

export default function BasicInfoForm() {
    return (
        <form>
            <Input labelName="Name" inputData={{ type: "text", id: "name", required: "required" }}></Input>
        </form>
    );
}
