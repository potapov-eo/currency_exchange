import React, { useEffect, useState } from "react";
import style from "./ConverterBlock.module.css";
import { MenuItem, Select, TextField } from "@material-ui/core";
import { valutePropertyType } from "../../store/app-reduser/app-reducer";


type ConverterBlockPropsType = {
    valuteArr: valutePropertyType[]
    isDisable?: boolean
    setCurrencyAmount?: (amount: number) => void
    value: number
    setRatesExchange: (exchange: number | null) => void
    setValute: (valute: string) => void
    valute: string
};
export const ConverterBlock = (props: ConverterBlockPropsType) => {
    let { valuteArr, isDisable = false, setCurrencyAmount, value, setRatesExchange, setValute, valute } = { ...props };

    const [Name, setName] = useState<string>("Доллар США");

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValute(event.target.value as string);
    };

    useEffect(() => {
        const currentProperty = valuteArr.find(v => v.CharCode === valute)
        currentProperty && setName(currentProperty.Name)
        const currentRatesExchange = currentProperty ? currentProperty.Value / currentProperty.Nominal : null
        setRatesExchange(currentRatesExchange)
    }, [valute, setRatesExchange, valuteArr])

    const handleChangeCurrencyAmount = (event: React.ChangeEvent<{ value: any }>) => {
        if (/^[0-9]+$/.test(event.target.value)) {
            setCurrencyAmount && setCurrencyAmount(event.target.value as number);
        }
    };

    return (
        <div>
            <div className={style.converter_block}>
                <div className={style.name}> {Name} </div>
                <div className={style.form}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valute}
                        onChange={handleChange}
                    >{valuteArr.map(v => <MenuItem key={v.ID} value={v.CharCode}>{v.CharCode}</MenuItem>)}
                    </Select>
                    <TextField
                        className={style.texfield}
                        disabled={isDisable}
                        id="standard-error-helper-text"
                        onChange={handleChangeCurrencyAmount}
                        value={value}
                    />

                </div>
            </div>

        </div>
    )
};
