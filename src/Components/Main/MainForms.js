import { useForms} from '../Context/formContext'
import {useAccount} from '../Context/accountContext'
import BasicInfoForm from '../form/BasicInfoForm'
import EducationInfoForm from '../form/EducationInfoForm'
import WorkInfoForm from '../form/WorkInfoForm'
import {useEffect, useState} from 'react'
import {useUpdateResumeMutation} from '../../features/api/apiSlice'
import useDbStatusState from '../../hooks/useDbStatusState'


const MainForms = (props)=> {

    const {acc} = useAccount()
    const [formStates,dispatchForms] = useForms()
    const {setDbStatus} = useDbStatusState({formStates})


    const basicFormDataHandler = (data) =>{
        dispatchForms({cvIncludes:'BasicInfo', formData:data})
        setDbStatus('mutate')
        props.setCvDisplay(true)
        props.setExpandedState(false)
      }

    const cancelFormSubmissionHandler = (data) =>{
        dispatchForms({formType:data, type:'setDisplay'})
        data !== 'init' && props.setCvDisplay(true)
        props.setExpandedState(false)
      }

      const otherFormsDataHandler =( data,id )=>{
        const dateOptions = { year:'numeric', month:'long', day:'numeric'}
        data.schoolName && (id ? dispatchForms({type:'editEducationInfo', formData:data, formId: id}) : dispatchForms({cvIncludes:'EducationInfo', formData:data}))
        data.jobTitle && (id ? dispatchForms({type:'editWorkInfo', formData:data, formId: id}) : dispatchForms({cvIncludes:'WorkInfo', formData:data}))
        setDbStatus('mutate')
        props.setCvDisplay(true)
        props.setExpandedState(false)
      }

      const basicInfoData = formStates.data?.some(entry => entry.name) && formStates.data?.filter((entry => entry.name))
      const educationDataforEdit = formStates.data?.some(entry => entry.schoolName) && formStates.data.filter(entry => entry.id === props.formId)
      const workDataforEdit = formStates.data?.some(entry => entry.jobTitle) && formStates.data.filter(entry => entry.id === props.formId)



    return(
    <>
        { props.expandedState && formStates.formType ==='displayBasicInfoForm' && <BasicInfoForm formName='Basic Info' cancelFormSubmission = {()=>cancelFormSubmissionHandler('init')} basicFormData={basicFormDataHandler} /> }
        { props.expandedState && formStates.formType ==='editBasicInfoForm' && <BasicInfoForm cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Edit Basic Info' data={basicInfoData[0]} basicFormData={basicFormDataHandler} />}
        { props.expandedState && formStates.formType ==='displayEducationInfoForm' && <EducationInfoForm cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Add Education Info' handleFormData={otherFormsDataHandler}></EducationInfoForm>}
        { props.expandedState && formStates.formType ==='editEducationInfoForm' && <EducationInfoForm id={props.formId} cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Edit Education History' data={educationDataforEdit[0]} handleFormData={otherFormsDataHandler} />}
        { props.expandedState && formStates.formType === 'displayWorkHistoryForm' && <WorkInfoForm handleFormData={otherFormsDataHandler} formName='Add Work History' cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')}></WorkInfoForm>}
        { props.expandedState && formStates.formType ==='editWorkHistoryForm' && <WorkInfoForm id={props.formId} cancelFormSubmission = {()=>cancelFormSubmissionHandler('nil')} formName='Edit Work History' data={workDataforEdit[0]} handleFormData={otherFormsDataHandler} />}
    </>
    )
}


export default MainForms










    