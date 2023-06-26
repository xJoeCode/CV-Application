import Input from "../Inputs/Input";
import Button from "../UI/Button";
import ButtonSmall from "../UI/ButtonSmall";
import {useForm, Controller} from 'react-hook-form'
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Select from "react-select";

export default function BasicInfoForm(props) {

   

    const {register, unregister, formState: { errors }, control, handleSubmit} = useForm()
    const [socialLinks,setSocialLinks] = useState([])
    const [skills, setSkills] = useState([])
    const [skillsInput, setSkillsInput] = useState('')
    const [editedSocialLinks,setEditedSocialLinks]=useState( props.data && Object.entries(props.data)?.filter(entry=>(entry[0].includes('socials_') && entry[1].link)))


    const submitHandler = (data,e) =>{
        e.preventDefault()
        data.skills = [...skills]
        props.basicFormData(data)
    }

    const cancelHandler = (e) =>{
        e.preventDefault()
        props.cancelFormSubmission()
    }

    const addSocialLinksHandler = (e) =>{
        e.preventDefault()
        setSocialLinks(prevLinks =>([...prevLinks, uuid()]))
    }

    const deleteSocialLinksHandler = (data,e,id) =>{
        e.preventDefault()
        console.log(id)
        console.log(data)
        id && unregister(id)
        socialLinks.length !== 0 ? setSocialLinks(prevLinks =>([...(prevLinks.slice(0,-1))])) : setEditedSocialLinks(prevLinks =>([...(prevLinks.filter(entry=> !entry[0].includes(id)))]))
    }

    const setSkillsHandler = (e) =>{
        e.preventDefault()
        if (!skills.includes(skillsInput)){
            setSkills((prevskills) =>[...prevskills, skillsInput])
        }
        setSkillsInput('')
    }

    const removeSkillsHandler = skill =>{
        setSkills((prevskills)=>prevskills.filter(skills=> !skills.includes(skill)))
    }

    const socialWebsites = [{label:'Twitter',value:'Twitter'},{label:'Linkedin', value:'Linkedin'},{label:'Website',value:'Website'}]
    const socialsData = props.data && Object.entries(props.data)?.filter(entry=>(entry[0].includes('socials_')))
    

    return (
        <div className="p-5 bg-[#e4e4e4]">
            <h1 className="font-serif text-6xl m-2 text-center text-ultraDarkBlue">{props.formName}</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center content-between text-center">
                <Input  register={{...register('name', {required:true})}} labelName="Name" inputData={{ type: "text", id: "name", defaultValue:props.data?.name }}></Input>
                {errors?.name?.type === 'required' && <p className="text-[#e04040]"> Name field is missing</p>}
                <Input register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "text", id: "email", defaultValue:props.data?.email}}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
                {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
                <Input register={{...register('profession', {required:true})}} labelName="Profession" inputData={{ type: "text", id: "profession", defaultValue:props.data?.profession }}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Profession field is missing</p>}
                <Input register={{...register('phoneNumber', {required:true, pattern:/^[+]*[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/})}} labelName="Phone Number" inputData={{ type: "tel", id: "phoneNUmber", required: "required", defaultValue:props.data?.phoneNumber }}></Input>
                {errors?.phoneNumber?.type === 'required' && <p className="text-[#e04040]"> Phone Number field is missing</p>}
                {errors?.phoneNumber?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Phone Number</p>}
                <Input register={{...register('address', {required:true})}} labelName="Address" inputData={{ type: "text", id: "address", defaultValue:props.data?.address }}></Input>
                {errors?.address?.type === 'required' && <p className="text-[#e04040]"> Address field is missing</p>}
                <ButtonSmall onClick={addSocialLinksHandler}>Add Social Links</ButtonSmall>

                
                {socialLinks && socialLinks.map(linkId=>(
                <div key={linkId} className="flex items-center">
                    <ul className="flex flex-col m-2 items-start">
                        <label className="font-serif text-lg  text-ultraDarkBlue" htmlFor='socialWebsite'>Website</label>
                        <Controller control={control} id={`socials_${linkId}.website`}  name={`socials_${linkId}.website`} defaultValue={socialWebsites[0]} render={({field})=><Select {...field}   className="bg-white h-13 text-lg text-darkBlue  font-serif  focus:outline-none placeholder:text-[#5C6052]" options={socialWebsites}  ></Select>} />
                    </ul>
                    <Input register={{...register(`socials_${linkId}.link`)}} labelName="Social Link" inputData={{ type: "text", id: "socialLink", required:"required" }} ></Input>
                    <ButtonSmall className='relative top-3' onClick={(e)=>deleteSocialLinksHandler(socialLinks,e)}>Remove</ButtonSmall>
                </div>))}

                {editedSocialLinks && editedSocialLinks.map(entry=>(
                <div key={entry[0]} className="flex items-center">
                    <ul className="flex flex-col m-2 items-start">
                        <label className="font-serif text-lg  text-ultraDarkBlue" htmlFor={`${entry[0]}.website`}>Website</label>
                        <Controller control={control} id={`${entry[0]}.website`}  name={`${entry[0]}.website`} defaultValue={entry[1].website} render={({field})=><Select {...field}   className="bg-white h-13 text-lg text-darkBlue  font-serif  focus:outline-none placeholder:text-[#5C6052]" options={socialWebsites}  ></Select>} />
                    </ul>
                    <Input register={{...register(`${entry[0]}.link`)}} labelName="Social Link" inputData={{ type: "text", id: `socialLink_${entry[0]}`, required:"required", defaultValue:entry[1].link }} ></Input>
                    <ButtonSmall className='relative top-3' onClick={(e)=>deleteSocialLinksHandler(socialsData,e,entry[0])}>Remove</ButtonSmall>
                </div>))}
                
                <div className="flex">
                    <Input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} labelName="Skills" inputData={{ type: "text", id: "skills", defaultValue:props.data?.skills}}></Input>
                    <ButtonSmall className='relative top-8' onClick={(e)=>setSkillsHandler(e)}>Add</ButtonSmall>
                </div>

                <div className="flex flex-col">
                    {skills.length > 0 && <p>Skills: </p>}
                    <div className="flex w-[24rem] justify-center flex-wrap">
                        {skills.length > 0 && skills.map(skill=>(
                        <p key={skill} onClick={()=>removeSkillsHandler(skill)} className={ 'border-2 rounded-sm m-1 p-1 cursor-pointer hover:line-through'} >{` ${skill} `}</p>
                        ))}
                    </div>
                </div>
                
                
                
                <Button onClick={handleSubmit(submitHandler)} bgColor='bg-brightBlue'>Submit</Button>
                <Button onClick={cancelHandler} bgColor='bg-brightBlue'>Cancel</Button>
            
            </form>
        </div>
    );
}
