import { Form, Input, Button, Select } from 'antd';
import React, { useState } from 'react';
import MovieTable from './TableMovie';
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
    const [loading, setLoading] = useState(false);


    const onFinish = async (values) => {
        setLoading(true);
        console.log('Received values:', values);

        const person = { userName, name, surname, password, phoneNumber, emailAddress, gender };
   
        fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        })
            .then((response) => {
                if (response.ok) {
                    setAuthenticated(true);
                } else {
                    console.log('Failed to create person');
                    alert('Failed to create person');
                    setAuthenticated(false);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
                alert('An error occurred while creating the person');
            });
    };


    return (
        <div>
            {authenticated ? (
                <MovieTable />
            ) : (
                <div className="form-container" style={{marginTop:"-30px"}}>
                    <Form className="signup-form" layout="vertical" onFinish={onFinish}>
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
