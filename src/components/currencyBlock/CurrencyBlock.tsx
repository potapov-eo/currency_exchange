import React, { useState } from 'react'
import style from "./CurrencyBlock.module.css";
import HeightIcon from '@material-ui/icons/Height';
import { valutePropertyType } from "../../store/app-reduser/app-reducer";
import { round } from "../../utils/HelperFunctions";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

type CurrencyBlockPropsType = { valuteProperty: valutePropertyType }

export const CurrencyBlock = (props: CurrencyBlockPropsType) => {

    const [valuteProperty, setValuteProperty] = useState(props.valuteProperty)
    let { Name, CharCode, Nominal, Value, Previous } = { ...valuteProperty }
    const [secondCharCode, setSecondCharCode] = useState("RUB")

    const ChangeValute = () => {
        const timeChartCode = valuteProperty.CharCode
        const newValuteProperty = {
            ...valuteProperty,
            CharCode: secondCharCode,
            Value: 1 / Value,
            Previous: 1 / Previous
        }
        setValuteProperty(newValuteProperty)
        setSecondCharCode(timeChartCode)
    }

    const isRUB = secondCharCode === "RUB"
    const firstValute = `${isRUB ? Nominal : 1} ${CharCode}`
    const secondValute = `${round(isRUB ? Value : Value * Nominal, 4)} ${secondCharCode}`
    const difference = round((Value - Previous) * (isRUB ? 1 : Nominal), 4)
    const isDifferenceUp = difference >= 0

    return (

        <div className={style.xxx} onClick={ChangeValute}>

            <div style={{ opacity: "0.5" }}>{Name}</div>
            <div style={{ top: "50%" }}>
                {firstValute} < HeightIcon style={{ color: "red", transform: "rotate(90deg)" }}
                                           color="primary"/> {secondValute}
            </div>
            <div>
                {isDifferenceUp ? <ArrowUpwardIcon style={{ color: "green" }}/> :
                    <ArrowDownwardIcon style={{ color: "red" }}/>}
                {difference}
            </div>
        </div>
    )
}
