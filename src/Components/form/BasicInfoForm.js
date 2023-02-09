import Input from "../Inputs/Input";
import Button from "../UI/Button";
import ButtonSmall from "../UI/ButtonSmall";
import {useForm, Controller} from 'react-hook-form'
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Select from "react-select";

export default function BasicInfoForm(props) {

   

    const {register, formState: { errors }, control, handleSubmit} = useForm()
    const [socialLinks,setSocialLinks] = useState([])

    useEffect(()=>{
        console.log(socialLinks)
    })

    const submitHandler = (data,e) =>{
        e.preventDefault()
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

    const deleteSocialLinksHandler = (e) =>{
        e.preventDefault()
        setSocialLinks(prevLinks =>([...(prevLinks.slice(0,-1))]))
    }

    const socialWebsites = [{label:'Twitter',value:'Twitter'},{label:'Linkedin', value:'Linkedin'},{label:'Website',value:'Website'}]


    return (
        <div>
            <h1 className="font-serif text-6xl m-2 text-center text-ultraDarkBlue">{props.formName}</h1>
            <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col items-center content-between text-center">
                <Input  register={{...register('name', {required:true, value:props.data?.name})}} labelName="Name" inputData={{ type: "text", id: "name",  }}></Input>
                {errors?.name?.type === 'required' && <p className="text-[#e04040]"> Name field is missing</p>}
                <Input register={{...register('email', {required:true, value:props.data?.email, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "text", id: "email",}}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
                {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
                <Input register={{...register('profession', {required:true, value:props.data?.profession})}} labelName="Profession" inputData={{ type: "text", id: "profession" }}></Input>
                {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Profession field is missing</p>}
                <Input register={{...register('phoneNumber', {required:true, value:props.data?.phoneNumber, pattern:/^[+]*[6|8|9]\d{7}|\+65[6|8|9]\d{7}|\+65\s[6|8|9]\d{7}/})}} labelName="Phone Number" inputData={{ type: "tel", id: "phoneNUmber", required: "required" }}></Input>
                {errors?.phoneNumber?.type === 'required' && <p className="text-[#e04040]"> Phone Number field is missing</p>}
                {errors?.phoneNumber?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Phone Number</p>}
                <Input register={{...register('address', {required:true, value:props.data?.address})}} labelName="Address" inputData={{ type: "text", id: "address" }}></Input>
                {errors?.address?.type === 'required' && <p className="text-[#e04040]"> Address field is missing</p>}
                <ButtonSmall onClick={addSocialLinksHandler}>Add Social Links</ButtonSmall>
                {socialLinks && socialLinks.map(linkId=>(
                <div key={linkId} className="flex items-center">
                    <ul className="flex flex-col m-2 items-start">
                        <label className="font-serif text-lg  text-ultraDarkBlue" htmlFor='socialWebsite'>Website</label>
                        <Controller control={control} id={`socials_${linkId}.website`}  name={`socials_${linkId}.website`} defaultValue={socialWebsites[0]} render={({field})=><Select {...field}   className="bg-white h-13 text-lg text-darkBlue  font-serif  focus:outline-none placeholder:text-[#5C6052]" options={socialWebsites}  ></Select>} />
                    </ul>
                    <Input register={{...register(`socials_${linkId}.link`)}} labelName="Social Link" inputData={{ type: "text", id: "socialLink", required:"required" }} ></Input>
                    <ButtonSmall className='relative top-3' onClick={deleteSocialLinksHandler}>Remove</ButtonSmall>
                </div>))}
                
                <Button bgColor='bg-green'>Submit</Button>
                <Button onClick={cancelHandler} bgColor='bg-green'>Cancel</Button>
            
            </form>
        </div>
    );
}
