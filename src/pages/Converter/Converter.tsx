import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";
import { getValute } from "../../store/app-reduser/app-reducer";
import { ConverterBlock } from "../../components/ConverterBlock/ConverterBlock";
import { round } from "../../utils/HelperFunctions";
import style from "./Converter.module.css";
import HeightIcon from "@material-ui/icons/Height";


export const Converter = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getValute());
    }, [dispatch]);

    const valuteArr = useSelector(selectorValuteArr);
    const currentUSDDefaultValue = valuteArr.find(v => v.CharCode === "USD")?.Value;
    const [CurrencyAmount, setCurrencyAmount] = useState<number>(1);
    const [firstRatesExchange, setFirstRatesExchange] = useState<null | number>(null);
    const [secondRatesExchange, setSecondRatesExchange] = useState<null | number>(null);
    const [firstValute, setFirstValute] = useState<string>("USD");
    const [secondValute, setSecondValute] = useState<string>("USD");

    useEffect(() => {
        if (currentUSDDefaultValue) {
            setFirstRatesExchange(currentUSDDefaultValue)
            setSecondRatesExchange(currentUSDDefaultValue)
        }
    }, [valuteArr, currentUSDDefaultValue]);

    let changeValue = round((firstRatesExchange === null || secondRatesExchange === null) ?
        0 : CurrencyAmount * firstRatesExchange / secondRatesExchange, 4);

    const handleValuteChange = () => {
        setFirstRatesExchange(secondRatesExchange);
        setSecondRatesExchange(firstRatesExchange);
        setFirstValute(secondValute);
        setSecondValute(firstValute);
    }
    return (
        <div className={style.converter}>

            <ConverterBlock setRatesExchange={setFirstRatesExchange} value={CurrencyAmount} valuteArr={valuteArr}
                            valute={firstValute} setValute={setFirstValute} setCurrencyAmount={setCurrencyAmount}/>

            <div className={style.arrow_block} onClick={handleValuteChange}>
                < HeightIcon className={style.double_arrow} fontSize={"large"} color="primary"/>
            </div>

            <ConverterBlock setRatesExchange={setSecondRatesExchange} value={changeValue} valuteArr={valuteArr}
                            valute={secondValute} setValute={setSecondValute}/>
        </div>
    )
};
