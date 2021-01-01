import React, { useContext } from 'react';
import { NavLink as NavLinkRouter } from "react-router-dom";
import {store} from "../../context/store";
import {USER_LOGGED_OUT} from "../../context/actionType";
import { Menu } from 'antd';


export default function SideMenu(props) {

    const {isLoggedIn, userName, dispatch} = useContext(store);

    const onLogout = () => {
        dispatch({type: USER_LOGGED_OUT})
    }

    return (
        <div style={{ backgroundColor: "#002329", color: "white" }}>
            <div className="text-right p-3" style={{ minHeight: "150px" }}>
                <div className="d-flex justify-content-between" style={{ minHeight: "150px" }}>
                    <div>
                        <h4 className="text-white">
                        <NavLinkRouter className="text-white text-decoration-none" to="/">
                            پورتال
                        </NavLinkRouter>
                        </h4>
                    </div>
                    <div className="align-self-end">
                        <span className="pointer" onClick={() => onLogout()} >خروج از حساب</span>
                    </div>
                </div>
            </div>
            <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0, backgroundColor: "#002329", color: "white" }}
            >
                <Menu.Item key="1">
                    <NavLinkRouter className="text-white text-decoration-none" to="/exams">
                        آزمون ها
                    </NavLinkRouter>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLinkRouter className="text-white text-decoration-none" to="/sets">
                        امتحانات
                    </NavLinkRouter>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLinkRouter className="text-white text-decoration-none" to="/questions">
                        سوالات
                    </NavLinkRouter>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLinkRouter className="text-white text-decoration-none" to="/tenants">
                        مدارس
                    </NavLinkRouter>
                </Menu.Item>
            </Menu>
        </div>
    )
}
