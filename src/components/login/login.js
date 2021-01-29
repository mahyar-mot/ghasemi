import React from 'react';
import {store} from "../../context/store";
import {SET_USER_ROLE, USER_LOGGED_IN, USER_LOGGED_OUT} from "../../context/actionType";
import {fetcher} from "../../utils/common";
import { error } from "../../utils/message";
import {LOGIN_PATH, USER_ROLE} from "../../utils/constants";
import {Form, Input, Button} from "antd";


export default function Login(props) {

    const {isLoggedIn, dispatch} = React.useContext(store)

    const formSubmit = (payload) => {
        if (payload.SID && payload.password){
            fetcher(LOGIN_PATH,{
                method: 'POST',
                body:JSON.stringify(payload)
            })
            .then((response) => {
                dispatch({ type: USER_LOGGED_IN, payload: response })
                userRole()
            } )
            .catch( e => error( e.message ? e.message : undefined ) )
        }
    }

    const userRole = () => {
        fetcher(USER_ROLE).then(res => {
            dispatch({type: SET_USER_ROLE, payload: res.role});
            setTimeout( () => props.history.push("/"), 1000 );
        }).catch(e => error( e.message ? e.message : undefined ))
    }

    React.useEffect( () => {
        if (isLoggedIn) setTimeout( () => props.history.push("/"), 1000 )
    }, [])

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
    };

    const onFinish = values => {
        formSubmit(values)
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="row justify-content-md-center mx-auto my-5 py-5 " style={{maxWidth: "900px"}}>
            <div className="col-md-6 text-center bg-white p-0 shadow">
                <div className="login-header text-right">
                </div>
                <div className="py-3 mx-auto">
                    <p className="text-bold font-gray-color">
                        ورود به پورتال
                    </p>
                    <Form
                        className="py-2"
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >

                        <Form.Item
                            className="py-1"
                            label="نام کاربری"
                            name="SID"
                            rules={[{ required: true, message: 'نام کاربری اجباری است' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            className="py-1"
                            label="رمز عبور"
                            name="password"
                            rules={[{ required: true, message: 'رمز عبور اجباری است' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout} className="mt-2" >
                            <Button type="primary" htmlType="submit">
                            ورود
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}

Login.displayName="Login";