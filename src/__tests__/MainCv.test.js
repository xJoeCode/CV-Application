import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent, customRender, buildFormData } from "../Utils/test-ultils";
import userEvent from "@testing-library/user-event";
import MainCv from "../Components/Main/MainCv";
import { FormsProvider, useForms } from "../Components/Context/formContext";
import { faker } from "@faker-js/faker";

const Wrapper = (props) => <FormsProvider>{props.children}</FormsProvider>;


describe('MainCv Component',()=>{

    test("MainCv Component should render basicinfo component when required with correct details", () => {
        const cvDisplay = jest.fn();
        const showEditButtons = jest.fn();
        const setformIdHandler = jest.fn();
        const showEditButtonsHandler = jest.fn();
        const ExpandedStateHandler = jest.fn();
        const CvDisplayHandler = jest.fn();
        //const {basicInfo} = buildFormData()
    
        const { name, email, profession, phoneNumber, socials_b4fdbfd: website } = buildFormData().basicInfo();
    
        let testData = {
            formType: "nil",
            cvIncludes: ["BasicInfo"],
            data: [
                {
                    name: name,
                    email: email,
                    profession: profession,
                    phoneNumber: phoneNumber,
                    socials_b4fdbfd: website,
                },
                {
                    currentlyAttending: false,
                    graduationEndDate: "24 March 2023",
                    graduationStartDate: "3 March 2023",
                    id: "5ec8a1ee-5f20-24ca-30f3-a32f49b43847",
                    qualifications: { value: "Associate of Science", label: "Associate of Science" },
                    schoolLocation: "asdaad",
                    schoolName: "asdadadad",
                },
            ],
        };
    
        const { container } = customRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            { value: [testData] }
        );
    
        const [emailQuery, professionQuery, phoneNumberQuery, , websiteQuery] = container.querySelectorAll("p");
        const nameQuery = screen.getByRole("heading");
    
        expect(nameQuery).toHaveTextContent(name);
        expect(emailQuery).toHaveTextContent(email);
        expect(professionQuery).toHaveTextContent(profession);
        expect(phoneNumberQuery).toHaveTextContent(phoneNumber);
        expect(websiteQuery).toHaveTextContent(website.link);
    });
    
    test("MainCV Component should render educationinfo component when required with correct details", () => {
        const cvDisplay = jest.fn();
        const showEditButtons = jest.fn();
        const setformIdHandler = jest.fn();
        const showEditButtonsHandler = jest.fn();
        const ExpandedStateHandler = jest.fn();
        const CvDisplayHandler = jest.fn();
    
        const basicInfoData = buildFormData().basicInfo();
        const educationData = buildFormData().educationInfo();
        const { currentlyAttending, graduationEndDate, graduationStartDate, id, qualifications, schoolLocation, schoolName } = educationData;
    
        const testData = {
            formType: "nil",
            cvIncludes: ["BasicInfo", "EducationInfo"],
            data: [
                {
                    ...basicInfoData,
                },
                {
                    ...educationData,
                },
            ],
        };
    
        const { customReRender } = customRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            { value: [testData] }
        );
    
        expect(screen.getByRole("heading", { name: /education/i })).not.toBeNull();
        expect(screen.getByText(`School: ${schoolName}`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`Location: ${schoolLocation}`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`Qualifications: ${qualifications.value}`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`${graduationStartDate} -`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`${graduationEndDate}`, { exact: true })).not.toBeNull();
    
        const testData2 = {
            formType: "nil",
            cvIncludes: ["BasicInfo"],
            data: [
                {
                    ...basicInfoData,
                },
                {
                    ...educationData,
                },
            ],
        };
    
        customReRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            [testData2]
        );
    
    
        expect(screen.queryByRole("heading", { name: /education/i })).toBeNull();
        expect(screen.queryByText(`School: ${schoolName}`, { exact: true })).toBeNull();
        expect(screen.queryByText(`Location: ${schoolLocation}`, { exact: true })).toBeNull();
        expect(screen.queryByText(`Qualifications: ${qualifications.value}`, { exact: true })).toBeNull();
        expect(screen.queryByText(`${graduationStartDate} -`, { exact: true })).toBeNull();
        expect(screen.queryByText(`${graduationEndDate}`, { exact: true })).toBeNull();
    
        const testData3 = {
            formType: "nil",
            cvIncludes: ["BasicInfo"],
            data: [
                {
                    ...basicInfoData,
                },
            ],
        };
    
        const randomNumber = buildFormData().randomNumber();
    
        for (let i = 0; i < randomNumber; i++) {
            testData3.cvIncludes.push("EducationInfo");
            testData3.data.push(buildFormData().educationInfo());
        }
    
        customReRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            [testData3]
        );
        screen.debug()
    
        expect(screen.getAllByText(/School:\s[A-Z][\w\s.',-]/,{exact:true}).length).toBe(randomNumber);
        expect(screen.getAllByText(/Location:\s[A-Z][\w\s.',-]/,{exact:true}).length).toBe(randomNumber);
        expect(screen.getAllByText(/Qualifications:\s[A-Z][\w\s.',-]/,{exact:true}).length).toBe(randomNumber);
    });
    
    test("MainCV Component should render Workinfo component when required with correct details", () => {
        const cvDisplay = jest.fn();
        const showEditButtons = jest.fn();
        const setformIdHandler = jest.fn();
        const showEditButtonsHandler = jest.fn();
        const ExpandedStateHandler = jest.fn();
        const CvDisplayHandler = jest.fn();
    
        const basicInfoData = buildFormData().basicInfo();
        const workInfoData = buildFormData().workInfo();
        const { currentlyWorking, employer, endDate, id, jobTitle, location, startDate } = workInfoData;
    
        const testData1 = {
            formType: "nil",
            cvIncludes: ["BasicInfo", "WorkInfo"],
            data: [
                {
                    ...basicInfoData,
                },
                {
                    ...workInfoData,
                },
            ],
        };
    
        const { customReRender } = customRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            { value: [testData1] }
        );
    
        expect(screen.getByRole("heading", { name: /work/i })).not.toBeNull();
        expect(screen.getByRole("heading", { name: `Job Title: ${jobTitle}` }, { exact: true })).not.toBeNull();
        expect(screen.getByText(`Employer: ${employer}`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`Location: ${location}`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`${startDate} -`, { exact: true })).not.toBeNull();
        expect(screen.getByText(`${endDate}`, { exact: true })).not.toBeNull();
    
        const testData2 = {
            formType: "nil",
            cvIncludes: ["BasicInfo"],
            data: [
                {
                    ...basicInfoData,
                },
                {
                    ...workInfoData,
                },
            ],
        };
    
        customReRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            [testData2]
        );
    
        expect(screen.queryByText("heading", { name: /work/i })).toBeNull();
        expect(screen.queryByText("heading", { name: `Job Title: ${jobTitle}` }, { exact: true })).toBeNull();
        expect(screen.queryByText(`Employer: ${employer}`, { exact: true })).toBeNull();
        expect(screen.queryByText(`Location: ${location}`, { exact: true })).toBeNull();
        expect(screen.queryByText(`${startDate} -`, { exact: true })).toBeNull();
        expect(screen.queryByText(`${endDate}`, { exact: true })).toBeNull();
    
        let testData3 = {
            formType: "nil",
            cvIncludes: ["BasicInfo"],
            data: [
                {
                    ...basicInfoData,
                },
            ],
        };
    
        const randomNumber = buildFormData().randomNumber();
    
        for (let i = 0; i < randomNumber; i++) {
            testData3.cvIncludes.push("WorkInfo");
            testData3.data.push(buildFormData().workInfo());
        }
    
        customReRender(
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />,
            [testData3]
        );
    
        expect(screen.getAllByText(/Job Title:\s[A-Z][\w\s.',-]/,{exact:true}).length).toBe(randomNumber);
        expect(screen.getAllByText(/Employer:\s[A-Z][\w\s.',-]/).length).toBe(randomNumber);
        expect(screen.getAllByText(/Location:\s[A-Z][\w\s.',-]/).length).toBe(randomNumber);
    
    });



})



