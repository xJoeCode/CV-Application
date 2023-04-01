import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainButtons from "./MainButtons";
import {FormsProvider, useForms} from '../Context/formContext'



const Wrapper = (props) => (
    <FormsProvider>{props.children}</FormsProvider>
)


const customRender = (ui,options) =>{

    let Wrapper = (props) => (
        <FormsProvider {...options}>{props.children}</FormsProvider>
    )

    const {rerender} =  render(ui,{wrapper:Wrapper})

    /* apparant its not working

    const customReRender = (ui,options2) =>{

        let customWrapper = (props) => (
            <FormsProvider {...options2} >{props.children}</FormsProvider>
        )
        rerender(ui,{wrapper:customWrapper})
    }
    */
   
    return {rerender}
}

const {result} = renderHook(()=>useForms(),{wrapper:Wrapper})
let [,dispatchForms] = result.current
dispatchForms = jest.fn()

describe('MainButtons component',()=>{

    test('MainButtons component should be rendered when basic info form has been submitted',async()=>{
        const showEditButtonsHandler = jest.fn()
        const ExpandedStateHandler = jest.fn()
        const CvDisplayHandler = jest.fn()
    
        const testData = {formType:'nil', cvIncludes:['BasicInfo']}
        const testData2 = {formType:'displayEducationInfoForm', cvIncludes:[]}
    
    
        const {rerender} = customRender(<MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler}/>, {value:[testData,dispatchForms]})
    
    
        const addEducationButton = screen.getByRole('button', {
            name: /add education/i
          })
    
        const addWorkButton = screen.getByRole('button', {
            name: /add work/i
          })
    
        const editRemoveButton = screen.getByRole('button', {
            name: /edit\/remove/i
          })
    
        expect(addEducationButton).toBeInTheDocument()
        expect(addWorkButton).toBeInTheDocument()
        expect(editRemoveButton).toBeInTheDocument()
    
        rerender(
        <FormsProvider value={[testData2,dispatchForms]}>
            <MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler}/> 
        </FormsProvider>
        )
    
        expect(addEducationButton).not.toBeInTheDocument()
        expect(addWorkButton).not.toBeInTheDocument()
        expect(editRemoveButton).not.toBeInTheDocument()
        
    })
    
    
    
    
    test('MainButtons buttons should call the respective handlers when clicked',async()=>{
    
        const showEditButtonsHandler = jest.fn()
        const ExpandedStateHandler = jest.fn()
        const CvDisplayHandler = jest.fn()
        const testData = {formType:'nil', cvIncludes:['BasicInfo']}
    
        customRender(<MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler}/>, {value:[testData,dispatchForms]})
    
        const addEducationButton = screen.getByRole('button', {
            name: /add education/i
          })
    
        const addWorkButton = screen.getByRole('button', {
            name: /add work/i
          })
    
        const editRemoveButton = screen.getByRole('button', {
            name: /edit\/remove/i
          })
    
        await userEvent.click(addEducationButton)
    
        expect(showEditButtonsHandler).toHaveBeenCalledTimes(1)
        expect(ExpandedStateHandler).toHaveBeenCalledTimes(1)
        expect(dispatchForms).toHaveBeenCalledTimes(1)
    
        await userEvent.click(addWorkButton)
    
        expect(showEditButtonsHandler).toHaveBeenCalledTimes(2)
        expect(ExpandedStateHandler).toHaveBeenCalledTimes(2)
        expect(dispatchForms).toHaveBeenCalledTimes(2)
    
        await userEvent.click(editRemoveButton)
    
        expect(showEditButtonsHandler).toHaveBeenCalledTimes(3)
    
    
    
    
    })




})






