
import {FormsProvider, useForms} from '../Context/formContext'
import Button from '../UI/Button'

const CreateResumeButtons = (props) =>{

    const [formStates, dispatchForms] = useForms()

    const clickHandler = (data) =>{
        props.setShowEditButtons(false)
        props.setExpandedState('swap')
        //data !== 'displayBasicInfoForm' && props.setCvDisplayState('swap')
        dispatchForms({formType:data, type:'setDisplay'})
      }


    return(
        <>
        {!formStates.cvIncludes?.includes('BasicInfo') && <Button bgColor='bg-green' onClick={()=>clickHandler('displayBasicInfoForm')}>Create Resume</Button>}
        </>
    )
}





export default CreateResumeButtons



