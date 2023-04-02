import { useContext, useReducer, createContext, useMemo } from "react"
import uuid from 'react-uuid';

const FormsContext = createContext()





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
    action.formData.id = uuid()
    return{
      data: [...state.data, action.formData, ],
      cvIncludes:[...state.cvIncludes, action.cvIncludes],
      formType:'nil'
    }
  }

  if (action.type === 'editEducationInfo'){
    const filteredData = state.data.filter(entry=> entry.id !== action.formId)
    action.formData.id = action.formId
    console.log(action.formData)
    return{
      data: [...filteredData, action.formData, ],
      cvIncludes:[...state.cvIncludes],
      formType:'nil'
    }
  }

  if (action.type === 'deleteEducationInfo'){
    const newData = state.data.filter(data => data.id !== action.formData) 
    const latestCvIncludes = newData.filter(data => data.schoolName).length === 0 ? state.cvIncludes.filter(inclusion => inclusion !== 'EducationInfo') : state.cvIncludes
    console.log(latestCvIncludes)
    return{
      data: [...newData],
      cvIncludes:[...latestCvIncludes],
      formType:'nil'
    }
  }

  if (action.cvIncludes === 'WorkInfo'){
    action.formData.id = uuid()
    console.log(action.cvIncludes)
    return{
      data: [...state.data, action.formData],
      cvIncludes:[...state.cvIncludes, action.cvIncludes],
      formType:'nil'
    }
  }

  if (action.type === 'editWorkInfo'){
    const filteredData = state.data.filter(entry=> entry.id !== action.formId)
    action.formData.id = action.formId
    return{
      data: [...filteredData, action.formData, ],
      cvIncludes:[...state.cvIncludes],
      formType:'nil'
    }
  }

  if (action.type === 'deleteWorkInfo'){
    const newData = state.data.filter(data => data.id !== action.formData) 
    const latestCvIncludes = newData.filter(data => data.jobTitle).length === 0 ? state.cvIncludes.filter(inclusion => inclusion !== 'WorkInfo') : state.cvIncludes
    //console.log(latestCvIncludes)
    return{
      data: [...newData],
      cvIncludes:[...latestCvIncludes],
      formType:'nil'
    }
  }


  if (action.type === 'setDisplay'){
    return{
         ...state, ...action
    }
  }

  throw new Error(`Unhandled action type ${action.type}`)
}

function FormsProvider (props) {
  const initState = () => JSON.parse(window.localStorage.getItem('formStates')) || {formType:'init'}
  const [formStates,dispatchForms] = useReducer(reducer,initState())
  const value = useMemo(()=>[formStates, dispatchForms],[formStates,dispatchForms])
  return(<FormsContext.Provider value={props.value? props.value : value}>{props.children}</FormsContext.Provider>)
}



const useForms = () =>{
  const context = useContext(FormsContext)
  if (context === undefined) {
    throw new Error ('useForms must be used within FormsProvider')
  }
  return context
}




export {FormsProvider, useForms}
