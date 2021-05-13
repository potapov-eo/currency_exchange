import React, { useState } from "react";
import style from "./CurrencyBlock.module.css";
import HeightIcon from '@material-ui/icons/Height';
import { valutePropertyType } from "../../store/app-reduser/app-reducer";
import { round } from "../../utils/HelperFunctions";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

type CurrencyBlockPropsType = { valuteProperty: valutePropertyType };

export const CurrencyBlock =  React.memo( (props: CurrencyBlockPropsType) => {
    const [valuteProperty, setValuteProperty] = useState(props.valuteProperty);

    let { Name, CharCode, Nominal, Value, Previous } = { ...valuteProperty };

    const [secondCharCode, setSecondCharCode] = useState("RUB");
    const isRUB = secondCharCode === "RUB";
    const firstValute = `${isRUB ? Nominal : 1} ${CharCode}`;
    const secondValute = `${round(isRUB ? Value : Value * Nominal, 4)} ${secondCharCode}`;
    const difference = round((Value - Previous) * (isRUB ? 1 : Nominal), 4);
    const isDifferenceUp = difference >= 0;

    const ChangeValute = () => {
        const timeChartCode = valuteProperty.CharCode;
        const newValuteProperty = {
            ...valuteProperty,
            CharCode: secondCharCode,
            Value: 1 / Value,
            Previous: 1 / Previous
        };
        setValuteProperty(newValuteProperty);
        setSecondCharCode(timeChartCode);
    }

    return (
        <div className={style.valute_block} onClick={ChangeValute}>
            <div>
                <div className={style.name}>{Name}</div>
                <div className={style.rates} >
                    {firstValute} < HeightIcon className={style.double_arrow} color="primary"/> {secondValute}
                </div>
            </div>
            <div className={style.difference}>
                {isDifferenceUp ?
                    <ArrowUpwardIcon className={style.up_arrow}/>
                    :<ArrowDownwardIcon className={style.down_arrow}/>}
                {difference}
            </div>
        </div>
    )
});
