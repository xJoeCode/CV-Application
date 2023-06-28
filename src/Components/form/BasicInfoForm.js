import Input from "../Inputs/Input";
import Button from "../UI/Button";
import ButtonSmall from "../UI/ButtonSmall";
import {useForm, Controller} from 'react-hook-form'
import { useState } from "react";
import { useAccount } from "../Context/accountContext";
import uuid from "react-uuid";
import Select from "react-select";

export default function BasicInfoForm(props) {

   

    const {register, formState: { errors }, handleSubmit} = useForm()
    const [skills, setSkills] = useState(()=> props.data?.skills || [])
    const [skillsInput, setSkillsInput] = useState('')
    const [socialLinksInput, setSocialLinksInput] = useState({website:'Twitter', link:''})
    const [socialLinks,setSocialLinks] = useState(() => props.data?.socialLinks || [])
    const {acc} = useAccount()


    const submitHandler = (data,e) =>{
        e.preventDefault()
        data.skills = [...skills]
        data.socialLinks = [...socialLinks]
        props.basicFormData(data)
    }

    const cancelHandler = (e) =>{
        e.preventDefault()
        props.cancelFormSubmission()
    }


    const addSocialLinksHandler = e =>{
        e.preventDefault()
        if (socialLinksInput.link && !socialLinks.find(link => link.link.includes(socialLinksInput.link))){
            setSocialLinks(prevlinks => [...prevlinks, socialLinksInput])
        }
        setSocialLinksInput({website:'Twitter', link:''})
        
    }

    const removeSocialLinksHandler = link =>{
        setSocialLinks((prevLinks)=>  prevLinks.filter(_prevLinks => !_prevLinks.link.includes(link.link)))
    }

    const setSkillsHandler = (e) =>{
        e.preventDefault()
        if (!skills.includes(skillsInput) && (skillsInput)){
            setSkills((prevskills) =>[...prevskills, skillsInput])
        }
        setSkillsInput('')
    }

    const removeSkillsHandler = skill =>{
        setSkills((prevskills)=>prevskills.filter(skills=> !skills.includes(skill)))
    }

    const setSocialLinksInputHandler = (e,option) =>{
        if (option === 'link'){
            const newSocialLinksinput = {...socialLinksInput, link:e.target.value}
            setSocialLinksInput(newSocialLinksinput)
        }

        if (option === 'website'){
            const newSocialLinksinput = {...socialLinksInput, website:e.target.value}
            setSocialLinksInput(newSocialLinksinput)
        }
    }



    

    return (
        <div className="p-5  bg-[#e4e4e4]">
            <h1 className="font-serif text-6xl m-2 text-center text-ultraDarkBlue">{props.formName}</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center content-between text-center">
                <Input  register={{...register('name', {required:true})}} labelName="Name" inputData={{ type: "text", id: "name", defaultValue:props.data?.name }}></Input>
                {errors?.name?.type === 'required' && <p className="text-[#e04040]"> Name field is missing</p>}
                <Input register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "text", id: "email", defaultValue:props.data?.email||acc.email}}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
                {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
                <Input register={{...register('profession', {required:true})}} labelName="Profession" inputData={{ type: "text", id: "profession", defaultValue:props.data?.profession }}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Profession field is missing</p>}
                <Input register={{...register('phoneNumber', {required:true, pattern:/^[+]*[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/})}} labelName="Phone Number" inputData={{ type: "tel", id: "phoneNUmber", required: "required", defaultValue:props.data?.phoneNumber, placeholder:'+65 ' }}></Input>
                {errors?.phoneNumber?.type === 'required' && <p className="text-[#e04040]"> Phone Number field is missing</p>}
                {errors?.phoneNumber?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Phone Number</p>}
                <Input register={{...register('address', {required:true})}} labelName="Address" inputData={{ type: "text", id: "address", defaultValue:props.data?.address }}></Input>
                {errors?.address?.type === 'required' && <p className="text-[#e04040]"> Address field is missing</p>}
                
                <p className="mt-2">Social Link: </p>
                <div className="flex flex-row">
                    <select value={socialLinksInput.website} onChange={(e) => setSocialLinksInputHandler(e,'website')} className="w-30 m-2 h-12 text-lg p-3 font-serif focus:outline-none text-ultraDarkBlue placeholder:text-[#919781] " name="socialLink">
                        <option value='Twitter'>Twitter</option>
                        <option value='Linkedin'>Linkedin</option>
                        <option value='Website'>Website</option>
                    </select>
                    <Input value={socialLinksInput.link} onChange={(e) => setSocialLinksInputHandler(e,'link')} inputData={{ type: "text", id: "socialLink"}}></Input>
                    <ButtonSmall className='relative top-3' onClick={(e)=>addSocialLinksHandler(e)}>Add</ButtonSmall>
                </div>

                <div className="flex flex-col">
                    {socialLinks.length > 0 && <p>Social Links: </p>}
                    <div className="flex w-[24rem] justify-center flex-wrap">
                        {socialLinks.length > 0 && socialLinks.map(socialLink=>(
                        <p key={socialLink.link} onClick={()=>removeSocialLinksHandler(socialLink)} className={ 'border-2 rounded-sm m-1 p-1 cursor-pointer hover:line-through'} >{` ${socialLink.website}: ${socialLink.link} `}</p>
                        ))}
                    </div>
                </div>

                <div className="flex">
                    <Input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} labelName="Skills" inputData={{ type: "text", id: "skills"}}></Input>
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
