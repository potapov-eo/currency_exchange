import React from 'react'


export type BooleanFormPropsType = {
    question?: string
    push: (isDel: boolean) => void
}

export const BooleanForm = React.memo(({question, push}: BooleanFormPropsType) => {

    const addItemTitle = (value: boolean) => {
        push(value)
    }

    return (
        <div>
            <div>{question}</div>

            <button type="submit" onClick={() => addItemTitle(true)} name={"YES"}/>
            <button type="submit" onClick={() => addItemTitle(false)} name={"NO"}/>
        </div>

    )
})