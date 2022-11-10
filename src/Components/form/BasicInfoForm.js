import Input from "../Inputs/Input";
import Button from "../UI/Button";
import {useForm} from 'react-hook-form'
import { useEffect } from "react";

export default function BasicInfoForm(props) {

   

    const {register, formState: { errors }, handleSubmit} = useForm()

    useEffect(()=>{
        
    })

    const submitHandler = (data,e) =>{
        e.preventDefault()
        props.basicFormData(data)
    }


    return (
        <div>
            <h1 className="font-serif text-6xl m-2 text-[beige]">Basic Info</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
                <Input register={{...register('name', {required:true})}} labelName="Name" inputData={{ type: "text", id: "name",  }}></Input>
                {errors?.name?.type === 'required' && <p className="text-[#e04040]"> Name field is missing</p>}
                <Input register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "text", id: "email",}}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
                {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
                <Input register={{...register('phoneNumber', {required:true, pattern:/[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/})}} labelName="Phone Number" inputData={{ type: "number", id: "phoneNUmber", required: "required" }}></Input>
                {errors?.phoneNumber?.type === 'required' && <p className="text-[#e04040]"> Phone Number field is missing</p>}
                {errors?.phoneNumber?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Phone Number</p>}
                <Input register={{...register('address', {required:true})}} labelName="Address" inputData={{ type: "text", id: "address" }}></Input>
                {errors?.address?.type === 'required' && <p className="text-[#e04040]"> Address field is missing</p>}
                <Button bgColor='bg-[#242A1F]'>Submit</Button>
            </form>
        </div>
    );
}
