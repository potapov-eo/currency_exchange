import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

export type AddItemPropsType = {
    addItem: (title: string) => void
    buttonName: string
}

export const AddItemForm = React.memo(({addItem, buttonName}: AddItemPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(true)
    const addItemTitle = () => {
        if (title === "") {
            setError(true)

        } else {
            addItem(title);
            setTitle("")
            setError(true)
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItemTitle()
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            {error && <div>Введите текст</div>}
            <button type="submit" disabled={error} onClick={addItemTitle} name={buttonName}/>
        </div>

    )
})