import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";
import { getValute } from "../../store/app-reduser/app-reducer";
import { ConverterBlock } from "../../components/ConverterBlock/ConverterBlock";
import { round } from "../../utils/HelperFunctions";


export const Converter = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getValute());
    }, [dispatch]);

    const valuteArr = useSelector(selectorValuteArr);
    const currentUSDDefaultValue = valuteArr.find(v => v.CharCode === "USD")?.Value;
    const [CurrencyAmount , setCurrencyAmount] = useState<number>(1);
    const [ firstRatesExchange , setFirstRatesExchange] = useState<null|number>(null);
    const [ secondRatesExchange , setSecondRatesExchange] = useState<null|number>(null);
    const [firstValute, setFirstValute] = useState<string>("USD");
    const [secondValute, setSecondValute] = useState<string>("USD");

    useEffect(() => {
       if(currentUSDDefaultValue) {
           setFirstRatesExchange(currentUSDDefaultValue)
           setSecondRatesExchange(currentUSDDefaultValue)
       }
    }, [valuteArr,currentUSDDefaultValue]);

    let changeValue =  round((firstRatesExchange===null || secondRatesExchange===null)?
        0: CurrencyAmount * firstRatesExchange/secondRatesExchange,4);

    const handleValuteChange = () =>{
        setFirstRatesExchange(secondRatesExchange);
        setSecondRatesExchange(firstRatesExchange);
        setFirstValute(secondValute);
        setSecondValute(firstValute);
    }
    return (
        <div>
            <ConverterBlock setRatesExchange={setFirstRatesExchange} value={CurrencyAmount}  valuteArr={valuteArr}
                           valute={firstValute} setValute={setFirstValute} setCurrencyAmount={setCurrencyAmount}/>
            <div onClick={handleValuteChange} style={{width:"50px", height:"50px", background:"pink", borderRadius:"25px"}}>x</div>
            <ConverterBlock setRatesExchange={setSecondRatesExchange} value={changeValue}  valuteArr={valuteArr}
                            valute={secondValute} setValute={setSecondValute} />
        </div>
    )
};
