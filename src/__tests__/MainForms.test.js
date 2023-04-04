import MainForms from "../Components/Main/MainForms";
import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent, customRender, buildFormData } from "../Utils/test-ultils";
import userEvent from "@testing-library/user-event";
import { FormsProvider, useForms } from "../Components/Context/formContext";


const Wrapper = (props) => <FormsProvider>{props.children}</FormsProvider>;

test("It should render BasicInfoForm component when required", () => {
    const formId = jest.fn();
    const CvDisplayHandler = jest.fn();
    const expandedState = jest.fn();
    const ExpandedStateHandler = jest.fn();

    const testData1 = {
        formType: "displayBasicInfoForm",
    };

    console.log(testData1)

    const { customReRender } = customRender(
        <MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,
        { value: [testData1] }
    );

    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/profession/i)).toBeInTheDocument();
    expect(screen.getByText(/profession/i)).toBeInTheDocument();
    expect(screen.getByText(/address/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(5)
    expect(
        screen.getByRole("button", {
            name: /cancel/i,
        })
    ).toBeInTheDocument();

    const basicInfoData = buildFormData().basicInfo();
    const {name, email, profession, phoneNumber, address, ...socialLink } = basicInfoData

    const testData2 = {
        formType: "editBasicInfoForm",
        data:[{...basicInfoData}]
    };

    customReRender(<MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,[testData2])

    screen.debug()
    //console.log(socialLink)

    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(name)
    expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(email)
    expect(screen.getByRole('textbox', { name: /profession/i })).toHaveValue(profession)
    expect(screen.getByRole('textbox', { name: /phone number/i })).toHaveValue(phoneNumber)
    expect(screen.getByRole('textbox', { name: /address/i })).toHaveValue(address)
    expect(screen.getByRole('textbox', { name: /social link/i })).toHaveValue(socialLink.link)
    

    
    
});

test('It should render EducationInfoForm component when required',()=>{
    const formId = jest.fn();
    const CvDisplayHandler = jest.fn();
    const expandedState = jest.fn();
    const ExpandedStateHandler = jest.fn();

    const testData1 = {
        formType: "displayEducationInfoForm",
        
    };

    customRender(
        <MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,
        { value: [testData1] }
    );

    //screen.debug();

    expect(screen.getByRole('heading', {
        name: /add education info/i
      })).toBeInTheDocument()
    expect(screen.getByText(/school name/i)).toBeInTheDocument();
    expect(screen.getByText(/school location/i)).toBeInTheDocument();
    expect(screen.getByText(/qualifications/i)).toBeInTheDocument();
    expect(screen.getByText(/graduation start date/i)).toBeInTheDocument();
    expect(screen.getByText(/graduation end date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {
        name: /submit/i
      })).toBeInTheDocument();
    expect(
        screen.getByRole("button", {
            name: /cancel/i,
        })
    ).toBeInTheDocument();
    expect(screen.getByText(/graduation end date/i)).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toBe(2)

})
