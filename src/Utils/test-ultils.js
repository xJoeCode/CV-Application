import { FormsProvider } from '../Components/Context/formContext'
import { render } from '@testing-library/react';


const customRender = (ui, options) => {
    let Wrapper = (props) => <FormsProvider {...options}>{props.children}</FormsProvider>;

    const { rerender, container } = render(ui, { wrapper: Wrapper });

    const customReRender = (ui, options) => {
        return rerender(<FormsProvider value={options}>{ui}</FormsProvider>);
    };

    return { rerender, container, customReRender };
};

export * from '@testing-library/react'
export {customRender}