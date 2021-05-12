import React, { useEffect, useState } from 'react'
import style from "./PageOne.module.css";
import { CurrencyBlock } from "../../components/currencyBlock/CurrencyBlock";
import { useDispatch, useSelector } from "react-redux";
import { getValute, valutePropertyType } from "../../store/app-reduser/app-reducer";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export const PageOne = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getValute())
    }, [])

    const valuteArr = useSelector(selectorValuteArr)
    const [searchValute, setSearchValute] = useState<valutePropertyType[]>(valuteArr)
    useEffect(() => {
        setSearchValute(valuteArr)
    }, [valuteArr])

    const handleChange = (e: any, value: string) => {
        const selectCharCode = value.split(" ")[0]
        const selectValute = valuteArr.filter(v => v.CharCode === selectCharCode)
        setSearchValute(selectValute)

    }
    debugger
    return (
        <div className={style.xxx}>
            <div style={{ width: 500, margin: "20px" }}>
                <Autocomplete
                    freeSolo
                    onChange={handleChange}
                    id="free-solo-2-demo"
                    disableClearable
                    options={valuteArr.map((option) => {
                        return `${option.CharCode}   ${option.Name}`
                    })}
                    renderInput={(params) => (

                        <TextField
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        />

                    )}
                />
            </div>
            {searchValute.map(valute => <CurrencyBlock key={valute.ID} valuteProperty={valute}/>)}
        </div>
    )
}
