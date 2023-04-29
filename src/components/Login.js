import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MovieTable from './MovieTable';
import './loginStyle.css'; // import your CSS file here\
import LoginRegisterToggle from './LoginRegisterToggle';

function Login({ onFormSwitch }) {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const onFinish = async (values) => {
    setLoading(true);

    // Make an API call to verify the user's credentials
    const response = await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        console.log(response.accessToken);
        localStorage.setItem("objLogin", JSON.stringify(response));
        setAuthenticated(true);
      } else {
        console.log("Buy");
        alert("Failed to Login!!! Please check your email or password");
      }
    });

    setLoading(false);
  };

  return (
    <div>
      {isLoginForm}
      {authenticated ? (
        <MovieTable />
      ) : (
        <div className="form-container">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ border: "1px solid blue" }}
          >
            <Form.Item
              name="UserNameOrEmailAddress"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                Log in
              </Button>

              <Button type="link" onClick={() => onFormSwitch("signup")}>
                Register
              </Button>

            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
