import style from './ErrorSnackBar.module.css'
import {useDispatch} from "react-redux";
import {setAppError} from "../../store/app-reduser/app-reducer";



type ErrorSnackBarPropsType = {
    errorMessage: string
}

export const ErrorSnackBar = (props: ErrorSnackBarPropsType) => {
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(setAppError(null))

    return (
        <div className={style.notification}>
        <div className={style.text}> {props.errorMessage} </div>
        <div className={`${style.close}`}>
            <div className={style.text} onClick={onClickHandler}>X</div>
        </div>
    </div>)
};

