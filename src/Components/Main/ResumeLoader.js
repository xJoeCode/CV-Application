import { useAccount } from "../Context/accountContext"
import { useGetResumeQuery } from "../../features/api/apiSlice"
import {useForms} from  '../Context/formContext'
import {useEffect} from 'react'



export default function ResumeLoader({setCvDisplay}){
    const {acc, setAcc, db} = useAccount()
    const [formStates, dispatchForms] = useForms();
    const {isLoading,error,data,isSuccess}= useGetResumeQuery({db,collection:acc.email, docId:acc.email},{skip:Boolean(!acc)})

    useEffect(()=>{


        if (formStates.formType === 'init' && data !== 'No such Document' && data){
            console.log('dispatching load from db')
            dispatchForms({type:'loadFromDb',data:data})
            setCvDisplay(true)
        }

    },[data,dispatchForms,formStates,setCvDisplay])



    return(
        <>
        </>
    )
}