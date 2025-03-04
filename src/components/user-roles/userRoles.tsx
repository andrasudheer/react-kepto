import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Space } from 'antd';

const UsersRole: React.FC = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/user_roles").then((res) => {
            return res.json();
        }).then((data) => {
            const userItems = data.map((user: any, index: number) => ({
                key: String(index + 1),
                label: <span>{user.role_name}</span>,
                onClick: () => handleClick(user)

            }));
            setUsers(userItems);
        })
    }, [])

    const handleClick = (user: any) => {
        console.log("user.......", user);
    }

    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown menu={{ items: users }} placement="bottom" arrow={{ pointAtCenter: true }}>
                    <Button>Roles</Button>
                </Dropdown>
            </Space>
        </Space>
    )


}


export default UsersRole;