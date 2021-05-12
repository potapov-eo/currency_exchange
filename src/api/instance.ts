import axios from "axios";
import { valuteType } from "../store/app-reduser/app-reducer";

export const baseURL = "https://www.cbr-xml-daily.ru/"

export const instance = axios.create({baseURL})


export const exchangeAPI = {
    getValute() {
        return instance.get<getValuteResponseType>(`daily_json.js`,)
    }}

export type getValuteResponseType ={
    Date: string,
    PreviousDate: string,
    PreviousURL: string,
    Timestamp: string,
    Valute: valuteType
}




