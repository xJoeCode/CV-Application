import Input from "../Inputs/Input";
import {useForm} from 'react-hook-form'
import Button from "../UI/Button";
import { useEffect } from "react";
import { useAccount } from "../Context/accountContext";
import client from "../../Utils/api-client";
import {AnimatePresence, motion} from "framer-motion"
import { useNavigate } from "react-router-dom"




export default function SignInForm (props) {

    const {register, formState:{errors}, handleSubmit, setError} = useForm()
    const { acc, setAcc,userPass, setUserPass}= useAccount()
    const navigate = useNavigate()


    
    useEffect(()=>{
        if (!userPass){
            return
            }

        console.log(acc)
        

        if (userPass){


            const fetchUserCredential = async() => { const userCredential = await client('signIn', props.auth, userPass.email, userPass.password, setError)
            console.log(userCredential)
            setAcc(userCredential)
            setUserPass(null)
            window.localStorage.setItem("currentUser", JSON.stringify(userCredential))
            navigate("/")
            }
            fetchUserCredential()
        }


    },[props.auth,setError,userPass,acc,setAcc, setUserPass,navigate])
    
   

    const submitHandler = async ({email,password},e) =>{
        console.log(errors)
        e.preventDefault()
        setUserPass({email,password})

    }

    return(
            <motion.div initial={{translateY:-500}} animate={{translateY:0}} transition={{duration:0.8, type:"spring", ease:"easeInOut"}} className="bg-[#ebebeb] p-6 mt-6 w-max h-max shadow-xl rounded-lg flex  flex-row  justify-center items-center'">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <h1 className=" font-serif m-8 capitalize text-center text-ultraDarkBlue text-3xl"> Login</h1>  
                    <Input register={{...register('email', {required:true, pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}} labelName="Email" inputData={{ type: "email", id: "email" }}></Input>
                        {errors?.email?.type === 'required' && <p className="text-[#e04040]"> Email field is missing</p>}
                        {errors?.email?.type === 'pattern' && <p className="text-[#e04040]"> Please Enter a valid Email</p>}
                        {errors?.email?.type === 'custom' && <p className="text-[#e04040]"> {errors.email.message}</p>}
                    <Input register={{...register('password', {required:true})}} labelName="Password" inputData={{ type: "password", id: "password", placeholder:'Min 6 characters' }}></Input>
                        {errors?.password?.type === 'required' && <p className="text-[#e04040]"> Password field is missing</p>}
                        {errors?.password?.type === 'custom' && <p className="text-[#e04040]"> {errors.password.message}</p>}
                    <Button onClick={handleSubmit(submitHandler)} bgColor='bg-green'>Submit</Button>
                </form>
            </motion.div>
    )
}
