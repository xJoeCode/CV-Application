
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
import Banner from './Components/Main/Banner';
import { useAccount } from './Components/Context/accountContext';
import ResumeLoader from './Components/Main/ResumeLoader';
import { useNavigate } from "react-router-dom"





function AuthenticatedApp() {

  
  
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

    const signOut = (e) =>{
      e.preventDefault()
      setAcc(null)
      window.localStorage.removeItem('currentUser')
      window.localStorage.removeItem('formStates')
      window.localStorage.removeItem('cvDisplay')
    }



  return (
  <FormsProvider>
    <Banner acc={acc} signOut={signOut} />
  <div className=' bg-beige h-fit min-h-screen flex flex-col justify-start items-center'>
    <ResumeLoader setCvDisplay={setCvDisplay} />
    <CreateResumeButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} />
    <MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler} />
    <FormsContainer className={expandedState ?'w-11/12 h-auto flex items-center justify-center bg-[#e4e4e4] overflow-auto':'w-11/12 h-0 bg-[#e4e4e4]'}>
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
