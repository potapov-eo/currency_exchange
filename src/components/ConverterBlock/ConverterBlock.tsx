import React from 'react'
import style from "./ConverterBlock.module.css";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { valutePropertyType } from "../../store/app-reduser/app-reducer";


type ConverterBlockPropsType = {
    valuteArr: valutePropertyType[]
    isDisable?: boolean
    setCurrencyAmount?: (amount: number) => void
    value: number
    setRatesExchange: (exchange: number | null) => void
}
export const ConverterBlock = (props: ConverterBlockPropsType) => {
    let { valuteArr, isDisable = false, setCurrencyAmount, value, setRatesExchange } = { ...props }

    const [valute, setValute] = React.useState(''); //
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValute(event.target.value as string);
        const currentProperty = valuteArr.find(v => v.CharCode === event.target.value)
        const currentRatesExchange = currentProperty ? currentProperty.Value / currentProperty.Nominal : null
        setRatesExchange(currentRatesExchange)
    };

    const handleChangeCurrencyAmount = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCurrencyAmount && setCurrencyAmount(event.target.value as number);


    };


    return (
        <div>
            <div className={style.xxx}>
                Австралийский доллар
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Select valute</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valute}
                        onChange={handleChange}
                    >{valuteArr.map(v => <MenuItem value={v.CharCode}>{v.CharCode}</MenuItem>)}
                    </Select>
                    <TextField
                        disabled={isDisable}
                        id="standard-error-helper-text"
                        defaultValue="1"
                        onChange={handleChangeCurrencyAmount}
                        value={value}
                    />
                </FormControl>
            </div>

        </div>
    )
}
