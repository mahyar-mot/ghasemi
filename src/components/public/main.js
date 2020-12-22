import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import Navbar from './navbar';
import {store} from "../../context/store";


export default function Main(props) {
    const {isLoggedIn} = useContext(store);
    return (
        <>
            {/* <Navbar /> */}
            <div className="container-fluid text-right">
                { isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children : <Redirect to="/login" /> }
            </div>
        </>
    )
}
