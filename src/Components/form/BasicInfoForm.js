import Input from "../Inputs/Input";
import Button from "../UI/Button";

export default function BasicInfoForm() {
    return (
        <div>
            <h1 className="font-serif text-6xl m-2 text-[beige]">Basic Info</h1>
            <form className="flex flex-col">
                <Input labelName="Name" inputData={{ type: "text", id: "name", required: "required" }}></Input>
                <Input labelName="Email" inputData={{ type: "text", id: "email", required: "required" }}></Input>
                <Input labelName="Phone Number" inputData={{ type: "number", id: "phoneNUmber", required: "required" }}></Input>
                <Input labelName="Address" inputData={{ type: "text", id: "address", required: "required" }}></Input>
                <Button bgColor='bg-[#242A1F]'>Submit</Button>
            </form>
        </div>
    );
}
