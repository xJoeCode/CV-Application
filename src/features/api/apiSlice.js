import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import client from '../../Utils/api-client'
import { createUserWithEmailAndPassword} from 'firebase/auth'
import { useQuery } from 'react-query'
import { collection, addDoc, setDoc, getDoc, doc } from "firebase/firestore"; 

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fakeBaseQuery(),
    tagTypes:['Register'],
    keepUnusedDataFor: 30,
    endpoints: (build) => ({
        registerUser: build.query({
             async queryFn(arg) {
                const {auth, email, password, setError, SetAcc, setUserPass} = arg

                const createUser = async() => await createUserWithEmailAndPassword(auth,email,password).then((userCredential) =>{
                    console.log(userCredential.user)
                    SetAcc(userCredential.user)
                    setUserPass(null)
                    return{data: 'okay'}
                }).catch((error) => {
                    return {error:error.message}
                    setError(error.message)
                })

                createUser()

                /*
                try {
                    const userCredential =  await createUserWithEmailAndPassword(auth,email,password)
                    console.log(userCredential)
                    return userCredential
                }
                catch(error){
                    return({error:error.message})
                }
                */
                
                //return {data:'ok'}
                
            },providesTags:['Register']
            
        }),
        signIn: build.query({
            async queryFn(arg){
                const {auth, email, password,setError} = arg

                const userCredential = await client('signIn',auth,email,password)
                console.log(userCredential)
                return {data:userCredential}
            }
        }),
        updateResume: build.mutation({
            async queryFn(arg){
                const {db,formStates,acc } = arg

                try{
                        await setDoc(doc(db,acc,acc),{
                            ...formStates
                        })
                        return {data:'ok'}
                }
                catch(error){
                    console.log(error)
                }
            }

        }),
        getResume: build.query({
            async queryFn(arg){
                const {db, collection, docId } = arg
                const resumeRef = doc(db, collection, docId)

                try{
                    const resumeSnap = await getDoc(resumeRef)
                    if (resumeSnap.exists()){
                        return {data:resumeSnap.data()}
                    } else {
                        return {data:'No such Document'}
                    }
                } catch(error){
                    throw new Error(error.message)
                }
            }
        })
    })

})

export const {useRegisterUserQuery, useSignInQuery, useUpdateResumeMutation, useGetResumeQuery} = apiSlice