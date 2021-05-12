import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";
import { getValute } from "../../store/app-reduser/app-reducer";
import { ConverterBlock } from "../../components/ConverterBlock/ConverterBlock";
import { round } from "../../utils/HelperFunctions";


export const PageTwo = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getValute())
    }, [])
    const valuteArr = useSelector(selectorValuteArr)
    const [CurrencyAmount , setCurrencyAmount] = useState<number>(1); //
    const [ firstRatesExchange , setFirstRatesExchange] = useState<null|number>(1); //
    const [ secondRatesExchange , setSecondRatesExchange] = useState<null|number>(1);

    let changeValue =  round((firstRatesExchange!==null&&secondRatesExchange!==null)? CurrencyAmount * firstRatesExchange/secondRatesExchange:0,4)

    return (
        <div>
            <ConverterBlock setRatesExchange={setFirstRatesExchange} value={CurrencyAmount} setCurrencyAmount={setCurrencyAmount} valuteArr={valuteArr} />
            <ConverterBlock setRatesExchange={setSecondRatesExchange} value={changeValue}  valuteArr={valuteArr} />
        </div>
    )
}
