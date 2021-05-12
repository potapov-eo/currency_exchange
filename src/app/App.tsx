import React from 'react';
import './App.css';
import { HashRouter, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectorError, selectorStatus } from "../store/app-reduser/app-selector";
import { PATH, Routes } from "../routes/Routes";
import { ErrorSnackBar } from "../components/ErrorSnackBar/ErrorSnackBar";
import { AppBar, LinearProgress, Toolbar } from "@material-ui/core";

function App() {

    const status = useSelector(selectorStatus)
    const error = useSelector(selectorError)

    return (<HashRouter>
            <div className="App">
                <AppBar color="secondary" position="static">
                    <Toolbar>
                    <span>
                <NavLink to={PATH.PAGE_CURRENCY_LIST}>CURRENCY_LIST</NavLink>
            </span>
                        <span>
                <NavLink to={PATH.PAGE_CONVERTER}>CONVERTER</NavLink>
            </span>
                    </Toolbar>
                </AppBar>

                {error !== null && <ErrorSnackBar/>}
                {status === 'loading' && <LinearProgress color="primary"
                                                         style={{ top: "-3px" }}/>}
                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
