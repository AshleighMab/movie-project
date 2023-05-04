import { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import MovieTable from './TableMovie';
import './loginStyle.css'; // import your CSS file here\
import ClapperboardColor from './ClapperboardColor.svg.png';

function Login({ onFormSwitch }) {
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState(null);
  const onFinish = async (values) => {
    setLoading(true);


    const response = await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    
    if (response.ok) {
      console.log(response);
      console.log(response.accessToken);
      localStorage.setItem("objLogin", JSON.stringify(response));
      setAuthenticated(true);
      setError(true); // clear the error message
    } else {
      console.log("Buy");
      const errorResponse = await response.json();
      setError(errorResponse.error.message); // set the error message
    }

    setLoading(false);
  };

  return (
    <div>
      {isLoginForm}

      {authenticated ? (
        <MovieTable />
      ) : (

        <div class="form-wrapper">
          <div class="clapperboard-container">
            <img src={ClapperboardColor} alt="clapperboard" className="clapperboard" />
          </div>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            class="login-form">
            <Form.Item

              name="UserNameOrEmailAddress"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
              validateStatus={error ? 'error' : ''}
              help={error}
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
