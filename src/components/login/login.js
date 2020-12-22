import React from 'react';
import {store} from "../../context/store";
import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../../context/actionType";
import {fetcher} from "../../utils/common";
import { error } from "../../utils/message";
import {LOGIN_PATH} from "../../utils/constants";
// import Logo from "../../assets/imgs/logo04.png"
import {Spin, Space} from "antd";


export default function Login(props) {

    const [payload, setpayload] = React.useState({username: '', password: ''});
    const {isLoggedIn, dispatch} = React.useContext(store)

    const inputChange = (ele) => {
        setpayload({...payload, [ele.target.name]: ele.target.value})
    }

    const formSubmit = (e) => {
        e.preventDefault();
        if (payload.username && payload.password){
            fetcher(LOGIN_PATH,{
                method: 'POST',
                body:JSON.stringify(payload)
            })
            .then((response) => {
                dispatch({ type: USER_LOGGED_IN, payload: response.result })
                setTimeout( () => props.history.push("/"), 1000 )
            } )
            .catch( e => error( e.message ? e.message : undefined ) )
        }
    }

    React.useEffect(() => {
        // if (!Boolean(Token() && isLoggedIn)){
        //     dispatch({type: USER_LOGGED_OUT});
        // }
    }, [])

    return (
        <div className="row justify-content-md-center mx-auto my-5 py-5" style={{maxWidth: "900px"}}>
            <div className="col-md-6 text-center bg-white p-0">
                {/* <div className="login-header text-right">
                    ورود به سامانه
                </div> */}
                <div className="login-body py-3 mx-auto">
                    <p className="text-bold font-gray-color">
                        {/* <img className="img-fluid" src={Logo} /> */}
                        {/* رصد فضای فرهنگی کشور */}
                    </p>
                    <form >
                        <div className="form-group text-right my-3 font-gray-color">
                            <label htmlFor="login-username">نام کاربری</label>
                            <input type="text" name="username" onChange={(ele) => inputChange(ele)} value={payload.username} className="form-control input-border" id="login-username" />
                        </div>
                        <div className="form-group text-right my-3 font-gray-color">
                            <label htmlFor="login-password">کلمه عبور</label>
                            <input type="password" name="password" className="form-control input-border" onChange={(ele) => inputChange(ele)} value={payload.password} id="login-password" />
                        </div>
                        <div className="form-group form-check my-3 text-right">
                            <label className="form-check-label mr-4 font-size-sm font-gray-color" htmlFor="login-remember"> مرا به خاطر بسپار </label>
                            <input type="checkbox" className="form-check-input" id="login-remember"/>
                        </div>
                        <button type="submit" className="btn main-btn-pill w-100 mt-2" onClick={(e) => formSubmit(e)} >ورود به سامانه</button>
                    </form>
                    <p className="pt-4 font-size-sm mt-2 font-gray-color">
                        رمز عبور خود را فراموش کرده اید؟ <a href="/">کلیک کنید</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

Login.displayName="Login";