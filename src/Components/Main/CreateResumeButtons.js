
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
        <div className='mt-8 w-screen'>
        {!formStates.cvIncludes?.includes('BasicInfo') && <Button bgColor='bg-brightBlue' onClick={()=>clickHandler('displayBasicInfoForm')}>Create Resume</Button>}
        </div>
    )
}





export default CreateResumeButtons



