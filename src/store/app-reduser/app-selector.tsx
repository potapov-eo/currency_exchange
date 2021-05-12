import { AppRootStateType } from "../store";
import { RequestStatusType, valuteType } from "./app-reducer";
import { createSelector } from "reselect"

export const selectorStatus = (state: AppRootStateType): RequestStatusType => state.app.status;
export const selectorError = (state: AppRootStateType): string | null => state.app.error;
export const selectorValute = (state: AppRootStateType): valuteType => state.app.valute;
export const selectorValuteArr = createSelector([selectorValute], (selectorValute) => {
        const valuteArr = []
        for (let key in selectorValute) {
            valuteArr.push(selectorValute[key])
        }
        return valuteArr
    }
);
