import { getAllByRole, render, screen, renderHook, act, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainCv from "./MainCv";
import { FormsProvider, useForms } from "../Context/formContext";
import { faker } from '@faker-js/faker'

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
    
    function basicInfo (){

      return {
        name: `${faker.name.fullName()}`,
        email: `${faker.internet.email()}`,
        profession: `${faker.name.jobTitle()}`,
        phoneNumber: `${faker.phone.number('+65########')}`,
        socials_b4fdbfd: { link: `${faker.internet.url()}`, website: { label: "Website", value: "Website" } },
      
        }  
    }
    return {basicInfo}
  }

test("MainCv Component should render basicinfo component with correct details", () => {
    const cvDisplay = jest.fn();
    const showEditButtons = jest.fn();
    const setformIdHandler = jest.fn();
    const showEditButtonsHandler = jest.fn();
    const ExpandedStateHandler = jest.fn();
    const CvDisplayHandler = jest.fn();
    //const {basicInfo} = buildFormData()

    const {name, email, profession, phoneNumber, socials_b4fdbfd : website} = buildFormData().basicInfo()

    console.log(name)

    const testData = {
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

    const{ container }=customRender(
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


    const[ emailQuery,professionQuery,phoneNumberQuery,,websiteQuery]= container.querySelectorAll('p')
    const nameQuery = screen.getByRole('heading')

    expect (nameQuery).toHaveTextContent(name)
    expect(emailQuery).toHaveTextContent(email)
    expect(professionQuery).toHaveTextContent(profession)
    expect(phoneNumberQuery).toHaveTextContent(phoneNumber)
    expect(websiteQuery).toHaveTextContent(website.link)


    screen.debug(websiteQuery);
});

//test('MainCV Component should render educationinfo component with correct details')
