import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { exchangeAPI, getValuteResponseType } from "../../api/instance";

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    valute: {} as valuteType,
};

export const appReducer = (state: AppInitialStateType = initialState, action: ActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status };
        case 'APP/SET_ERROR':
            return { ...state, error: action.error };
        case 'APP/VALUTE':
            return { ...state, valute: action.valute };

        default:
            return state;
    };
};

export const setAppStatus = (status: RequestStatusType) =>
    ({ type: 'APP/SET_STATUS', status } as const);
export const setAppError = (error: string | null) =>
    ({ type: 'APP/SET_ERROR', error } as const);
export const setValute = (valute: valuteType) =>
    ({ type: 'APP/VALUTE', valute } as const);

export const getValute = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res: AxiosResponse<getValuteResponseType> = await exchangeAPI.getValute();
        dispatch(setAppStatus('succeeded'));
        dispatch(setValute(res.data.Valute));
    } catch (e) {
        dispatch(setAppStatus('succeeded'));
        dispatch(setAppError("Ошибка загрузки. Повторите запрос позднее"));
    };
};


export type RequestStatusType = 'succeeded' | 'loading';

export type AppInitialStateType = typeof initialState;

type ActionsType =
    ReturnType<typeof setAppStatus> |
    ReturnType<typeof setAppError> |
    ReturnType<typeof setValute>;

export type valutePropertyType = {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number
};

export type valuteType = {
    [name: string]: valutePropertyType
};

