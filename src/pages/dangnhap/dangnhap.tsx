import { faCalendarDays, faChevronRight, faHandHoldingMedical, faHospital, faMedkit, faStethoscope } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../dangnhap/dangnhap.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

const Dangnhap: React.FC = () => {
  const navigate = useNavigate();

  

  return (
    <div className="form-container">
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
        // onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="mat_khau"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Checkbox>Remember me</Checkbox>
          <a href="" style={{ float: 'right' }}>Forgot password</a>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="/register">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Dangnhap;
