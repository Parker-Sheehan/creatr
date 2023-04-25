import React, { useState } from "react";

const useForm = (condition : Function) => {
    const [input, setInput] = useState("")
    const [touched, setTouched] = useState(false)

    const isValid : boolean = condition(input)
    const hasError = !isValid && touched

    const setInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    }

    const setTouchedHandler = () => {
        setTouched(true)
    }
    const reset = () => {
        setInput("")
        setTouched(false)
    }

    return{
        input,
        touched,
        isValid,
        hasError,
        setInputHandler,
        setTouchedHandler,
        reset
    }
}

export default useForm