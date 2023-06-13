
import { useState, useCallback, lazy } from 'react';
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



function AuthenticatedApp() {

  
  
  const [cvDisplay, setCvDisplay] = useState(() => JSON.parse(window.localStorage.getItem('cvDisplay')) || false)
  const [expandedState, setExpandedState] = useState(false)
  const [showEditButtons, setShowEditButtons] = useState(false)
  const [formId,setformId] = useState(0)
  const {acc} = useAccount()

 
    console.log(acc)

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


  

  return (
  <FormsProvider>
    <div className='w-full h-auto bg-[#ebebeb] m-0 p-0 '>
        <Logo />
    </div>
  <div className=' bg-[#ebebeb] h-screen flex flex-col  justify-center items-center'>
  
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
