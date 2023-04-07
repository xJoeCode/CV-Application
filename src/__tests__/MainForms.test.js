import MainForms from "../Components/Main/MainForms";
import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent, customRender, buildFormData } from "../Utils/test-ultils";
import userEvent from "@testing-library/user-event";
import { FormsProvider, useForms } from "../Components/Context/formContext";


const Wrapper = (props) => <FormsProvider>{props.children}</FormsProvider>;

describe('MainForms Component',()=>{

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
    
       

    
        expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(name)
        expect(screen.getByRole('textbox', { name: /email/i })).toHaveValue(email)
        expect(screen.getByRole('textbox', { name: /profession/i })).toHaveValue(profession)
        expect(screen.getByRole('textbox', { name: /phone number/i })).toHaveValue(phoneNumber)
        expect(screen.getByRole('textbox', { name: /address/i })).toHaveValue(address)
        expect(screen.getByRole('textbox', { name: /social link/i })).toHaveValue(socialLink.link)
        
    
        
        
    });
    
    test('It should render EducationInfoForm component with correct inputs when required',()=>{
        const formId = jest.fn()
        const CvDisplayHandler = jest.fn();
        const expandedState = jest.fn();
        const ExpandedStateHandler = jest.fn();
    
        const testData1 = {
            formType: "displayEducationInfoForm",
            
        };
    
        const {customReRender} = customRender(
            <MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,
            { value: [testData1] }
        );
    
    
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
        expect(screen.getAllByRole('textbox').length).toBe(2)
    
        const educationInfoData = buildFormData().educationInfo();
        let {currentlyAttending, graduationEndDate, graduationStartDate, id, qualifications, schoolLocation, schoolName } = educationInfoData
    
    
    
        const testData2 = {
            formType: "editEducationInfoForm",
            data:[{...educationInfoData}]
        };
    
        const dateOptions = { year:'numeric', month:'numeric', day:'numeric'}
        const graduationStartDateComparison = new Date(graduationStartDate).toLocaleDateString('sv-SE', dateOptions)
        const graduationEndDateComparison = new Date(graduationEndDate).toLocaleDateString('sv-SE', dateOptions)
    
        customReRender(<MainForms formId={id} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,[testData2])
    
        expect(screen.getByRole('textbox', { name: /school name school location/i })).toHaveValue(schoolName)
        expect(screen.getByPlaceholderText(/e\.g singapore/i)).toHaveValue(schoolLocation)
        expect(screen.getByText(`${qualifications.value}`,{exact:true})).not.toBeNull()
        expect(screen.getByDisplayValue(graduationStartDateComparison)).not.toBeNull()
        expect(screen.getByDisplayValue(graduationEndDateComparison)).not.toBeNull()
    
    })
    
    
    test('It should render WorkInfoForm component with correct inputs when required',()=>{
        const formId = jest.fn()
        const CvDisplayHandler = jest.fn();
        const expandedState = jest.fn();
        const ExpandedStateHandler = jest.fn();
    
        const testData1 = {
            formType: "displayWorkHistoryForm",
        };
    
        const {customReRender} = customRender(
            <MainForms formId={formId} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,
            { value: [testData1] }
        );
    
        expect(screen.getByRole('heading', {
            name: /add work history/i
          })).toBeInTheDocument()
        expect(screen.getByText(/job title/i)).toBeInTheDocument();
        expect(screen.getByText(/employer/i)).toBeInTheDocument();
        expect(screen.getByText(/location/i)).toBeInTheDocument();
        expect(screen.getByText(/start date/i)).toBeInTheDocument();
        expect(screen.getByText(/end date/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /submit/i
          })).toBeInTheDocument();
        expect(
            screen.getByRole("button", {
                name: /cancel/i,
            })
        ).toBeInTheDocument();
        expect(screen.getAllByRole('textbox').length).toBe(3)
    
        const workInfoData = buildFormData().workInfo();
            const { currentlyWorking, employer, endDate, id, jobTitle, location, startDate } = workInfoData;
    
        const testData2 = {
            formType: "editWorkHistoryForm",
            data:[{...workInfoData}]
        };
    
        customReRender(<MainForms formId={id} setCvDisplay={CvDisplayHandler} expandedState={expandedState} setExpandedState={ExpandedStateHandler} />,
        [testData2])
    
        const dateOptions = { year:'numeric', month:'numeric', day:'numeric'}
        const startDateComparison = new Date(startDate).toLocaleDateString('sv-SE', dateOptions)
        const endDateComparison = new Date(endDate).toLocaleDateString('sv-SE', dateOptions)
    
        expect(screen.getByRole('textbox', { name: /job title/i })).toHaveValue(jobTitle)
        expect(screen.getByRole('textbox', { name: /employer/i })).toHaveValue(employer)
        expect(screen.getByRole('textbox', { name: /location/i })).toHaveValue(location)
        expect(screen.getByDisplayValue(startDateComparison)).not.toBeNull()
        expect(screen.getByDisplayValue(endDateComparison)).not.toBeNull()
    
        
    

    
    
    })



})

