import React from 'react';
import {NavLink} from "react-router-dom";
import {Descriptions, Divider, Form, Input, Button, Checkbox, Collapse, Upload} from "antd";
import {fetcher} from "../../utils/common";
import { error, success } from "../../utils/message";
import {SETS_DETAIL, QUESTIONS_LIST} from "../../utils/constants";
import {getTokenObject} from "../../utils/utils";
import {FaEdit, FaFileUpload} from "react-icons/fa";

const { Panel } = Collapse;


const SetItemDescription = (props) => (
    <div className="my-2">
        <Descriptions title={<div> <h6>{props.item.title}</h6> <span className="pointer" onClick={ () => props.setIsEditing(true)}>ویرایش <FaEdit /> </span> </div>}>
            <Descriptions.Item label="توضیحات">{props.item.text}</Descriptions.Item>
            <Descriptions.Item label="شماره">{props.item.number}</Descriptions.Item>
            <Descriptions.Item label="منتشر شده">{props.item.is_draft}</Descriptions.Item>
            <Descriptions.Item label="زمان ساخت">{props.item.creation_time}</Descriptions.Item>
            <Descriptions.Item label="سازنده">{props.item?.creator_user?.first_name}{props.item?.creator_user?.last_name}</Descriptions.Item>
            <Descriptions.Item label="ایمیل سازنده">{props.item?.creator_user?.email}</Descriptions.Item>
            <Descriptions.Item label="مدرسه">{props.item?.tenant?.name}</Descriptions.Item>
            <Descriptions.Item label="سایت مدرسه">{props.item?.tenant?.sub_domain}</Descriptions.Item>
            <Descriptions.Item label="توضیح">{props.item?.tenant?.description}</Descriptions.Item>
            <Descriptions.Item label="تعداد سوالات">{props.item?.questions?.length}</Descriptions.Item>
        </Descriptions>
    </div>
)

const QuestionItemDescription = (props) => (
    <Collapse>
        {
            props.questions.map( (i,k) => (
                <Panel header={i.question} key={k}>
                    <div className="d-flex justify-content-between">
                        <p> گزینه 1) {i.ans1}</p>
                        <p> گزینه 2) {i.ans2}</p>
                        <p> گزینه 3) {i.ans3}</p>
                        <p> گزینه 4) {i.ans4}</p>
                    </div>
                </Panel>)
            )
        }
    </Collapse>
)

const EditSet = (props) => {
    const formLayout = {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 14, offset: 4 },
    }

    const [form] = Form.useForm();

    const onFinish = (values) =>{
        values["is_draft"] = Boolean(values["is_draft"]);
        let payload = {...props.item, ...values}
        editSetItem(payload)
    }

    const editSetItem = (payload) => {
        fetcher(SETS_DETAIL(props.setId),{
            method: "PUT",
            body: JSON.stringify(payload)
        }).then( response => {
            success("ویرایش شد");
            setTimeout( () => window.location.reload(), 1000);
        }).catch( e => error(String(e.text)) )
    }

    return (
        <>
            <Form
                {...formLayout}
                layout={'vertical'}
                form={form}
                size="large"
                name="set-add" 
                onFinish={onFinish}
                initialValues={{
                    ...props.item
                }}
            >
                <Form.Item name="title" label="نام" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="text" label="متن" rules={[{ required: true }]}>
                    <Input.TextArea/>
                </Form.Item>
                <Form.Item name="number" label="شماره" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="is_draft" label="منتشر شده" valuePropName="checked">
                    <Checkbox />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">ثبت</Button>
                    <Button type="reset" htmlType="reset" onClick={() => props.setIsEditing(false) }>انصراف</Button>
                </Form.Item>
            </Form>
            <Upload
                name='receiver_users_excel'
                method="PUT"
                action='http://questionary.ir/api/portal/sets/4/append_receiver_users'
                headers={
                    {authorization: `Bearer ${getTokenObject().Authorization}`}
                }
            >
                <Button icon={ <FaFileUpload /> }>  لیست کاربران شرکت کننده  </Button>
            </Upload>
        </>
    )
}


const QuestionCreateForm = (props) => {

    const formLayout = {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 14, offset: 4 },
    }

    const [form] = Form.useForm();

    const onFinish = (values) =>{
        values["test_set"] = props.setId
        addQuestion(values)
    }

    const addQuestion = (payload) => {
        fetcher(QUESTIONS_LIST,{
            method: "POST",
            body: JSON.stringify(payload)
        }).then( response => {
            success("اضافه شد");
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
            <Form.Item >
                <Button type="primary" htmlType="submit">ثبت</Button>
            </Form.Item>
        </Form>
    )
}


export default function SetDetails(props) {

    const [setItem, setSetItem] = React.useState({});

    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect( () => {
        fetchSets()
    }, [])

    const fetchSets = () => {
        fetcher(SETS_DETAIL(props.match.params.setId))
        .then( response => setSetItem(response))
        .catch( e => error(String(e)))
    }

    return (
        <div className="p-5">
            <div className="p-3">
                <SetItemDescription item={setItem} setIsEditing={setIsEditing} />
            </div>
            {
                isEditing && <div><EditSet item={setItem} setIsEditing={setIsEditing} setId={props.match.params.setId} /></div>
            }
            <Divider />
            <div className="my-2">
                <h5 className="mb-3">لیست سوالات</h5>
                { setItem?.questions_info?.length && (
                    <QuestionItemDescription questions={setItem.questions_info} />
                )}
            </div>
            <Divider />
            <h5>اضافه کردن سوال جدید</h5>
            <QuestionCreateForm setId={props.match.params.setId} />
        </div>
    )
}
