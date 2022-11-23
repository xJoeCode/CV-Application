
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
  if (action.formType === 'SubmittedBasicInfo'){
    return{
      data: [action.formData],
      formType:[state.formType, action.formType],
      cvDisplay:true

    }
  }
  if (action.formType === 'SubmittedEducationInfo'){
    return{
      data: [...state.data, action.formData],
      formType:[state.formType, action.formType],
      cvDisplay:true

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
  const [formStates,dispatchForms] = useReducer(reducer,{formType:'init'})
  //const [basicInfo, setBasicInfo] = useState()

  console.log(formStates)
  

  const clickHandler = (data) =>{
    setExpandedState(true)
    expandedState && setExpandedState(!expandedState)
    dispatchForms({formType:data, type:'setDisplay'})
  }

  const basicFormDataHandler = (data) =>{
    dispatchForms({formType:'SubmittedBasicInfo', formData:data})
    console.log(data)
    setExpandedState(false)
    //setBasicInfo(data)
  }

  const educationFormDataHandler = data =>{
    dispatchForms({formType:'SubmittedEducationInfo', formData:data})
    console.log(data)
    setExpandedState(false)
    //setBasicInfo(data)
  }

  //const schoolData = formStates?.data?.includes('schoolName') && formStates?.data.filter(info => info.includes('schoolName'))
  const schoolData = formStates.data?.some(entry => entry.schoolName) && formStates.data.filter(entry => entry.schoolName)
  console.log(schoolData)

  return (
<div className=' bg-beige h-screen flex flex-col justify-center items-center'>
  {formStates.formType === 'init' && <Button bgColor='bg-[#066D9F]' onClick={()=>clickHandler('displayBasicInfoForm')}>Create Resume</Button>}
  {formStates.cvDisplay && <Button onClick={()=>clickHandler('displayEducationInfoForm')} bgColor='bg-[#066D9F]'> Add Education </Button>}
  <Card className={expandedState ?'w-3/4 h-4/5 flex justify-center items-center bg-darkBlue':'w-3/4 h-1 bg-darkBlue'}>
    { expandedState && formStates.formType.includes('displayBasicInfoForm') && <BasicInfoForm basicFormData={basicFormDataHandler} />}
    { expandedState && formStates.formType.includes('displayEducationInfoForm') && <EducationInfoForm educationFormData={educationFormDataHandler}></EducationInfoForm>}
    
  </Card>
  {formStates.cvDisplay && <CvContainer>
    {formStates.cvDisplay && <BasicInfo {...formStates.data[0]}></BasicInfo>}
    {formStates.cvDisplay && formStates.formType.includes('SubmittedEducationInfo') && <h1 className='font-serif text-beige text-5xl'>Education</h1>}
    {/*formStates.cvDisplay && formStates.formType.includes('SubmittedEducationInfo') && <EducationInfo {...schoolData[0]}></EducationInfo>*/}
    {formStates.cvDisplay && formStates.formType.includes('SubmittedEducationInfo') && schoolData.map(data => (<EducationInfo {...data}></EducationInfo>))}
  </CvContainer>}
  
</div>
  );
}

export default App;
