import { FormsProvider } from '../Components/Context/formContext'
import { render } from '@testing-library/react';
import { faker } from '@faker-js/faker';


const customRender = (ui, options) => {
    let Wrapper = (props) => <FormsProvider {...options}>{props.children}</FormsProvider>;

    const { rerender, container } = render(ui, { wrapper: Wrapper });

    const customReRender = (ui, options) => {
        return rerender(<FormsProvider value={options}>{ui}</FormsProvider>);
    };

    return { rerender, container, customReRender };
};

const buildFormData = () => {
    const randomNumber = () => Math.floor(Math.random() * 6) + 1;

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

export * from '@testing-library/react'
export {customRender, buildFormData}