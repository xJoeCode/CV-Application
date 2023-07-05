
import AuthenticatedApp from "./AuthenticatedApp"
import UnAuthenticatedApp from "./UnAuthenticatedApp"
import { initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { useAccount } from "./Components/Context/accountContext";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {useEffect} from 'react'
import {Configuration, OpenAIApi} from 'openai'


const firebaseConfig = {
  apiKey: "AIzaSyC3fKVvQFGpFDX7VTHG426tfjcI5XifH8k",
  authDomain: "cv-application-ca7d6.firebaseapp.com",
  projectId: "cv-application-ca7d6",
  storageBucket: "cv-application-ca7d6.appspot.com",
  messagingSenderId: "109002730366",
  appId: "1:109002730366:web:a0299d165d802357a7a12f"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const configuration = new Configuration({
  apiKey: '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'
})




function App() {
  const { acc, setAcc, setDb } = useAccount()
  const auth = getAuth()
  
  useEffect(()=>{
    window.localStorage.getItem('currentUser') && setAcc(JSON.parse(window.localStorage.getItem('currentUser')))
    setDb(db)
  },[setAcc,setDb])

  return (
    <>
    <BrowserRouter>
      {acc ? <AuthenticatedApp /> : <UnAuthenticatedApp auth={auth} />}
    </BrowserRouter>
  </>
  );
}

export default App;
