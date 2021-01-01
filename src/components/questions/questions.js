import React from 'react';
import {Descriptions, Divider, Form, Input, Button, Select } from "antd";
import {fetcher} from "../../utils/common";
import { error, success } from "../../utils/message";
import {SETS_LIST, QUESTIONS_LIST, QUESTIONS_DETAIL} from "../../utils/constants";
import {FaEdit} from "react-icons/fa";

const { Option } = Select;


const QuestionDescription = (props) => (
    <div className="my-3">
        <Descriptions 
            title={<div> <h6>{props.item.question}</h6> <span className="pointer" onClick={ () => {props.setEditedItem(props.item); props.setIsEditing(true) }}>ویرایش <FaEdit /> </span> </div>}
            column={{ xxl: 4, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
        >
            <Descriptions.Item label="مربوط به امتحان" span={4}>{props.item.test_set}</Descriptions.Item>
            <Descriptions.Item label="گزینه۱">{props.item.ans1}</Descriptions.Item>
            <Descriptions.Item label="گزینه۲">{props.item.ans2}</Descriptions.Item>
            <Descriptions.Item label="گزینه۳">{props.item.ans3}</Descriptions.Item>
            <Descriptions.Item label="گزینه۴">{props.item.ans4}</Descriptions.Item>
        </Descriptions>
    </div>
)


const QuestionCreateForm = (props) => {

    const formLayout = {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 14, offset: 4 },
    }

    const [form] = Form.useForm();

    const onFinish = (values) =>{
        if (props.isEditing){
            let payload = {...props.editedItem, ...values}
            editQuestion(payload)
        }else{
            addQuestion(values)
        }
    }

    React.useEffect(() => {
        if (props.isEditing){
             form.setFieldsValue(props.editedItem)
        }else{
            form.resetFields()
        }
    },[props.isEditing] );

    const addQuestion = (payload) => {
        fetcher(QUESTIONS_LIST,{
            method: "POST",
            body: JSON.stringify(payload)
        }).then( response => {
            success("اضافه شد");
            setTimeout( () => window.location.reload(), 1000);
        }).catch( e => error(String(e)) )
    }

    const editQuestion = (payload) => {
        fetcher(QUESTIONS_DETAIL(props.editedItem.id),{
            method: "PUT",
            body: JSON.stringify(payload)
        }).then( response => {
            success("ویرایش شد");
            setTimeout( () => window.location.reload(), 1000);
        }).catch( e => error(String(e)) )
    }

    return (
        <Form
            {...formLayout}
            layout={'vertical'}
            form={form}
            size="large"
            name="question-add" 
            onFinish={onFinish}
        >
            <Form.Item name="question" label="سوال" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="ans1" label="گزینه۱" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ans2" label="گزین۲" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ans3" label="گزینه۳" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="ans4" label="گزینه۴" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="test_set" label="امتحان" rules={[{ required: true }]}>
                <Select>
                    {
                        props.setItems.map( (i,k) => (
                            <Option key={k} value={i.id}>{i.title}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">ثبت</Button>
                { props.isEditing && <Button type="reset" htmlType="reset" onClick={() => props.setIsEditing(false)}>انصراف</Button>}
            </Form.Item>
        </Form>
    )
}


export default function Questions(props) {

    const [setItems, setSetItems] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedItem, setEditedItem] = React.useState({})

    React.useEffect( () => {
        fetchSets();
        fetchQuestions();
    }, [])

    const fetchSets = () => {
        fetcher(SETS_LIST)
        .then( response => setSetItems(response))
        .catch( e => error(String(e)))
    }

    const fetchQuestions = () => {
        fetcher(QUESTIONS_LIST)
        .then( response => setQuestions(response))
        .catch( e => error(String(e)))
    }

    return (
        <div className="p-5">
            <div className="d-flex justify-content-between">
                <h5>لیست سوالات</h5>
            </div>
            <div className="p-3">
                { questions.map( (item, index) => <QuestionDescription item={item} key={index} setIsEditing={setIsEditing} setEditedItem={setEditedItem} /> ) }
            </div>
            <Divider />
            { isEditing ? <h5>ویرایش سوال</h5> : <h5>ساخت سوال جدید</h5>}
            <QuestionCreateForm editedItem={editedItem} setItems={setItems} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>
    )
}
