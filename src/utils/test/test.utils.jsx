import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { createStore } from "redux";
import { rootReducer } from '@/store/root-reducer';
import { theme } from '@/styles/theme';

export function renderWithProviders(
    ui,
    {
        preLoadedState = {},
        store = createStore(rootReducer, preLoadedState),
        ...renderOptions

    } = {}
){
    const Wrapper = ({children}) => {
        return(
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}