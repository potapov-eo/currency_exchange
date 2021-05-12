import React from "react"
import { Redirect, Route, Switch } from "react-router-dom";
import { Converter } from "../pages/Converter/Converter";
import { CurrencyList } from "../pages/CurrencyList/CurrencyList";

export const PATH = {
    PAGE_CURRENCY_LIST: "/currencylist",
    PAGE_CONVERTER: "/converter",
};

export const Routes = () => {

    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.PAGE_CURRENCY_LIST}/>}/>
                <Route path={PATH.PAGE_CURRENCY_LIST} render={() => <CurrencyList/>}/>
                <Route path={PATH.PAGE_CONVERTER} render={() => <Converter/>}/>
            </Switch>
        </div>
    )
};
