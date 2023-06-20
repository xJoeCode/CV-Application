
import { useState, useCallback, useEffect } from 'react';
import { FormsProvider } from './Components/Context/formContext';
import './App.css';
import FormsContainer from './Components/UI/FormsContainer';
import CvContainer from './Components/UI/CvContainer';
import MainCv from './Components/Main/MainCv';
import MainButtons from './Components/Main/MainButtons';
import MainForms from './Components/Main/MainForms';
import CreateResumeButtons from './Components/Main/CreateResumeButtons';
import Logo from './Components/UI/Logos/Logo';
import { useAccount } from './Components/Context/accountContext';
import ResumeLoader from './Components/Main/ResumeLoader';
import { useNavigate } from "react-router-dom"





function AuthenticatedApp(props) {

  
  
  const [cvDisplay, setCvDisplay] = useState(() => JSON.parse(window.localStorage.getItem('cvDisplay')) || false)
  const [expandedState, setExpandedState] = useState(false)
  const [showEditButtons, setShowEditButtons] = useState(false)
  const [formId,setformId] = useState(0)
  const {acc, setAcc} = useAccount()
  const navigate = useNavigate()





 
    console.log('current account details',acc)





    const ExpandedStateHandler = useCallback((options) =>{
      options === 'swap' && setExpandedState(prevState => !prevState)
      options === false && setExpandedState(false)
      options === true && setExpandedState(true)
    },[])

    const CvDisplayHandler= useCallback((options) =>{
      options === 'swap' && setCvDisplay(prevState => !prevState)
      options === false && setCvDisplay(false)
      options === true && setCvDisplay(true)
    },[])

    const showEditButtonsHandler = useCallback((options) =>{
      options === false && setShowEditButtons(false)
      options === true && setShowEditButtons(true)
      options === 'swap' && setShowEditButtons(prevState => !prevState)
    },[])

    const setformIdHandler = useCallback((id) =>{
      setformId(id)
    },[])

    const signOut = () =>{
      setAcc(null)
      navigate("/CV-Application")
      window.localStorage.removeItem('currentUser')
      window.localStorage.removeItem('formStates')
      window.localStorage.removeItem('cvDisplay')
    }


  

  return (
  <FormsProvider>
    <div className='flex w-full h-auto bg-[#ebebeb] m-0 p-0 '>
        <Logo />
        <div className='flex flex-col justify-center'>
        <p>Welcome</p>
        <p>{acc.email}</p>
        <a className=' text-[#e04040] cursor-pointer' onClick={signOut} href="/">Sign Out</a>
        </div>
        
    </div>
  <div className=' bg-[#ebebeb] h-screen flex flex-col  justify-center items-center'>
  
  <ResumeLoader setCvDisplay={setCvDisplay} />
  <CreateResumeButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} />
  <MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler} />
  <FormsContainer className={expandedState ?'w-3/4 h-auto flex justify-center items-center bg-beige':'w-3/4 h-1 bg-beige'}>
    <MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />
  </FormsContainer>
  {cvDisplay && <CvContainer>
    <MainCv cvDisplay={cvDisplay} showEditButtons={showEditButtons} setformId={setformIdHandler} setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler}  setCvDisplay={CvDisplayHandler} />
  </CvContainer>}
</div>
</FormsProvider>
  );
}

export default AuthenticatedApp;
