import React from 'react';
import {NavLink} from "react-router-dom";
import {Descriptions, Divider, Form, Input, Button, Checkbox } from "antd";
import {fetcher} from "../../utils/common";
import { error, success } from "../../utils/message";
import {SETS_LIST} from "../../utils/constants";


const SetItemDescription = (props) => (
    <div className="my-2">
        <Descriptions title={<NavLink className="text-decoration-none" to={`/sets/${props.item.id}`} > <span>{props.item.title}</span> </NavLink>}>
            <Descriptions.Item label="توضیحات">{props.item.text}</Descriptions.Item>
            <Descriptions.Item label="شماره">{props.item.number}</Descriptions.Item>
            <Descriptions.Item label="منتشر شده">{props.item.is_draft}</Descriptions.Item>
            <Descriptions.Item label="زمان ساخت">{props.item.creation_time}</Descriptions.Item>
            <Descriptions.Item label="سازنده">{props.item.creator_user.first_name}</Descriptions.Item>
            <Descriptions.Item label="مدرسه">{props.item.tenant.name}</Descriptions.Item>
            <Descriptions.Item label="تعداد سوالات">{props.item.questions.length}</Descriptions.Item>
        </Descriptions>
    </div>
)


const SetCreateForm = (props) => {

    const formLayout = {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 14, offset: 4 },
    }

    const [form] = Form.useForm();

    const onFinish = (values) =>{
        values["is_draft"] = Boolean(values["is_draft"]);
        values["questions"] = [];
        createSetItem(values)
    }

    const createSetItem = (payload) => {
        fetcher(SETS_LIST,{
            method: "POST",
            body: JSON.stringify(payload)
        }).then( response => {
            success("ساخته شد");
            setTimeout( () => window.location.reload(), 1000);
        }).catch( e => error(String(e)) )
    }

    return (
        <Form
            {...formLayout}
            layout={'vertical'}
            form={form}
            size="large"
            name="set-add" 
            onFinish={onFinish}
        >
            <Form.Item name="title" label="نام" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="text" label="متن" rules={[{ required: true }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name="number" label="شماره" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="is_draft" label="منتشر شده" valuePropName="checked">
                <Checkbox />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">ثبت</Button>
            </Form.Item>
        </Form>
    )
}


export default function Sets(props) {

    const [setItems, setSetItems] = React.useState([]);

    React.useEffect( () => {
        fetchSets()
    }, [])

    const fetchSets = () => {
        fetcher(SETS_LIST)
        .then( response => setSetItems(response))
        .catch( e => error(String(e)))
    }

    return (
        <div className="p-5">
            <div className="d-flex justify-content-between">
                <h5>لیست امتحانات</h5>
            </div>
            <div className="p-3">
                { setItems.map( (item, index) => <SetItemDescription item={item} key={index} /> ) }
            </div>
            <Divider />
            <h5>ساخت امتحان جدید</h5>
            <SetCreateForm />
        </div>
    )
}
