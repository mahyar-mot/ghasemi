import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import Navbar from './navbar';
import SideMenu from "./sider"
import {store} from "../../context/store";

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function Main(props) {
    const {isLoggedIn} = useContext(store);
    return (
        <Layout style={{backgroundColor: "#fff7e6", minHeight: "100vh"}}>
            {
                props.children[1].type?.displayName !== "Login" && (
                    <Sider width={250} style={{backgroundColor: "#002329", color: "white",}}><SideMenu /></Sider>
                )
            }
            <Layout style={{backgroundColor: "#fff7e6"}}>
                {/* <Navbar /> */}
                <Content >
                    <div className="container-fluid text-right">
                        { isLoggedIn || (props.children[1].type?.displayName === "Login") ? props.children : <Redirect to="/login" /> }
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}
