import React, { useEffect } from 'react'
import style from "./PageOne.module.css";
import { CurrencyBlock } from "../../components/currencyBlock/CurrencyBlock";
import { useDispatch, useSelector } from "react-redux";
import { getValute } from "../../store/app-reduser/app-reducer";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";

export const PageOne = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getValute())
    }, [])
    const valuteArr = useSelector(selectorValuteArr)


    return (
        <div className={style.xxx}>
            {valuteArr.map(valute=><CurrencyBlock key={valute.ID} valuteProperty={valute} />)}
        </div>
    )
}
