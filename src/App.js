
import { useState,useReducer,useRef } from 'react';
import './App.css';
import BasicInfoForm from './Components/form/BasicInfoForm';
import BasicInfo from './Components/CV/BasicInfo';
import Button from './Components/UI/Button';
import FormsContainer from './Components/UI/FormsContainer';
import EducationInfoForm from './Components/form/EducationInfoForm';
import EducationInfo from './Components/CV/EducationInfo';
import CvContainer from './Components/UI/CvContainer';
import WorkHistoryForm from './Components/form/WorkHistoryForm';
import WorkInfo from './Components/CV/WorkInfo';

function reducer(state,action){
  if (action.cvIncludes === 'BasicInfo' && state.data){
    let lastestStateData = state.data.filter(data => !data.name)
    lastestStateData.push(action.formData)
    return{
      data: [...state.data.filter(data => !data.name), action.formData],
      cvIncludes:[...state.cvIncludes, action.cvIncludes],
      formType:'nil'
    }
  }

  if (action.cvIncludes === 'BasicInfo' && !state.data){
    return{
      data: [ action.formData],
      cvIncludes:[action.cvIncludes],
      formType:'nil'
    }
  }

  if (action.cvIncludes === 'EducationInfo'){
    action.formData.id = state.data.length
    return{
      data: [...state.data, action.formData, ],
      cvIncludes:[...state.cvIncludes, action.cvIncludes]
    }
  }

  if (action.type === 'editEducationInfo'){
    const filteredData = state.data.filter(entry=> entry.id !== action.formId)
    action.formData.id = action.formId
    return{
      data: [...filteredData, action.formData, ],
      cvIncludes:[...state.cvIncludes]
    }
  }

  if (action.type === 'deleteEducationInfo'){
    const newData = state.data.filter(data => data.id !== action.formData) 
    const latestCvIncludes = newData.filter(data => data.schoolName).length === 0 ? state.cvIncludes.filter(inclusion => inclusion !== 'EducationInfo') : state.cvIncludes
    console.log(latestCvIncludes)
    return{
      data: [...newData],
      cvIncludes:[...latestCvIncludes]
    }
  }

  if (action.cvIncludes === 'WorkInfo'){
    action.formData.id = state.data.length
    console.log(action.cvIncludes)
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
  const educationId = useRef(0)
  //const [basicInfo, setBasicInfo] = useState()

  console.log(formStates)
  

  const clickHandler = (data) =>{
    setShowEditButtons(false)
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

  }

  const otherFormsDataHandler =( data,id )=>{

    const dateOptions = { year:'numeric', month:'long', day:'numeric'}
    //data.schoolName && (data.graduationStartDate = (new Date(`${data.graduationStartDate}`)).toLocaleDateString('en-GB', dateOptions)) && (data.graduationEndDate = (new Date(`${data.graduationEndDate}`)).toLocaleDateString('en-GB', dateOptions))
    data.jobTitle && (data.startDate = (new Date(`${data.startDate}`)).toLocaleDateString('en-GB', dateOptions)) && (data.endDate = (new Date(`${data.endDate}`)).toLocaleDateString('en-GB', dateOptions))
    data.schoolName && (id ? dispatchForms({type:'editEducationInfo', formData:data, formId: id}) : dispatchForms({cvIncludes:'EducationInfo', formData:data}))
    data.jobTitle && (id ? dispatchForms({type:'editWorkInfo', formData:data, formId: id}) : dispatchForms({cvIncludes:'WorkInfo', formData:data}))
    setCvDisplay(true)
    setExpandedState(false)

  }

  const cancelFormSubmissionHandler = (data) =>{
    dispatchForms({formType:data, type:'setDisplay'})
    data !== 'init' && setCvDisplay(true)
    setExpandedState(false)
  }

  const editEducationInfoHandler = (schoolId) =>{
    setExpandedState(!expandedState)
    setCvDisplay(prevState => !prevState)
    setShowEditButtons(!showEditButtons)
    dispatchForms({formType:'editEducationInfoForm', type:'setDisplay'})
    const schoolData = formStates.data?.some(entry => entry.id === schoolId) && formStates.data.filter(entry => entry.id === schoolId)
    const {id} = schoolData[0]
    educationId.current = id
  }

  const deleteEducationInfoHandler = (id) =>{
    dispatchForms({type:'deleteEducationInfo', formData:id})
    setShowEditButtons(!showEditButtons)

  }

 

  const schoolData = formStates.data?.some(entry => entry.schoolName) && formStates.data.filter(entry => entry.schoolName)
  const basicInfoData = formStates.data?.some(entry => entry.name) && formStates.data?.filter((entry => entry.name))
  const workInfoData = formStates.data?.some(entry => entry.jobTitle) && formStates.data.filter(entry => entry.jobTitle)
  const mainButtonsDisplay = formStates.cvIncludes?.includes('BasicInfo') && formStates.formType !=='editBasicInfoForm' && formStates.formType !=='displayEducationInfoForm'
  const schoolDataforEdit = formStates.data?.some(entry => entry.schoolName) && formStates.data.filter(entry => entry.id === educationId.current)
 
  

  return (
<div className=' bg-beige h-screen flex flex-col justify-center items-center'>
  {!formStates.cvIncludes?.includes('BasicInfo') && <Button bgColor='bg-[#066D9F]' onClick={()=>clickHandler('displayBasicInfoForm')}>Create Resume</Button>}
  <div>
    {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayEducationInfoForm')} bgColor='bg-[#066D9F]'> Add Education </Button>}
    {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayWorkHistoryForm')} bgColor='bg-[#066D9F]'> Add Work </Button>}
    {mainButtonsDisplay && <Button onClick={showEditButtonsHandler} bgColor='bg-[#066D9F]'> Edit/Remove </Button>}
  </div>
  
  <FormsContainer className={expandedState ?'w-3/4 h-4/5 flex justify-center items-center bg-darkBlue':'w-3/4 h-1 bg-darkBlue'}>
    { expandedState && formStates.formType ==='displayBasicInfoForm' && <BasicInfoForm formName='Basic Info' cancelFormSubmission = {()=>cancelFormSubmissionHandler('init')} basicFormData={basicFormDataHandler} />}
    { expandedState && formStates.formType ==='editBasicInfoForm' && <BasicInfoForm cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Edit Basic Info' data={basicInfoData[0]} basicFormData={basicFormDataHandler} />}
    { expandedState && formStates.formType==='displayEducationInfoForm' && <EducationInfoForm cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} educationFormData={otherFormsDataHandler}></EducationInfoForm>}
    { expandedState && formStates.formType ==='editEducationInfoForm' && <EducationInfoForm id={educationId.current} cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Edit Education Info' data={schoolDataforEdit[0]} educationFormData={otherFormsDataHandler} />}
    {expandedState && formStates.formType === 'displayWorkHistoryForm' && <WorkHistoryForm workHistoryFormData={otherFormsDataHandler} cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')}></WorkHistoryForm>}
  </FormsContainer>
  {cvDisplay && <CvContainer>
    {<BasicInfo onClick={()=>clickHandler('editBasicInfoForm')} showButtons={showEditButtons} {...basicInfoData[0]}></BasicInfo>}
    {formStates.cvIncludes.includes('EducationInfo') && <h1 className='font-serif text-beige border-b-2 text-5xl'>Education</h1>}
    {formStates.cvIncludes.includes('EducationInfo') && schoolData.map(data => (<EducationInfo key={data.id} handleDelete={deleteEducationInfoHandler} handleEdit={editEducationInfoHandler} showButtons={showEditButtons} {...data}></EducationInfo>))}
    {formStates.cvIncludes.includes('WorkInfo') && <h1 className='font-serif text-beige border-b-2 text-5xl'>Work</h1>}
    {formStates.cvIncludes.includes('WorkInfo') && workInfoData.map(data =>(<WorkInfo key={data.id} {...data} showButtons={showEditButtons}></WorkInfo>))}
  </CvContainer>}
  
</div>
  );
}

export default App;
