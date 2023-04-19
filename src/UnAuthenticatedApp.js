import Input from "./Components/Inputs/Input";
import {useForm} from 'react-hook-form'
import Button from "./Components/UI/Button";
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query'
import { useState } from "react";
import client from "./Utils/api-client";
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useAccount } from "./Components/Context/accountContext";




function UnAuthenticatedApp (props) {

    const {register, formState:{errors}, handleSubmit, setError} = useForm()
    const { setAcc,userPass, setUserPass}= useAccount()

    const {data} = useQuery({
        queryKey:['users',userPass],
        queryFn: () => client('createuser', props.auth, userPass.email, userPass.password, setError),
        enabled: Boolean(userPass)
    })

    useEffect(()=>{
        if (!data){
            return
        }
        setAcc(data)
    },[data])

    
   

    const submitHandler = async ({email,password},e) =>{
        console.log(errors)
        e.preventDefault()
        //const data = await client('createuser', props.auth, email, password, setError)
        //setUser(data.user)
        setUserPass({email,password})
        
        
    }

    return(
        <div className="bg-[#ebebeb] h-screen flex  flex-row  justify-center items-center'">
        
        <form onSubmit={handleSubmit(submitHandler)}>
            <h1 className=" font-serif m-8 capitalize text-ultraDarkBlue text-3xl"> Register</h1>  
            <Input  register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "email", id: "email" }}></Input>
            {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
            {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
            {errors?.email?.type === 'custom' && <p className="text-[#e04040]"> {errors.email.message}</p>}
            <Input  register={{...register('password', {required:true, minLength:6})}} labelName="Password" inputData={{ type: "password", id: "password", placeholder:'Min 6 characters' }}></Input>
            {errors?.password?.type === 'required' && <p className="text-[#e04040]"> Password field is missing</p>}
            {errors?.password?.type === 'minLength' && <p className="text-[#e04040]"> Please Enter a Password with minimum 6 characters</p>}
            <Button onClick={handleSubmit(submitHandler)} bgColor='bg-green'>Submit</Button>
        </form>
        </div>
        
    )
}

export default UnAuthenticatedApp