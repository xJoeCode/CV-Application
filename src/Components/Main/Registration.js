import { useEffect } from "react"
import Input from "../../Components/Inputs/Input";
import {useForm} from 'react-hook-form'
import Button from "../../Components//UI/Button";
import ButtonSmall from "../UI/ButtonSmall";
import { useQuery } from '@tanstack/react-query'
import client from "../../Utils/api-client";
import { useAccount } from "../Context/accountContext";


export default function Registration(props){

    const {register, formState:{errors}, handleSubmit, setError} = useForm()
    const { setAcc,userPass, setUserPass, currentPage, setCurrentPage}= useAccount()

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

        setUserPass({email,password})
    
    }

    return(
        <div className="bg-beige h-96 w-96 absolute top-1/2 left-1/2 mt-[-12rem] ml-[-12rem] flex shadow-lg flex-row  justify-center items-center'">
        
        <form className="flex items-center flex-col" onSubmit={handleSubmit(submitHandler)}>
            <h1 className=" font-serif m-8 capitalize text-ultraDarkBlue text-center text-3xl"> Register</h1>  
            <Input  register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "email", id: "email" }}></Input>
            {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
            {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
            {errors?.email?.type === 'custom' && <p className="text-[#e04040]"> {errors.email.message}</p>}
            <Input  register={{...register('password', {required:true, minLength:6})}} labelName="Password" inputData={{ type: "password", id: "password", placeholder:'Min 6 characters' }}></Input>
            {errors?.password?.type === 'required' && <p className="text-[#e04040]"> Password field is missing</p>}
            {errors?.password?.type === 'minLength' && <p className="text-[#e04040]"> Please Enter a Password with minimum 6 characters</p>}
            <div>
                <ButtonSmall onClick={handleSubmit(submitHandler)}>Submit</ButtonSmall>
                <ButtonSmall onClick={()=>setCurrentPage(null)}>Cancel</ButtonSmall>
            </div>
            
        </form>
        </div>

    )
}