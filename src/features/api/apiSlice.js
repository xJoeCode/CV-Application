import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import client from '../../Utils/api-client'
import { createUserWithEmailAndPassword} from 'firebase/auth'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fakeBaseQuery,
    tagTypes:['Register'],
    endpoints: (build) => ({
        registerUser: build.query({
            queryFn(arg){
            const {auth, email, password,setError} = arg

                const userCredential = async () => await client('createuser',auth,email,password,setError)
                console.log(userCredential)
                return {data:userCredential}
                
            },providesTags:['Register']
            
        })
    })

})

export const {useRegisterUserQuery} = apiSlice