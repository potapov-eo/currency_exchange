import {
    AppInitialStateType,
    appReducer,
    setAppError,
    setAppStatus, setValute, valuteType,
} from "./app-reducer";


let startState: AppInitialStateType


beforeEach(() => {
    startState = {
        status: 'succeeded',
        error: null,
        valute: {} as valuteType
    }

});

test('correct status should be added', () => {
    const action = setAppStatus("loading");

    const endState = appReducer(startState, action)

    expect(endState.status).toBe("loading");
})
test('correct error should be added', () => {
    const action = setAppError("something wrong");

    const endState = appReducer(startState, action)

    expect(endState).toEqual(
        {
            error: 'something wrong',
            status: 'succeeded',
            valute: {},
        })
})
test('correct valute should be added', () => {
    const valute = {
        "AUD": {
            "ID": "R01010",
            "NumCode": "036",
            "CharCode": "AUD",
            "Nominal": 1,
            "Name": "Австралийский доллар",
            "Value": 58.0944,
            "Previous": 57.6418
        },
        "AZN": {
            "ID": "R01020A",
            "NumCode": "944",
            "CharCode": "AZN",
            "Nominal": 1,
            "Name": "Азербайджанский манат",
            "Value": 43.6473,
            "Previous": 43.6358
        },}

    const action = setValute(valute);

    const endState = appReducer(startState, action)

    expect(endState).toEqual(
        {
            error: null,
            status: 'succeeded',
            valute:  {
                "AUD": {
                    "ID": "R01010",
                    "NumCode": "036",
                    "CharCode": "AUD",
                    "Nominal": 1,
                    "Name": "Австралийский доллар",
                    "Value": 58.0944,
                    "Previous": 57.6418
                },
                "AZN": {
                    "ID": "R01020A",
                    "NumCode": "944",
                    "CharCode": "AZN",
                    "Nominal": 1,
                    "Name": "Азербайджанский манат",
                    "Value": 43.6473,
                    "Previous": 43.6358
                },}
            ,
        })
})
