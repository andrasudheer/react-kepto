import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Modal, Form, Input, Select } from 'antd';

const AddCategoryModal: React.FC<any> = (props) => {
    const { modalOpen, handleOk, handleCancel, categories } = props;
    const [form] = Form.useForm();

    return (
        <Modal
            open={modalOpen}
            title="Add Category Items"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Reset
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Submit
                </Button>,

            ]}
        >
            <Form
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                form={form}
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
                    rules={[{ required: true, message: 'Please input your Image Url!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Select a Category"
                        filterOption={(input:any, option:any) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={categories}
                    />
                </Form.Item>


            </Form>

        </Modal>

    )
}
export default AddCategoryModal;