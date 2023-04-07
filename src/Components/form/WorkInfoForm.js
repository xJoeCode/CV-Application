import Input from "../Inputs/Input";
import {useForm} from 'react-hook-form'
import SelectInput from "../Inputs/SelectInput";
import { useEffect } from "react";
import Checkbox from "../Inputs/Checkbox";
import Button from "../UI/Button";



export default function WorkInfoForm(props){


    const {register, setValue, formState: { errors }, setError, clearErrors, watch, handleSubmit} = useForm()


    useEffect(()=>{
        props.data?.currentlyWorking && setValue('currentlyWorking',true)
    },[setValue, props.data?.currentlyWorking ])



    const submitHandler = (data,e) =>{
        e.preventDefault()
        const startDate = new Date(`${data.startDate}`)
        const endDate = data.currentlyWorking ? new Date() : new Date(`${data.endDate}`)

        
        startDate >= endDate  ? setError("endDate", { type: "custom" , message:'End Date should be later than the start date' }) : clearErrors("endDate")
        
        const customValidation = startDate < endDate 

        const dateOptions = { year:'numeric', month:'long', day:'numeric'}
        data.startDate = startDate.toLocaleDateString('en-GB', dateOptions)
        data.endDate = endDate.toLocaleDateString('en-GB', dateOptions)

        customValidation && props.handleFormData(data,props.id)
        
    }

    const cancelHandler = (e) =>{
        e.preventDefault()
        props.cancelFormSubmission()
    }

    let newStartDate = props.data?.startDate && new Date(`${props.data?.startDate}`)
    let newEndDate = props.data?.endDate && new Date(`${props.data?.endDate}`)


    newStartDate = props.data?.startDate && {day:`${newStartDate.getDate()}`.padStart(2,'0'), month:`${newStartDate.getMonth()+1}`.padStart(2,'0'), year:`${newStartDate.getFullYear()}`} 
    newStartDate = props.data?.startDate && `${newStartDate.year}-${newStartDate.month}-${newStartDate.day}`
    newEndDate = props.data?.endDate && {day:`${newEndDate.getDate()}`.padStart(2,'0'), month:`${newEndDate.getMonth()+1}`.padStart(2,'0'), year:`${newEndDate.getFullYear()}`} 
    newEndDate = props.data?.endDate && `${newEndDate.year}-${newEndDate.month}-${newEndDate.day}`

    

    return(
        <div className="font-serif text-6xl m-2 p-5 text-ultraDarkBlue">
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
                <h1>{props.formName}</h1>
                <ul>
                    <Input register={{...register('jobTitle', {required:true})}} labelName="Job Title" inputData={{ type: "text", id: "jobTitle", placeholder:"e.g Retail Sales Associate", value:props.data?.jobTitle  }}> </Input>
                    {errors.jobTitle &&  <p className="text-[#e04040] text-xs"> Job Title field is empty</p>}
                    <Input register={{...register('employer', {required:true})}} labelName="Employer" inputData={{ type: "text", id: "employer", placeholder:"e.g H&M", value:props.data?.employer  }}> </Input>
                    {errors.employer &&  <p className="text-[#e04040] text-xs"> Employer field is empty</p>}
                    <Input register={{...register('location', {required:true})}} labelName="location" inputData={{ type: "text", id: "location", placeholder:"e.g Singapore", value:props.data?.location  }}> </Input>
                    {errors.location &&  <p className="text-[#e04040] text-xs"> Location field is empty</p>}
                    <Input register={{...register('startDate', {required:true})}} labelName="Start Date" inputData={{ type: "date", id: "startDate", value:newStartDate}}> </Input>
                    {errors.startDate &&  <p className="text-[#e04040] text-xs"> Start Date field is empty</p>}
                    {watch('currentlyWorking') || <Input register={{...register('endDate', {required:true})}} labelName="End Date" inputData={{ type: "date", id: "endDate", value:newEndDate}}> </Input>}
                    {errors.endDate?.type === 'required' &&  <p className="text-[#e04040] text-xs"> End Date field is empty</p>}
                    {errors.endDate?.type === 'custom' && <p className="text-[#e04040] text-xs"> {`${errors.endDate.message}`}</p>}
                    <Checkbox register={{...register('currentlyWorking' )}} labelName="I currently work here" inputData={{ type: "checkbox", id: "currentlyWorking"}}> </Checkbox>
                    <Button bgColor='bg-green' onClick={handleSubmit(submitHandler)}>Submit</Button>
                    <Button bgColor='bg-green' onClick={cancelHandler}>Cancel</Button>
                </ul>
                
            </form>
        </div>
    )
}