import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Modal, Form, Input, Select } from 'antd';
import "./addCategoryModal.scss";
import Category from '../category/category';

const AddCategoryModal: React.FC<any> = (props) => {
    const { modalOpen, categories, formSubmitData, handleCancel } = props;
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate fields
            formSubmitData(values)
            form.resetFields();

        } catch (error) {
            console.error('Validation Failed:', error);
        }
    }

    const handleReset = () => {
        form.resetFields();
    }

    return (
        <Modal
            open={modalOpen}
            title="Add Category Items"
            footer={null}
            onCancel={handleCancel}
        >

            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
                labelCol={{ flex: '110px' }}
                labelAlign="left"
                labelWrap
                wrapperCol={{ flex: 1 }}
                colon={false}
                style={{ maxWidth: '100%' }}
            >
                <Form.Item<any>
                    label="Product"
                    name="productname"
                    rules={[{ required: true, message: 'Please input your Product Name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<any>
                    label="ImageUrl"
                    name="imageurl"
                    rules={[{ required: true, message: 'Please input your Image Url!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<any>
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please input your Category!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a Category"
                        filterOption={(input: any, option: any) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={categories}
                        fieldNames={{ label: 'label', value: 'value' }} // Adjust based on your category object structure
                        onChange={(value, option) => form.setFieldsValue({ category: { label: option.label, value } })}
                    />
                </Form.Item>
                <Form.Item className={"form-btns"}>
                    <Button key="back" onClick={handleReset}>
                        Reset
                    </Button>&nbsp;&nbsp;&nbsp;
                    <Button key="submit" type="primary" onClick={handleSubmit} style={{color:"#ffff", background:"#a98fc7", cursor:"pointer"}}>
                        Submit
                    </Button>
                </Form.Item>

            </Form>

        </Modal>

    )
}
export default AddCategoryModal;