import { Form, Input, Button, Select } from 'antd';
import React, { useState } from 'react';
import MovieTable from './MovieTable';
import './SignUp.css';

const SignUp = ({ onFormSwitch }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setNumber] = useState('');
    const [emailAddress, setEmail] = useState('');
    const [gender, setGender] = useState('');
 

    const onFinish = (values) => {



        console.log('Received values:', values);

        const person = { userName, name, surname, password, phoneNumber, emailAddress, gender }
        // Send a POST request to the API endpoint with the form data
        fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAuthenticated(true); // Set the authenticated state to true
            })
            .catch((error) => {
                console.error(error);
                setAuthenticated(false);
            });
    };

    return (
        <div>
            {authenticated ? (
                <MovieTable />
            ) : (
                <div className="form-container">
                    <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                        <Form.Item name="userName" label="UserName">
                            <Input value={userName} onChange={e => setUserName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="name" label="First Name">
                            <Input value={name} onChange={e => setName(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="surname" label="Last Name">
                            <Input value={surname} onChange={e => setSurname(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="password" label="Password">
                            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="phoneNumber" label="Phone Number">
                            <Input value={phoneNumber} onChange={e => setNumber(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="emailAddress" label="Email Address">
                            <Input value={emailAddress} onChange={e => setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item name="gender" label="Gender">
                            <Select value={gender} onChange={value => setGender(value === 'male' ? 1 : 2)}>
                                <Select.Option value="male">Male</Select.Option>
                                <Select.Option value="female">Female</Select.Option>
                            </Select>
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>

                        <Button type="link" onClick={() => onFormSwitch("login")}>
                            Login
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default SignUp;
