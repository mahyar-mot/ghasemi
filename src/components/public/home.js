import React from 'react';
import {store} from "../../context/store";


export default function Home(props) {
    const {userRole} = React.useContext(store)

    return (
        <div className="d-flex justify-content-center align-items-center">
            <h3>داشبورد </h3>
        </div>
    )
}

