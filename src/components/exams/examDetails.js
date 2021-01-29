import React from 'react';
import { Radio, Button} from "antd";
import {fetcher} from "../../utils/common";
import { error, success } from "../../utils/message";
import {SETS_DETAIL, ANSWER_SET} from "../../utils/constants";



const Questions = (props) => {

    const handleAnswer = (id, e) => {
        const answerList = (list) =>{
            let index = list.findIndex( x => x.question === id )
            if (index === -1){
                list = [...list, {question: id, answer: e.target.value}]
            }else {
                list = [
                    ...list.slice(0,index),
                    Object.assign({}, list[index], {answer: e.target.value}),
                    ...list.slice(index+1)
                ]
            }
            return list
        }
        props.setAnswers( state => answerList(state) )
    }

    return (
        <div className="p-4">
            {props.item?.map( (i,k) => (
                <div className="mt-3" key={k}>
                    <p><span>سوال {k+1} ) </span>  {i.question} </p>
                    <Radio.Group onChange={ (e) =>handleAnswer(i.id, e) }>
                        <Radio className="px-2" value={i.ans1}>{i.ans1}</Radio>
                        <Radio className="px-2" value={i.ans2}>{i.ans2}</Radio>
                        <Radio className="px-2" value={i.ans3}>{i.ans3}</Radio>
                        <Radio className="px-2" value={i.ans4}>{i.ans4}</Radio>
                    </Radio.Group>
                </div>
            ) )}
        </div>
    )
}


export default function ExamDetails(props) {

    const [setItem, setSetItem] = React.useState({});

    const [answers, setAnswers] = React.useState([]);

    React.useEffect( () => {
        fetchSets()
    }, [])

    const fetchSets = () => {
        fetcher(SETS_DETAIL(props.match.params.examId))
        .then( response => setSetItem(response))
        .catch( e => error(String(e)))
    }

    const sendAnswer = () => {
        if (answers.length) {
            fetcher(ANSWER_SET(props.match.params.examId), {
                method: "POST",
                body: JSON.stringify({answers})
            })
            .then( response => success("جواب ها ارسال شد "))
            .catch( e => error(String(e.message ? e.message : e.text)) )
        }
    }

    return (
        <div className="p-5">
            <div className="p-3">
                <h6>آزمون : {setItem.title} </h6>
            </div>
                <Questions item={setItem.questions_info} setAnswers={setAnswers} />
                <Button type="primary" onClick={sendAnswer} >ارسال پاسخ</Button>
        </div>
    )
}
