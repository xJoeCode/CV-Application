import Input from "../Inputs/Input";
import {useForm} from 'react-hook-form'
import SelectInput from "../Inputs/SelectInput";
import Checkbox from "../Inputs/Checkbox";
import Button from "../UI/Button";



export default function EducationInfoForm(props){

    const {register, formState: { errors }, handleSubmit} = useForm()

    const degreeOptions = ['High School Diploma', 'GED', 'Associate of Arts','Associate of Science', 'Associate of Applied Science', 'Bachelor of Arts', 'Bachelor of Science', 'BBA', 'Master of Arts', 'Master of Science', 'MBA', 'PH.D' ]

    const submitHandler = (data,e) =>{
        e.preventDefault()
        console.log(data)
        props.educationFormData(data)
    }

    return(
        <div className="font-serif text-6xl m-2 text-[beige]">
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col">
                <ul>
                    <Input register={{...register('schoolName', {required:true})}} labelName="School Name" inputData={{ type: "text", id: "School Name", placeholder:"e.g James Cook Univeristy"  }}> </Input>
                    <Input register={{...register('schoolLocation', {required:true})}} labelName="School Location" inputData={{ type: "text", id: "School Name", placeholder:"e.g Singapore"  }}> </Input>
                    <SelectInput register={{...register('degree', {required:true})}} inputData={{name:'Degree', id:'degreeSelect', options:{degreeOptions}}}>Degree</SelectInput>
                    <Input register={{...register('graduationStartDate', {required:true})}} labelName="Graduation Start Date" inputData={{ type: "date", id: "graduationStartDate"}}> </Input>
                    <Input register={{...register('graduationEndDate', {required:true})}} labelName="Graduation End Date" inputData={{ type: "date", id: "graduationEndDate"}}> </Input>
                    <Checkbox register={{...register('currentlyAttending', )}} labelName="I currently attend here" inputData={{ type: "checkbox", id: "currentlyAttending"}}> </Checkbox>
                    <Button bgColor='bg-brightYellow' onClick={handleSubmit(submitHandler)}>Submit</Button>
                </ul>
                
            </form>
        </div>
    )
}