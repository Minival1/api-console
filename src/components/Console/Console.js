import React, {useEffect, useState} from 'react';

import "./Console.css";
import {useFormik} from "formik";
import * as Yup from "yup";
import Sendsay from "sendsay-api";
import {addToHistory, clearExecuteRequest} from "../../slices/historySlice";
import Button from "../Button/Button";
import {useDispatch, useSelector} from "react-redux";
import classNames from "classnames";
import {ReactComponent as FormatterIcon} from "../../images/formatter.svg";
import {ReactComponent as DragIcon} from "../../images/dots.svg";

const Console = () => {
    const [response, setResponse] = useState({
        result: "",
        error: false
    })

    const executingRequest = useSelector(state => state.history.executingRequest)

    const [width, setWidth] = useState({
        requestField: "100%",
        responseField: "100%"
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (executingRequest !== null) {
            const jsonStr = JSON.parse(executingRequest)
            formik.setFieldValue("request", jsonStr, true)

            setTimeout(formik.submitForm)
            dispatch(clearExecuteRequest())
        }
    }, [executingRequest])

    const move = (e) => {
        console.log(e.pageX)
    }

    const formik = useFormik({
        initialValues: {
            request: ""
        },
        validationSchema: Yup.object({
            request: Yup.string().test(
                "json",
                "error",
                (value) => {
                    try {
                        JSON.parse(value)
                    } catch (e) {
                        return false
                    }
                    return true
                }
            )
        }),
        onSubmit: (data) => {
            const session = sessionStorage.getItem("sendsay")

            const sendsay = new Sendsay()
            if (session) {
                sendsay.setSession(session)
            }
            sendsay.request(JSON.parse(data.request))
                .then(res => {
                    const strRes = JSON.stringify(res, null, 2)
                    setResponse({
                        result: strRes,
                        error: false
                    })
                    dispatch(addToHistory({
                        request: JSON.stringify(data.request, null, 2),
                        actionName: JSON.parse(data.request)["action"],
                        status: "success"
                    }))
                })
                .catch(e => {
                    setResponse({
                        error: true
                    })
                    dispatch(addToHistory({
                        request: JSON.stringify(data.request, null, 2),
                        actionName: JSON.parse(data.request)["action"],
                        status: "failed"
                    }))
                })
        },
        validateOnChange: false,
        validateOnBlur: false
    })

    const formatHandler = () => {
        const reqStr = formik.values.request
        try {
            const json = JSON.parse(reqStr)
            const formatted = JSON.stringify(json, null, 2)
            formik.setFieldValue("request", formatted, false)
        } catch (e) {}
    }

    return (
        <form className="console" onSubmit={formik.handleSubmit}>
            <div className="console__body">
                <div style={{width: width.requestField}} className={classNames("console__item", "console__item_request", {
                    "console__error": formik.errors.request
                })}>
                    <p className="console__name">Запрос:</p>
                    <textarea name="request" value={formik.values.request} onChange={formik.handleChange} />
                </div>
                <div className="console__drag" onMouseDown={move}>
                    <DragIcon/>
                </div>
                <div style={{width: width.responseField}} className={classNames("console__item", "console__item_result", {
                    "console__error": response.error
                })}>
                    <p className="console__name">Ответ:</p>
                    <textarea readOnly={true} value={response.result} />
                </div>
            </div>
            <div className="console__footer">
                <Button className="console__footer-btn" type="submit">Отправить</Button>
                <p className="console__footer-link">@link-to-your-github</p>
                <button type="button" className="console__footer-format" onClick={formatHandler}>
                    <FormatterIcon/>
                    <span>Форматировать</span>
                </button>
            </div>
        </form>
    );
};

export default Console;
