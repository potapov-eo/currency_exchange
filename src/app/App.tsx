import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import {useSelector} from "react-redux";
import {selectorError, selectorStatus} from "../store/app-reduser/app-selector";
import {Routes} from "../routes/Routes";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import Preloader from "../components/Preloder/Preloader";


function App() {

    const status = useSelector(selectorStatus)
    const error = useSelector(selectorError)


    return (<Router>
            <div className="App">
                {error !== null && <ErrorSnackBar errorMessage={error}/>}
                {status === 'loading' && <Preloader/>}
                <Routes/>
            </div>
        </Router>
    );
}

export default App;
