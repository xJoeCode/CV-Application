import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {  setDoc, getDoc, doc } from "firebase/firestore"; 

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fakeBaseQuery(),
    keepUnusedDataFor: 30,
    endpoints: (build) => ({
        registerUser: build.query({
             async queryFn(arg) {

                console.log(arg)
                const {auth, email, password } = arg


                try{
                    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
                    return {data:userCredential.user}
                }
                catch(error){
                    throw new Error(error.message)
                }
                
            }
            
        }),
        signIn: build.query({
            async queryFn(arg){
                const {auth, email, password} = arg

                try{
                    const userCredential = await signInWithEmailAndPassword(auth,email,password)
                    return {data:userCredential}
                }
                catch(error){
                    throw new Error(error.message)
                }
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
                    throw new Error(error.message)
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
        }),

    })

})

export const {useLazyRegisterUserQuery, useLazySignInQuery, useUpdateResumeMutation, useGetResumeQuery} = apiSlice