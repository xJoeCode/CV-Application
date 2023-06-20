import {useState, useEffect} from 'react'
import { useUpdateResumeMutation } from '../features/api/apiSlice'
import {useAccount} from '../Components/Context/accountContext'

export default function useDbStatusState({formStates}={}){
    const [dbStatus,setDbStatus] = useState('nil')
    const [updatePost,{isLoading,status,error,data,isSuccess}]= useUpdateResumeMutation()

    const {acc,db} = useAccount()

    useEffect(()=>{


        if (dbStatus !== 'mutate'){
          return
        }
  
        if (dbStatus === 'mutate'){
          updatePost({db,formStates, acc:acc?.email})
          setDbStatus('nil')
        }
      },[dbStatus,formStates,db,updatePost,acc?.email,data,acc])

      return {setDbStatus}
}