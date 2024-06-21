import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../../store/root-reducer";
import { BrowserRouter } from "react-router-dom";

export function renderWithProviders(
    ui,
    {
        preLoadedState = {},
        // Automatically create a store instance if no store was passed in
        store = createStore(rootReducer, preLoadedState),
        ...renderOptions

    } = {}
){
    const Wrapper = ({children}) => {
        return(
            <Provider store={store}>
                <BrowserRouter>{children}</BrowserRouter>
            </Provider>
        )
    }
    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}