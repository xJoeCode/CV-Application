import Input from "../Inputs/Input";
import {useForm, Controller} from 'react-hook-form'
import SelectInput from "../Inputs/SelectInput";
import Checkbox from "../Inputs/Checkbox";
import Button from "../UI/Button";
import  { useEffect } from "react";
import Select from "react-select";



export default function EducationInfoForm(props){

    const {register, watch, setValue, control, formState: { errors }, setError, clearErrors, handleSubmit} = useForm()
    let {graduationStartDate, graduationEndDate, currentlyAttending} = watch()


    
    useEffect(()=>{
        props.data?.currentlyAttending && setValue('currentlyAttending',true)
    },[setValue,props.data?.currentlyAttending ])
    

    

    const submitHandler = (data,e) =>{
        e.preventDefault()
        console.log(data.graduationStartDate)
         graduationStartDate = new Date(`${data.graduationStartDate}`)
        currentlyAttending ?  graduationEndDate = new Date(): graduationEndDate = new Date(`${data.graduationEndDate}`)

        if ( graduationStartDate >= graduationEndDate){
            setError("graduationEndDate", { type: "custom" , message:'Graduation End Date should be later than the start date' })
        } else {
            clearErrors('graduationEndDate')
        }
        

        const dateOptions = { year:'numeric', month:'long', day:'numeric'}
        data.graduationStartDate = graduationStartDate.toLocaleDateString('en-GB', dateOptions)
        data.graduationEndDate = graduationEndDate.toLocaleDateString('en-GB', dateOptions)

        const customValidation = graduationStartDate < graduationEndDate 
        customValidation && props.handleFormData(data,props.id)
        

    }

    const cancelHandler = (e) =>{
        e.preventDefault()
        props.cancelFormSubmission()
    }

    const degreeOptions = [ 'High School Diploma', 'GED', 'Associate of Arts','Associate of Science', 'Associate of Applied Science', 'Bachelor of Arts', 'Bachelor of Science', 'BBA', 'Master of Arts', 'Master of Science', 'MBA', 'PH.D' ]
    const degreeOptions2 = degreeOptions.map(options=> ({value:options, label:options}))



    let newStartDate = props.data?.graduationStartDate && new Date(`${props.data?.graduationStartDate}`)
    let newEndDate = props.data?.graduationEndDate && new Date(`${props.data?.graduationEndDate}`)


    newStartDate = props.data?.graduationStartDate && {day:`${newStartDate.getDate()}`.padStart(2,'0'), month:`${newStartDate.getMonth()+1}`.padStart(2,'0'), year:`${newStartDate.getFullYear()}`} 
    newStartDate = props.data?.graduationStartDate && `${newStartDate.year}-${newStartDate.month}-${newStartDate.day}`
    newEndDate = props.data?.graduationEndDate && {day:`${newEndDate.getDate()}`.padStart(2,'0'), month:`${newEndDate.getMonth()+1}`.padStart(2,'0'), year:`${newEndDate.getFullYear()}`} 
    newEndDate = props.data?.graduationEndDate && `${newEndDate.year}-${newEndDate.month}-${newEndDate.day}`

  

    return(
        <div className="font-serif text-6xl m-2 p-5  text-ultraDarkBlue">
            <form  className="flex flex-col">
            <h1 className=" border-b-4 border-brightPink h-24 pt-6 w-full rounded-2xl">{props.formName}</h1>
                <ul>
                    <Input register={{...register('schoolName', {required:true})}} labelName="School Name" inputData={{ type: "text", id: "School Name", placeholder:"e.g James Cook Univeristy", value:props.data?.schoolName }}> </Input>
                    {errors.schoolName &&  <p className="text-[#e04040] text-xs"> School Name field is empty</p>}
                    <Input register={{...register('schoolLocation', {required:true})}} labelName="School Location" inputData={{ type: "text", id: "School Name", placeholder:"e.g Singapore", value:props.data?.schoolLocation }}> </Input>
                    {errors.schoolLocation &&  <p className="text-[#e04040] text-xs"> School Location field is empty</p>}
                    <li className=" flex flex-col">
                        <label className="font-serif text-lg  text-ultraDarkBlue" htmlFor='qualifications'>Qualifications</label>
                        <Controller control={control} id='qualifications'  name="qualifications" defaultValue={props?.data?.qualifications ?? degreeOptions2[0]} render={({field})=><Select {...field}   className="bg-white h-13 text-lg text-darkBlue  font-serif  focus:outline-none placeholder:text-[#5C6052]"  options={degreeOptions2}></Select>} />
                    </li>
                    <Input register={{...register('graduationStartDate', {required:true})}} labelName="Graduation Start Date" inputData={{ type: "date", id: "graduationStartDate", value:newStartDate}}> </Input>
                    {errors.graduationStartDate && <p className="text-[#e04040] text-xs"> Graduation Start Date field is empty</p>}
                    { watch('currentlyAttending') || <Input register={{...register('graduationEndDate', {required:true})}} labelName="Graduation End Date" inputData={{ type: "date", id: "graduationEndDate", value:newEndDate}}> </Input>}
                    {errors.graduationEndDate?.type === 'custom' && <p className="text-[#e04040] text-xs"> {`${errors.graduationEndDate.message}`}</p>}
                    {errors.graduationEndDate?.type === 'required' && <p className="text-[#e04040] text-xs"> Graduation End Date field is empty</p>}
                    <Checkbox register={{...register('currentlyAttending')}} labelName="I currently attend here" inputData={{ type: "checkbox", id: "currentlyAttending"}}> </Checkbox>
                    
                    <Button bgColor='bg-brightBlue' onClick={handleSubmit(submitHandler)}>Submit</Button>
                    <Button bgColor='bg-brightBlue' onClick={cancelHandler}>Cancel</Button>
                </ul>
                
            </form>
        </div>
    )
}