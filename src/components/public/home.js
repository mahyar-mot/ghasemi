import React from 'react';


export default function Home(props) {
    React.useEffect( () => {
        // setTimeout(()=> props.history.push("/monitoring"), 2000)
    }, [])
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "300px"}}>
            <h3>به سامانه مانیتورینگ خوش آمدید </h3>
        </div>
    )
}

