import React, { ChangeEvent, useEffect, useState } from "react";
import style from "./CurrencyList.module.css";
import { CurrencyBlock } from "../../components/currencyBlock/CurrencyBlock";
import { useDispatch, useSelector } from "react-redux";
import { getValute, valutePropertyType } from "../../store/app-reduser/app-reducer";
import { selectorValuteArr } from "../../store/app-reduser/app-selector";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

export const CurrencyList = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getValute());
    }, [dispatch]);

    const valuteArr = useSelector(selectorValuteArr);
    const [searchValute, setSearchValute] = useState<valutePropertyType[]>(valuteArr);
    useEffect(() => {
        setSearchValute(valuteArr);
    }, [valuteArr]);

    const handleChange = (e: ChangeEvent<{}>, value: string) => {
        const selectCharCode = value.split(" ")[0];
        const selectValute = valuteArr.filter(v => v.CharCode === selectCharCode);
        setSearchValute(selectValute);
    };
    const onClose = (event: any) => {
        if (event.target.value === "") {setSearchValute(valuteArr)};
            };

    return (
        <div>
            <Autocomplete className={style.input_field}
                          freeSolo
                          onInputChange={onClose}
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

            {searchValute.map(valute => <CurrencyBlock key={valute.ID} valuteProperty={valute}/>)}
        </div>
    )
};
