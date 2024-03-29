import Button from '../UI/Button';
import { useForms} from '../Context/formContext'
import { useEffect } from 'react';
import {  memo } from 'react';


function MainButtons(props) {

    useEffect(()=>{
      console.log('formStates',formStates)
    })

    const [formStates, dispatchForms] = useForms()


    
    
    const mainButtonsDisplay = formStates.cvIncludes?.includes('BasicInfo') && formStates.formType === 'nil' 

    const clickHandler = (data) =>{
        props.setShowEditButtons(false)
        props.setExpandedState('swap')
        data !== 'displayBasicInfoForm' && props.setCvDisplayState('swap')
        dispatchForms({formType:data, type:'setDisplay'})
      }

      const showEditButtonsHandler = (e) =>{
        e.preventDefault()
        props.setShowEditButtons('swap')
      }
    


 return(
    <div className='flex flex-wrap justify-center '>
        {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayEducationInfoForm')} bgColor='bg-brightBlue'> Add Education </Button>}
        {mainButtonsDisplay && <Button onClick={()=>clickHandler('displayWorkHistoryForm')} bgColor='bg-brightBlue'> Add Work </Button>}
        {mainButtonsDisplay && <Button onClick={showEditButtonsHandler} bgColor='bg-brightBlue'> Edit/Remove </Button>}
  </div>
 )   
}

MainButtons = memo(MainButtons)


export default MainButtons