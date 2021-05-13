import React from 'react';
import './App.css';
import { HashRouter, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectorError, selectorStatus } from "../store/app-reduser/app-selector";
import { PATH, Routes } from "../routes/Routes";
import { ErrorSnackBar } from "../components/ErrorSnackBar/ErrorSnackBar";
import { AppBar, LinearProgress, Toolbar } from "@material-ui/core";
import style from "./App.module.css";

function App() {

    const status = useSelector(selectorStatus)
    const error = useSelector(selectorError)

    return (<HashRouter>
            <div className={style.app}>
                <AppBar position="static" className={style.bar}>
                    <Toolbar>
                        <div className={style.nav}>
                    <span>
                <NavLink className={style.NavLink} to={PATH.PAGE_CURRENCY_LIST}>CURRENCY_LIST</NavLink>
            </span>
                            <span>
                <NavLink className={style.NavLink} to={PATH.PAGE_CONVERTER}>CONVERTER</NavLink>
            </span>
                        </div>
                    </Toolbar>
                </AppBar>

                {error !== null && <ErrorSnackBar/>}
                {status === 'loading' && <LinearProgress/>}

                <Routes/>
            </div>
        </HashRouter>
    );
}

export default App;
