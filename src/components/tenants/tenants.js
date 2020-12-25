import React from 'react';
import {Descriptions, Divider, Form, Input, Button } from "antd";
import {fetcher} from "../../utils/common";
import { error, success } from "../../utils/message";
import {TENANTS_LIST} from "../../utils/constants";


const TenantDescription = (props) => (
    <div className="my-3">
        <Descriptions 
            title={props.item.name}
        >
            <Descriptions.Item label="توضیحات">{props.item.description}</Descriptions.Item>
            <Descriptions.Item label="آدرس">{props.item.sub_domain}</Descriptions.Item>
            <Descriptions.Item label="کد">{props.item.code}</Descriptions.Item>
        </Descriptions>
    </div>
)


const TenantCreateForm = (props) => {

    const formLayout = {
        labelCol: { span: 4, offset: 4 },
        wrapperCol: { span: 14, offset: 4 },
    }

    const [form] = Form.useForm();

    const onFinish = (values) =>{
        addTenant(values)
    }

    const addTenant = (payload) => {
        fetcher(TENANTS_LIST,{
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
            name="tenant-add" 
            onFinish={onFinish}
        >
            <Form.Item name="name" label="نام" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="توضیحات" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="sub_domain" label="آدرس" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="code" label="کد" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">ثبت</Button>
            </Form.Item>
        </Form>
    )
}


export default function Tenants(props) {

    const [tenants, setTenants] = React.useState([]);

    React.useEffect( () => {
        fetchSets();
    }, [])

    const fetchSets = () => {
        fetcher(TENANTS_LIST)
        .then( response => setTenants(response))
        .catch( e => error(String(e)))
    }

    return (
        <div className="p-5">
            <div className="d-flex justify-content-between">
                <h5>لیست مدارس</h5>
            </div>
            <div className="p-3">
                { tenants.map( (item, index) => <TenantDescription item={item} key={index} /> ) }
            </div>
            <Divider />
            <h5>ساخت مدرسه جدید</h5>
            <TenantCreateForm />
        </div>
    )
}
