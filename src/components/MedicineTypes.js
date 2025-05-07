import React, { useState, useEffect } from "react";
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
  Select,
  Input,
  Divider,
  Typography,
  Tag,
  message
} from "antd";
import {
  ExperimentOutlined,
  SyncOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

// Mock auth context (replace with your actual auth implementation)


// API configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const PharmaDashboard = () => {
  const [drugs, setDrugs] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [visible, setVisible] = useState(false);
  const [submissionVisible, setSubmissionVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [drugForm] = Form.useForm();

  const targetPathways = [
    { value: 'Apoptosis', label: 'Apoptosis regulation' },
    { value: 'CellCycle', label: 'Cell cycle' },
    { value: 'HistoneAcetylation', label: 'Chromatin histone acetylation' },
    { value: 'HistoneMethylation', label: 'Chromatin histone methylation' },
    { value: 'Cytoskeleton', label: 'Cytoskeleton' },
    { value: 'DNAReplication', label: 'DNA replication' },
    { value: 'EGFR', label: 'EGFR signaling' },
    { value: 'ERKMAPK', label: 'ERK MAPK signaling' },
    { value: 'GenomeIntegrity', label: 'Genome integrity' },
    { value: 'PI3KMTOR', label: 'PI3K/MTOR signaling' },
    { value: 'WNT', label: 'WNT signaling' },
    { value: 'p53', label: 'p53 pathway' },
  ];

  const msiStatusOptions = [
    { value: 'MSS', label: 'MSS/MSI-L' },
    { value: 'MSI-H', label: 'MSI-H' },
    { value: 'Unknown', label: 'Unknown' },
  ];

  const screenMediumOptions = [
    { value: 'RPMI', label: 'RPMI' },
    { value: 'DMEM', label: 'DMEM' },
    { value: 'EMEM', label: 'EMEM' },
    { value: 'Other', label: 'Other' },
  ];

  const growthPropertiesOptions = [
    { value: 'Suspension', label: 'Suspension' },
    { value: 'Adherent', label: 'Adherent' },
    { value: 'Mixed', label: 'Mixed' },
    { value: 'Other', label: 'Other' },
  ];

  const renderStatusTag = (drug) => {
    const drugRemarks = remarks.filter(r => r.drug === drug.id);
    if (drugRemarks.length === 0) {
      return <Tag color="blue">Pending</Tag>;
    }
    return <Tag color="green">Reviewed</Tag>;
  };

  const columns = [
    {
      title: 'Drug',
      dataIndex: 'drug_name',
      key: 'drug_name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <Text type="secondary">{record.drug_id}</Text>
        </div>
      )
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => renderStatusTag(record)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        const drugRemarks = remarks.filter(r => r.drug === record.id);
        return (
          <Space>
            <Button 
              size="small"
              type={drugRemarks.length ? 'default' : 'primary'}
              onClick={() => handleAddRemarks(record)}
            >
              {drugRemarks.length ? 'Update' : 'Add'}
            </Button>
          </Space>
        );
      }
    }
  ];

  useEffect(() => { 
    fetchDrugs();
    fetchRemarks();
  }, []);

  const fetchDrugs = async () => {
    setLoading(true);
    try {
      const response = await api.get('drugs/');
      setDrugs(response.data);
    } catch (error) {
      message.error('Failed to fetch drugs');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchRemarks = async () => {
    try {
      const response = await api.get('remarks/');
      setRemarks(response.data);
    } catch (error) {
      message.error('Failed to fetch remarks');
    }
  };

  const handleAddRemarks = (drug) => {
    setSelectedDrug(drug);
    form.resetFields();
    
    // Find existing remarks for this drug
    const drugRemarks = remarks.filter(r => r.drug === drug.id);
    if (drugRemarks.length > 0) {
      const latestRemark = drugRemarks[0];
      form.setFieldsValue({
        ...latestRemark,
        target_pathway: latestRemark.target_pathway,
        msi_status: latestRemark.msi_status,
        screen_medium: latestRemark.screen_medium,
        growth_properties: latestRemark.growth_properties
      });
    }
    setVisible(true);
  };

  const handleSubmitRemarks = async () => {
    try {
      const values = await form.validateFields();
      const remarkData = {
        ...values,
        drug: selectedDrug.id,
        
      };

      // Check if this drug already has remarks
      const existingRemark = remarks.find(r => r.drug === selectedDrug.id);
      
      if (existingRemark) {
        // Update existing remark
        await api.put(`remarks/${existingRemark.id}/`, remarkData);
        message.success('Remarks updated successfully');
      } else {
        // Create new remark
        await api.post('remarks/', remarkData);
        message.success('Remarks added successfully');
      }
      
      setVisible(false);
      fetchRemarks(); // Refresh remarks list
    } catch (error) {
      message.error('Failed to submit remarks');
      console.error('Error submitting remarks:', error);
    }
  };

  const handleSubmitDrug = async (values) => {
    try {
      await api.post('drugs/', values);
      message.success('Drug submitted successfully');
      setSubmissionVisible(false);
      drugForm.resetFields();
      fetchDrugs(); // Refresh drugs list
    } catch (error) {
      message.error('Failed to submit drug');
      console.error('Error submitting drug:', error);
    }
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
                        onClick={() => setSubmissionVisible(true)}
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
                          <Title level={4} style={{ margin: 0 }}>Pharmaceutical Review</Title>
                        </Space>
                      }
                      extra={
                        <Button 
                          icon={<SyncOutlined />}
                          onClick={() => {
                            fetchDrugs();
                            fetchRemarks();
                          }}
                        >
                          Refresh
                        </Button>
                      }
                    >
                      <Table 
                        columns={columns} 
                        dataSource={drugs} 
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        size="middle"
                        scroll={{ x: true }}
                      />
                    </Card>

                    {/* Remarks Modal */}
                    <Modal
                      title={
                        <Space>
                          <ExperimentOutlined />
                          <Text strong>{selectedDrug?.drug_name || 'New Remarks'}</Text>
                        </Space>
                      }
                      open={visible}
                      width={800}
                      onOk={handleSubmitRemarks}
                      onCancel={() => setVisible(false)}
                      okText={remarks.some(r => r.drug === selectedDrug?.id) ? "Update" : "Submit"}
                      cancelText="Cancel"
                      destroyOnClose
                    >
                      <Form form={form} layout="vertical">
                        <div style={{ marginBottom: '24px' }}>
                          <Title level={5} style={{ marginBottom: 16 }}>Genetic Markers</Title>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item name="cna" label="CNA" valuePropName="checked">
                              <Select placeholder="Select CNA status">
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item name="gene_expression" label="Gene Expression" valuePropName="checked">
                              <Select placeholder="Select Gene Expression">
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item name="methylation" label="Methylation" valuePropName="checked">
                              <Select placeholder="Select Methylation">
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item name="msi_status" label="MSI Status" rules={[{ required: true }]}>
                              <Select placeholder="Select MSI Status">
                                {msiStatusOptions.map(opt => (
                                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                        </div>

                        <Divider style={{ margin: '16px 0' }} />

                        <div style={{ marginBottom: '24px' }}>
                          <Title level={5} style={{ marginBottom: 16 }}>Experimental Data</Title>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <Form.Item name="target" label="Target" rules={[{ required: true }]}>
                              <Input placeholder="Enter target" />
                            </Form.Item>
                            <Form.Item name="target_pathway" label="Target Pathway" rules={[{ required: true }]}>
                              <Select placeholder="Select Pathway">
                                {targetPathways.map(path => (
                                  <Option key={path.value} value={path.value}>{path.label}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item name="screen_medium" label="Screen Medium" rules={[{ required: true }]}>
                              <Select placeholder="Select Medium">
                                {screenMediumOptions.map(med => (
                                  <Option key={med.value} value={med.value}>{med.label}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item name="growth_properties" label="Growth Properties" rules={[{ required: true }]}>
                              <Select placeholder="Select Properties">
                                {growthPropertiesOptions.map(prop => (
                                  <Option key={prop.value} value={prop.value}>{prop.label}</Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item name="auc" label="AUC" rules={[{ required: true },
                             { validator: (_, value) => value && !/^-?\d+([.,]\d+)?$/.test(value) ? Promise.reject('Please enter a valid number') : Promise.resolve() }]}>
                                <Input type="text" placeholder="Enter AUC" />
                            </Form.Item>
                            <Form.Item name="z_score" label="Z-Score" rules={[{ required: true }, 
                            { validator: (_, value) => value && !/^-?\d+([.,]\d+)?$/.test(value) ? Promise.reject('Please enter a valid number') : Promise.resolve() }]}>
                              <Input type="text" placeholder="Enter Z_Score" />
                            </Form.Item>
                          </div>
                        </div>
                      </Form>
                    </Modal>
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

export default PharmaDashboard;