import { createUserWithEmailAndPassword} from 'firebase/auth'
import { filterProps } from 'framer-motion'



export default function client(option,auth,email,password,customFn){

if(option === 'createuser'){

    createUserWithEmailAndPassword(auth, email, password).then(userCredential=>{
        console.log(userCredential)
        return userCredential.user
        })
        .catch((error)=>{
          if (error.message.includes('email-already-in-use')){
            //customFn('email',{type:'custom', message:'Email Already in Use'})
            return(error.message)
          }
          throw error.message
        })
    

}


}

  

