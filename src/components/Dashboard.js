import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./layouts/AdminHeader";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import axios from 'axios';
import {
  Table,
  Card,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  message,
  Popconfirm,
  Select
} from "antd";
import {
  ExperimentOutlined,
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

// API configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const columns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Role', 
      dataIndex: 'user_type', 
      key: 'user_type',
      render: (user_type, record) => (
        <span>
          {currentUser && record.id === currentUser.id ? 
            `${user_type} (You)` : 
            user_type
          }
        </span>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Show edit/delete for all users except current user */}
          {(!currentUser || record.id !== currentUser.id) && (
            <>
              <Button 
                type="link" 
                icon={<EditOutlined />} 
                onClick={() => editUser(record)}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => deleteUser(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="link" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    // Fetch current user data (you might get this from your auth context or localStorage)
    const userData = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(userData);
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const editUser = (user) => {
    form.setFieldsValue({
      id: user.id,
      user_type: user.user_type
    });
    setVisible(true);
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}/`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await api.patch(`/users/${values.id}/`, { user_type: values.user_type });
      message.success('User role updated successfully');
      setVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error('Operation failed');
    }
  };

  return (
    <div className="wrapper">
      <AdminSideBar collapsed={collapsed} />
      <AdminHeader setCollapsed={setCollapsed} collapsed={collapsed} />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Management d'utilisateurs</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  
                  <div style={{ padding: '24px' }}>
                    <Card 
                      title={
                        <Space>
                          <ExperimentOutlined style={{ color: '#1890ff' }} />
                          <Title level={4} style={{ margin: 0 }}>utilisateurs</Title>
                        </Space>
                      }
                      extra={
                        <Button 
                          icon={<SyncOutlined />} 
                          onClick={fetchUsers}
                          loading={loading}
                        >
                          Refresh
                        </Button>
                      }
                    >
                      <Table 
                        columns={columns} 
                        dataSource={users} 
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        size="middle"
                      />
                    </Card>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminDashboard;