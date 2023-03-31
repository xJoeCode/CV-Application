import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateResumeButtons from '../Components/Main/CreateResumeButtons'
import MainButtons from "../Components/Main/MainButtons";
import {FormsProvider, useForms} from '../Components/Context/formContext'
import App from "../App";
import { isCompositeComponent } from "react-dom/test-utils";

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



test('CreateResumeButtons should be rendered correctly', () =>{
    render(<CreateResumeButtons/>,{wrapper:Wrapper})
    const createResumeButton = screen.getByRole('button', {
        name: /create resume/i
        })
    expect(createResumeButton).toBeInTheDocument()
})

test('showEditButtonsHandler and ExpandedStateHandlder should be called when CreateResumeButtons is clicked', async()=>{
    const showEditButtonsHandler = jest.fn()
    const ExpandedStateHandler = jest.fn()

    render(<CreateResumeButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} />,{wrapper:Wrapper})

    const createResumeButton = screen.getByRole('button', {
        name: /create resume/i
        })

    await userEvent.click(createResumeButton)
    expect(showEditButtonsHandler).toHaveBeenCalledTimes(1)
    expect(ExpandedStateHandler).toHaveBeenCalledTimes(1)
})

test ('it should display a form when CreateResumeButton component is Clicked in the App', async ()=>{

    render(<App/>)
    
    const createResumeButton = screen.getByRole('button', {
        name: /create resume/i
        })

    await userEvent.click(createResumeButton)

    const [nameInput, EmailInput, professionInput, phoneNumberInput, addressInput] = screen.getAllByRole('textbox')
    const [submitButton, cancelButton] = screen.getAllByRole('button')
    expect(nameInput).toBeInTheDocument()
    expect(EmailInput).toBeInTheDocument()
    expect(professionInput).toBeInTheDocument()
    expect(phoneNumberInput).toBeInTheDocument()
    expect(addressInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
})




test('MainButtons component should be rendered correctly with correct props',async()=>{
    const showEditButtonsHandler = jest.fn()
    const ExpandedStateHandler = jest.fn()
    const CvDisplayHandler = jest.fn()



    const testData = {formType:'nil', cvIncludes:['BasicInfo']}
    const testData2 = {formType:'displayEducationInfoForm', cvIncludes:[]}

    const {result} = renderHook(()=>useForms(),{wrapper:Wrapper})
    let [,dispatchForms] = result.current
    dispatchForms = jest.fn()



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

    await userEvent.click(addWorkButton)

    expect(showEditButtonsHandler).toHaveBeenCalledTimes(1)
    expect(ExpandedStateHandler).toHaveBeenCalledTimes(1)
    expect(dispatchForms).toHaveBeenCalledTimes(1)


    rerender(
    <FormsProvider value={[testData2,dispatchForms]}>
        <MainButtons setShowEditButtons={showEditButtonsHandler} setExpandedState={ExpandedStateHandler} setCvDisplayState={CvDisplayHandler}/> 
    </FormsProvider>
    )

    expect(addEducationButton).not.toBeInTheDocument()
    expect(addWorkButton).not.toBeInTheDocument()
    expect(editRemoveButton).not.toBeInTheDocument()
    


})




