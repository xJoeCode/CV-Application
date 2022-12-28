import Input from "../Inputs/Input";
import {useForm} from 'react-hook-form'
import SelectInput from "../Inputs/SelectInput";
import Checkbox from "../Inputs/Checkbox";
import Button from "../UI/Button";
import React, { useEffect } from "react";



export default function EducationInfoForm(props){
    const {register, watch, formState: { errors }, setError, clearErrors, handleSubmit} = useForm()
    let {graduationStartDate, graduationEndDate, currentlyAttending} = watch()


    
    
    
    useEffect(()=>{
        
        
        console.log(errors)


        
    })
    

    const customDateValidation = () =>{
        
        const dateOptions = { year:'numeric', month:'long', day:'numeric'}
        graduationStartDate = new Date(`${graduationStartDate}`)
        currentlyAttending ? graduationEndDate = new Date() : graduationEndDate =  new Date(`${graduationEndDate}`)
        console.log(graduationStartDate < graduationEndDate)
        console.log(graduationStartDate , graduationEndDate)
        return(graduationStartDate <= graduationEndDate)
    }
    
    const degreeOptions = ['High School Diploma', 'GED', 'Associate of Arts','Associate of Science', 'Associate of Applied Science', 'Bachelor of Arts', 'Bachelor of Science', 'BBA', 'Master of Arts', 'Master of Science', 'MBA', 'PH.D' ]

    const submitHandler = (data,e) =>{
        e.preventDefault()
        
         graduationStartDate = new Date(`${data.graduationStartDate}`)
        currentlyAttending ?  graduationEndDate = new Date(): graduationEndDate = new Date(`${data.graduationEndDate}`)

        if ( graduationStartDate >= graduationEndDate){
            setError("graduationEndDate", { type: "custom" , message:'Graduation End Date should be later than the start date' })
        } else {
            clearErrors('graduationEndDate')
        }
        
        
        console.log(graduationStartDate < graduationEndDate)

        const dateOptions = { year:'numeric', month:'long', day:'numeric'}
        data.graduationStartDate = graduationStartDate.toLocaleDateString('en-GB', dateOptions)
        data.graduationEndDate = graduationEndDate.toLocaleDateString('en-GB', dateOptions)

        const customValidation = graduationStartDate < graduationEndDate 
        customValidation && props.educationFormData(data,props.id)
        

    }

    const cancelHandler = (e) =>{
        e.preventDefault()
        props.cancelFormSubmission()
    }

    

    

    return(
        <div className="font-serif text-6xl m-2 text-[beige]">
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
                <ul>
                    <Input register={{...register('schoolName', {required:true, value:props.data?.schoolName})}} labelName="School Name" inputData={{ type: "text", id: "School Name", placeholder:"e.g James Cook Univeristy"  }}> </Input>
                    {errors.schoolName &&  <p className="text-[#e04040] text-xs"> School Name field is missing</p>}
                    <Input register={{...register('schoolLocation', {required:true, value:props.data?.schoolLocation})}} labelName="School Location" inputData={{ type: "text", id: "School Name", placeholder:"e.g Singapore"  }}> </Input>
                    {errors.schoolLocation &&  <p className="text-[#e04040] text-xs"> School Location field is missing</p>}
                    <SelectInput register={{...register('degree', {required:true, value:props.data?.degree})}} inputData={{name:'Degree', id:'degreeSelect', options:{degreeOptions}}}>Degree</SelectInput>
                    <Input register={{...register('graduationStartDate', {required:true, value:props.data?.graduationStartDate})}} labelName="Graduation Start Date" inputData={{ type: "date", id: "graduationStartDate"}}> </Input>
                    {errors.graduationStartDate && <p className="text-[#e04040] text-xs"> Graduation Start Date field is missing</p>}
                    {watch('currentlyAttending') || <Input register={{...register('graduationEndDate', {required:true, value:props.data?.graduationEndDate})}} labelName="Graduation End Date" inputData={{ type: "date", id: "graduationEndDate"}}> </Input>}
                    {errors.graduationEndDate?.type === 'custom' && <p className="text-[#e04040] text-xs"> {`${errors.graduationEndDate.message}`}</p>}
                    {errors.graduationEndDate?.type === 'required' && <p className="text-[#e04040] text-xs"> Graduation End Date field is missing</p>}
                    <Checkbox register={{...register('currentlyAttending',{value:props.data?.currentlyAttending} )}} labelName="I currently attend here" inputData={{ type: "checkbox", id: "currentlyAttending"}}> </Checkbox>
                    
                    <Button bgColor='bg-brightYellow' onClick={handleSubmit(submitHandler)}>Submit</Button>
                    <Button bgColor='bg-brightYellow' onClick={cancelHandler}>Cancel</Button>
                </ul>
                
            </form>
        </div>
    )
}