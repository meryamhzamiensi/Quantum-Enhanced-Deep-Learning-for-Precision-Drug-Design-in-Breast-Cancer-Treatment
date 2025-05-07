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
  Popconfirm
} from "antd";
import {
  ExperimentOutlined,
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

// API configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const DrugInventory = () => {
  const [drugs, setDrugs] = useState([]);
  const [submissionVisible, setSubmissionVisible] = useState(false);
  const [editingDrugId, setEditingDrugId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drugForm] = Form.useForm();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      key: 'drug_name',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Drug ID',
      dataIndex: 'drug_id',
      key: 'drug_id',
      render: (text) => <Text type="secondary">{text}</Text>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record.drug_id)}
          />
          <Popconfirm
            title="Are you sure to delete this drug?"
            onConfirm={() => handleDelete(record.drug_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => { 
    fetchDrugs();
  }, []);

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const response = await api.get('drugs/');
      setDrugs(response.data);
    } catch (error) {
      message.error('Failed to fetch drugs');
      console.error('Error fetching drugs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewDrug = () => {
    navigate('/MoleculeSubmissionForm');
  };
  const handleDelete = async (drugId) => {
    try {
      await api.delete(`drugs/${encodeURIComponent(drugId)}/`);
      message.success('Drug deleted successfully');
      fetchDrugs();
    } catch (error) {
      message.error(`Failed to delete drug ${drugId}`);
      console.error('Error deleting drug:', error);
    }
  };
  const handleEdit = async (drugId) => {
    try {
      setLoading(true);
      const response = await api.get(`drugs/${encodeURIComponent(drugId)}/`);
      drugForm.setFieldsValue({
        drug_name: response.data.drug_name,
        drug_id: response.data.drug_id
      });
      setEditingDrugId(drugId);
      setSubmissionVisible(true);
    } catch (error) {
      message.error(`Failed to fetch drug ${drugId}`);
      console.error('Error fetching drug:', error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleSubmit = async () => {
    try {
      const values = await drugForm.validateFields();
      setLoading(true);
      
      if (editingDrugId) {
        // Update existing drug using drug_id
        await api.put(`drugs/${editingDrugId}/`, values);
        message.success('Drug updated successfully');
      } else {
        // Create new drug
        await api.post('drugs/', values);
        message.success('Drug added successfully');
      }
      
      setSubmissionVisible(false);
      setEditingDrugId(null);
      fetchDrugs();
    } catch (error) {
      message.error('Operation failed');
      console.error('Error submitting drug:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSubmissionVisible(false);
    setEditingDrugId(null);
    drugForm.resetFields();
  };

  return (
    <div className="wrapper">
      <AdminSideBar />
      <AdminHeader />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Medicine Inventory</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header">
                    <h4 className="card-title">
                      Inventory List{" "}
                      <Button 
                        type="primary" 
                        size="small"
                        className="float-right"
                        icon={<PlusOutlined />}
                        onClick={handleAddNewDrug}
                      >
                        Add New Drug
                      </Button>
                    </h4>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <Card 
                      title={
                        <Space>
                          <ExperimentOutlined style={{ color: '#1890ff' }} />
                          <Title level={4} style={{ margin: 0 }}>Drug Inventory</Title>
                        </Space>
                      }
                      extra={
                        <Button 
                          icon={<SyncOutlined />}
                          onClick={fetchDrugs}
                          loading={loading}
                        >
                          Refresh
                        </Button>
                      }
                    >
                      <Table 
                        columns={columns} 
                        dataSource={drugs} 
                        rowKey="drug_id"
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

        {/* Edit/Add Modal */}
        <Modal
          title={editingDrugId ? "Edit Drug" : "Add New Drug"}
          visible={submissionVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          confirmLoading={loading}
        >
          <Form form={drugForm} layout="vertical">
            <Form.Item
              name="drug_name"
              label="Drug Name"
              rules={[{ required: true, message: 'Please input the drug name!' }]}
            >
              <Input placeholder="Enter drug name" />
            </Form.Item>
            <Form.Item
              name="drug_id"
              label="Drug ID"
              rules={[{ required: true, message: 'Please input the drug ID!' }]}
            >
              <Input 
                placeholder="Enter drug ID" 
                disabled={!!editingDrugId} 
              />
            </Form.Item>
          </Form>
        </Modal>

        <AdminFooter />
      </div>
    </div>
  );
};

export default DrugInventory;