import React from 'react';
import { Form, Input,message } from "antd";
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import {Link,useNavigate} from "react-router-dom";
import "../styles/Registerstyles.css";
import axios from 'axios';

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const onfinishHandler = async(values) => {
      try{
        dispatch(showLoading())
        const res=await axios.post('/api/v1/user/login',values);
        window.location.reload();
        dispatch(hideLoading())
        if(res.data.sucess){
          localStorage.setItem("token",res.data.token);
          message.success('Login Sucessfully');
          navigate('/');
        }
        else{
          message.error(res.data.message);
        }

      }
      catch(error){
        dispatch(hideLoading())
        console.log(error);
        message.error('something went wrong');
      }
      };
  return (
    <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler} className="registerform">
        <h3 className="text-center">Login Form</h3>
          
          <Form.Item label="Email" name="email">
            <Input  type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input  type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">Register User</Link>
      
          <button className="btn btn-primary" type="submit">Login</button>
        </Form>
      </div>
  )
}

export default Login;