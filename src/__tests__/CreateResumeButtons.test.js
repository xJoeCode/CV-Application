import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent } from "../Utils/test-ultils";
import userEvent from "@testing-library/user-event";
import CreateResumeButtons from '../Components/Main/CreateResumeButtons'
import {FormsProvider} from '../Components/Context/formContext'
import App from "../App";


const Wrapper = (props) => (
    <FormsProvider>{props.children}</FormsProvider>
)



describe('CrateResumeButtons Component',()=>{

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


})



