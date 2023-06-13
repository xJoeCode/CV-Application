import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'




export default async function client(option,auth,email,password,setError){



if(option === 'createuser'){


  try{
    const userCredential = await createUserWithEmailAndPassword(auth,email,password)
    return userCredential.user
  }

  catch(error){
    if (error.message.includes('email-already-in-use')){
      setError('email',{type:'custom', message:'Email Already in Use'})
    } else {
      throw new Error(error.message)
    }
  }
   

    
}

  if (option === "signIn"){

    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      return userCredential.user
    }

    catch(error){
      if (error.message.includes('user-not-found')){
        setError('email',{type:'custom', message:'User not Found'})
      } 

      if (error.message.includes('wrong-password')){
        setError('password',{type:'custom', message:'Wrong Password'})
      }
      
      else {
        throw new Error(error.message)
      }
      
    }
  }


}

  

