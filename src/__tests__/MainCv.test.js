import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainCv from "../Components/Main/MainCv";
import { FormsProvider, useForms } from "../Components/Context/formContext";
import { faker } from "@faker-js/faker";

const Wrapper = (props) => <FormsProvider>{props.children}</FormsProvider>;

const customRender = (ui, options) => {
    let Wrapper = (props) => <FormsProvider {...options}>{props.children}</FormsProvider>;

    const { rerender, container } = render(ui, { wrapper: Wrapper });

    /* apparant its not working

    const customReRender = (ui,options2) =>{

        let customWrapper = (props) => (
            <FormsProvider {...options2} >{props.children}</FormsProvider>
        )
        rerender(ui,{wrapper:customWrapper})
    }
    */

    return { rerender, container };
};

const buildFormData = () => {

    const randomNumber = () => Math.floor(Math.random() * 6) + 1

    function basicInfo() {
        return {
            name: faker.name.fullName(),
            email: faker.internet.email(),
            profession: faker.name.jobTitle(),
            phoneNumber: faker.phone.number("+65########"),
            socials_b4fdbfd: { link: `${faker.internet.url()}`, website: { label: "Website", value: "Website" } },
        };
    }

    function educationInfo() {
        const dateOptions = { year: "numeric", month: "long", day: "numeric" };

        return {
            currentlyAttending: false,
            graduationEndDate: faker.date.recent().toLocaleDateString("en-GB", dateOptions),
            graduationStartDate: faker.date.past().toLocaleDateString("en-GB", dateOptions),
            id: faker.datatype.uuid(),
            qualifications: { value: `Associate of ${faker.company.bsAdjective()}`, label: `Associate of ${faker.company.bsAdjective()}` },
            schoolLocation: faker.address.city(),
            schoolName: faker.company.name(),
        };
    }

    function workInfo() {
        const dateOptions = { year: "numeric", month: "long", day: "numeric" };

        return {
            location: faker.address.city(),
            currentlyWorking: false,
            employer: faker.name.fullName(),
            endDate: faker.date.recent().toLocaleDateString("en-GB", dateOptions),
            id: faker.datatype.uuid(),
            jobTitle: faker.name.jobTitle(),
            startDate: faker.date.past().toLocaleDateString("en-GB", dateOptions),
        };
    }
    return { basicInfo, educationInfo, workInfo, randomNumber };
};

test("MainCv Component should render basicinfo component with correct details", () => {
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
    const { name, email, profession, phoneNumber, socials_b4fdbfd: website } = basicInfoData;
    const educationData = buildFormData().educationInfo();
    const { currentlyAttending, graduationEndDate, graduationStartDate, id, qualifications, schoolLocation, schoolName } = educationData;

    let testData = {
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

    const { rerender } = customRender(
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

    testData.cvIncludes.pop();

    rerender(
        <FormsProvider value={[testData]}>
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />
        </FormsProvider>
    );

    expect(screen.queryByRole("heading", { name: /education/i })).toBeNull();
    expect(screen.queryByText(`School: ${schoolName}`, { exact: true })).toBeNull();
    expect(screen.queryByText(`Location: ${schoolLocation}`, { exact: true })).toBeNull();
    expect(screen.queryByText(`Qualifications: ${qualifications.value}`, { exact: true })).toBeNull();
    expect(screen.queryByText(`${graduationStartDate} -`, { exact: true })).toBeNull();
    expect(screen.queryByText(`${graduationEndDate}`, { exact: true })).toBeNull();

    const testData2 = {
        formType: "nil",
        cvIncludes: ["BasicInfo"],
        data: [
            {
                ...basicInfoData,
            },
        ],
    };

    const randomNumber = buildFormData().randomNumber()

    for (let i = 0; i < randomNumber; i++){
        testData2.cvIncludes.push("EducationInfo")
        testData2.data.push(buildFormData().educationInfo())
    }

    rerender(
        <FormsProvider value={[testData2]}>
            <MainCv
                cvDisplay={cvDisplay}
                showEditButtons={showEditButtons}
                setformId={setformIdHandler}
                setShowEditButtons={showEditButtonsHandler}
                setExpandedState={ExpandedStateHandler}
                setCvDisplay={CvDisplayHandler}
            />
        </FormsProvider>
    );

    expect(screen.getAllByText(/School:\s[A-Z][\w\s.,-]/).length).toBe(randomNumber)
    expect(screen.getAllByText(/Location:\s[A-Z][\w\s.,-]/).length).toBe(randomNumber)
    expect(screen.getAllByText(/Qualifications:\s[A-Z][\w\s.,-]/).length).toBe(randomNumber)
    
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

    let testData = {
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

    const {rerender} = customRender(
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

    expect(screen.getByRole("heading", {name: /work/i,})).not.toBeNull();
    expect(screen.getByRole("heading", { name: `Job Title: ${jobTitle}` }, { exact: true })).not.toBeNull();
    expect(screen.getByText(`Employer: ${employer}`, { exact: true })).not.toBeNull();
    expect(screen.getByText(`Location: ${location}`, { exact: true })).not.toBeNull();
    expect(screen.getByText(`${startDate} -`, { exact: true })).not.toBeNull();
    expect(screen.getByText(`${endDate}`, { exact: true })).not.toBeNull();

    testData.cvIncludes.pop()


    rerender(
    <FormsProvider value={[testData]}>
    <MainCv
        cvDisplay={cvDisplay}
        showEditButtons={showEditButtons}
        setformId={setformIdHandler}
        setShowEditButtons={showEditButtonsHandler}
        setExpandedState={ExpandedStateHandler}
        setCvDisplay={CvDisplayHandler}
    />
    </FormsProvider>)

    expect(screen.queryByText("heading", {name: /work/i,})).toBeNull();
    expect(screen.queryByText("heading", { name: `Job Title: ${jobTitle}` }, { exact: true })).toBeNull();
    expect(screen.queryByText(`Employer: ${employer}`, { exact: true })).toBeNull();
    expect(screen.queryByText(`Location: ${location}`, { exact: true })).toBeNull();
    expect(screen.queryByText(`${startDate} -`, { exact: true })).toBeNull();
    expect(screen.queryByText(`${endDate}`, { exact: true })).toBeNull();

    
});
