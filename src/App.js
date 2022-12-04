
import { useState,useReducer } from 'react';
import './App.css';
import BasicInfoForm from './Components/form/BasicInfoForm';
import BasicInfo from './Components/CV/BasicInfo';
import Button from './Components/UI/Button';
import Card from './Components/UI/Card';
import EducationInfoForm from './Components/form/EducationInfoForm';
import EducationInfo from './Components/CV/EducationInfo';
import CvContainer from './Components/UI/CvContainer';

function reducer(state,action){
  if (action.cvIncludes === 'BasicInfo'){
    return{
      data: [action.formData],
      cvIncludes:[action.cvIncludes],
      formType:'nil'
    }
  }
  if (action.cvIncludes === 'EducationInfo'){
    return{
      data: [...state.data, action.formData],
      cvIncludes:[...state.cvIncludes, action.cvIncludes]
    }
  }
  if (action.type === 'setDisplay'){
    return{
         ...state, ...action
    }
  }
  
}

function App() {
  const [expandedState, setExpandedState] = useState(false)
  const [cvDisplay, setCvDisplay] = useState(false)
  const [showEditButtons, setShowEditButtons] = useState(false)
  const [formStates,dispatchForms] = useReducer(reducer,{formType:'init'})
  //const [basicInfo, setBasicInfo] = useState()

  console.log(formStates)
  

  const clickHandler = (data) =>{
    setExpandedState(!expandedState)
    data !== 'displayBasicInfoForm' && setCvDisplay(prevState => !prevState)
    dispatchForms({formType:data, type:'setDisplay'})
    
  }

  const showEditButtonsHandler = (data) =>{
    setShowEditButtons(!showEditButtons)
  }

  const basicFormDataHandler = (data) =>{
    dispatchForms({cvIncludes:'BasicInfo', formData:data})
    setCvDisplay(true)
    console.log(data)
    setExpandedState(false)
    //setBasicInfo(data)
  }

  const educationFormDataHandler = data =>{
    dispatchForms({cvIncludes:'EducationInfo', formData:data})
    setCvDisplay(true)
    console.log(data)
    setExpandedState(false)
    //setBasicInfo(data)
  }

  const cancelFormSubmissionHandler = (data) =>{
    dispatchForms({formType:data, type:'setDisplay'})
    setExpandedState(false)
  }

 

  
  const schoolData = formStates.data?.some(entry => entry.schoolName) && formStates.data.filter(entry => entry.schoolName)
  const basicInfoData = formStates.data?.some(entry => entry.name) && formStates.data?.filter((entry => entry.name))
  const mainButtonsDisplay = formStates.cvIncludes?.includes('BasicInfo') && formStates.formType !=='editBasicInfoForm'
  

  return (
<div className=' bg-beige h-screen flex flex-col justify-center items-center'>
  {!formStates.cvIncludes?.includes('BasicInfo') && <Button bgColor='bg-[#066D9F]' onClick={()=>clickHandler('displayBasicInfoForm')}>Create Resume</Button>}
  <div>
    {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayEducationInfoForm')} bgColor='bg-[#066D9F]'> Add Education </Button>}
    {mainButtonsDisplay && <Button onClick={showEditButtonsHandler} bgColor='bg-[#066D9F]'> Edit/Remove </Button>}
  </div>
  
  <Card className={expandedState ?'w-3/4 h-4/5 flex justify-center items-center bg-darkBlue':'w-3/4 h-1 bg-darkBlue'}>
    { expandedState && formStates.formType ==='displayBasicInfoForm' && <BasicInfoForm formName='Basic Info' cancelFormSubmission = {()=>cancelFormSubmissionHandler('init')} basicFormData={basicFormDataHandler} />}
    { expandedState && formStates.formType ==='editBasicInfoForm' && <BasicInfoForm formName='Edit Basic Info' data={basicInfoData[0]} basicFormData={basicFormDataHandler} />}
    { expandedState && formStates.formType==='displayEducationInfoForm' && <EducationInfoForm educationFormData={educationFormDataHandler}></EducationInfoForm>}
    
  </Card>
  {cvDisplay && <CvContainer>
    {<BasicInfo onClick={()=>clickHandler('editBasicInfoForm')} showButtons={showEditButtons} {...formStates.data[0]}></BasicInfo>}
    {formStates.cvIncludes.includes('EducationInfo') && <h1 className='font-serif text-beige border-b-2 text-5xl'>Education</h1>}
    {formStates.cvIncludes.includes('EducationInfo') && schoolData.map(data => (<EducationInfo {...data}></EducationInfo>))}
  </CvContainer>}
  
</div>
  );
}

export default App;
