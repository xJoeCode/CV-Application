import Button from '../UI/Button';
import {FormsProvider, useForms} from '../Context/formContext'
import { useState } from 'react';


const MainButtons = (props)=> {

    const [formStates, dispatchForms] = useForms()
    
    
    const mainButtonsDisplay = formStates.cvIncludes?.includes('BasicInfo') && formStates.formType === 'nil' 

    const clickHandler = (data) =>{
        props.setShowEditButtons(false)
        props.setExpandedState('swap')
        data !== 'displayBasicInfoForm' && props.setCvDisplayState('swap')
        dispatchForms({formType:data, type:'setDisplay'})
      }

      const showEditButtonsHandler = (e) =>{
        console.log('clicked')
        e.preventDefault()
        props.setShowEditButtons('swap')
      }
    


 return(
    <div>
        {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayEducationInfoForm')} bgColor='bg-green'> Add Education </Button>}
        {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayWorkHistoryForm')} bgColor='bg-green'> Add Work </Button>}
        {mainButtonsDisplay && <Button onClick={showEditButtonsHandler} bgColor='bg-green'> Edit/Remove </Button>}
  </div>
 )   


}


export default MainButtons