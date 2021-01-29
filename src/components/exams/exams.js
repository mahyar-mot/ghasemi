import React from 'react';
import {NavLink} from "react-router-dom";
import {Descriptions, Divider } from "antd";
import {fetcher} from "../../utils/common";
import { error } from "../../utils/message";
import {SETS_LIST} from "../../utils/constants";


const TakenDescription = (props) => (
    <div className="my-3">
        <Descriptions 
            title={"آزمون های شرکت کرده"}
            column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
        >
            {
                props.item.map( (i,k) => (
                    <Descriptions.Item key={k} span={4}><NavLink className="text-decoration-none" to={`/exams/${i.id}`} >{i.title}</NavLink></Descriptions.Item>
                ) )
            }
        </Descriptions>
    </div>
)

const EnrolledDescription = (props) => (
    <div className="my-3">
        <Descriptions 
            title={"آزمون های فعال"}
            column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
        >
            {
                props.item.map( (i,k) => (
                    <Descriptions.Item key={k} span={4}><NavLink className="text-decoration-none" to={`/exams/${i.id}`} >{i.title}</NavLink></Descriptions.Item>
                ) )
            }
        </Descriptions>
    </div>
)


export default function Exams(props) {

    const [enrolled, setEnrolled] = React.useState([]);
    const [taken, setTaken] = React.useState([]);

    React.useEffect( () => {
        fetchTaken();
        fetchEnrolled();
    }, [])

    const fetchTaken = () => {
        fetcher(SETS_LIST+"?type=taken")
        .then( response => setTaken(response))
        .catch( e => error(String(e)))
    }

    const fetchEnrolled = () => {
        fetcher(SETS_LIST+"?type=enrolled")
        .then( response => setEnrolled(response))
        .catch( e => error(String(e)))
    }

    return (
        <div className="p-5">
            <div className="d-flex justify-content-between">
                <h5>لیست آزمون ها</h5>
            </div>
            <TakenDescription item={taken} />
            <Divider />
            <EnrolledDescription item={enrolled} />
        </div>
    )
}
