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
  Tag,
  Typography,
  message,
  Popconfirm,
  Select,
  Switch,
  InputNumber
} from "antd";
import {
  ExperimentOutlined,
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RadarChartOutlined
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

// Constants for dropdown options
const TARGET_PATHWAYS = [
  'Apoptosis regulation', 'Cell cycle', 'Cell Cycle', 'Chromatin histone acetylation', 'Chromatin histone methylation', 'Cytoskeleton', 'DNA replication','EGFR signaling','ERK MAPK signaling','Genome integrity','PI3K/MTOR signaling','WNT signaling','p53 pathway'
];

const MSI_STATUS = ['MSS/MSI-L', 'Unknown', 'MSI-H'];
const SCREEN_MEDIUM = ['RPMI','DMEM','EMEM','Other'];
const GROWTH_PROPERTIES = ['Adherent', 'Suspension', 'Mixed','Other'];

const DrugRemarks = () => {
  const [remarks, setRemarks] = useState([]);
  const [drugs, setDrugs] = useState([]);
  const [submissionVisible, setSubmissionVisible] = useState(false);
  const [editingRemarkId, setEditingRemarkId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remarkForm] = Form.useForm();
  const navigate = useNavigate();

  
  const columns = [
    {
      title: 'Drug Name',
      dataIndex: 'drug_name',
      key: 'drug_name',
      render: (text) => <Text strong>{text || 'N/A'}</Text>,
      width: 150,
      fixed: 'left'
    },
    {
      title: 'Drug ID',
      dataIndex: 'drug_id',
      key: 'drug_id',
      render: (text) => <Text strong>{text || 'N/A'}</Text>,
      width: 120
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.target.localeCompare(b.target),
      width: 120
    },
    {
      title: 'Pathway',
      dataIndex: 'target_pathway',
      key: 'target_pathway',
      filters: TARGET_PATHWAYS.map(pathway => ({ text: pathway, value: pathway })),
      onFilter: (value, record) => record.target_pathway === value,
      sorter: (a, b) => a.target_pathway.localeCompare(b.target_pathway),
      width: 120
    },
    {
      title: 'CNA',
      dataIndex: 'cna',
      key: 'cna',
      render: (value) => value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      onFilter: (value, record) => record.cna === value,
      width: 80
    },
    {
      title: 'Gene Exp',
      dataIndex: 'gene_expression',
      key: 'gene_expression',
      render: (value) => value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      onFilter: (value, record) => record.gene_expression === value,
      width: 90
    },
    {
      title: 'Methylation',
      dataIndex: 'methylation',
      key: 'methylation',
      render: (value) => value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>,
      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      onFilter: (value, record) => record.methylation === value,
      width: 110
    },
    {
      title: 'MSI Status',
      dataIndex: 'msi_status',
      key: 'msi_status',
      filters: MSI_STATUS.map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.msi_status === value,
      width: 110
    },
    {
      title: 'Medium',
      dataIndex: 'screen_medium',
      key: 'screen_medium',
      filters: SCREEN_MEDIUM.map(medium => ({ text: medium, value: medium })),
      onFilter: (value, record) => record.screen_medium === value,
      width: 80
    },
    {
      title: 'Growth',
      dataIndex: 'growth_properties',
      key: 'growth_properties',
      filters: GROWTH_PROPERTIES.map(prop => ({ text: prop, value: prop })),
      onFilter: (value, record) => record.growth_properties === value,
      width: 100
    },
    {
      title: 'AUC',
      dataIndex: 'auc',
      key: 'auc',
      render: (value) => <Text type={value < 0.5 ? 'danger' : value < 0.7 ? 'warning' : 'success'}>{value.toFixed(2)}</Text>,
      sorter: (a, b) => a.auc - b.auc,
      width: 90
    },
    {
      title: 'Z-Score',
      dataIndex: 'z_score',
      key: 'z_score',
      render: (value) => <Text type={value < -2 ? 'danger' : value < 0 ? 'warning' : 'success'}>{value.toFixed(2)}</Text>,
      sorter: (a, b) => a.z_score - b.z_score,
      width: 90
    },
    {
      title: 'Predict',
      key: 'predict',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<RadarChartOutlined />}
          onClick={() => navigateToPrediction(record)}
        >
          Predict
        </Button>
      ),
      width: 100,
      fixed: 'right'
    }
  ];

  useEffect(() => { 
    fetchRemarks();
  }, []);

  const fetchRemarks = async () => {
    setLoading(true);
    try {
      const response = await api.get('remarks/');
      setRemarks(response.data);
    } catch (error) {
      message.error('Failed to fetch remarks');
      console.error('Error fetching remarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToPrediction = (record) => {
    // Store the selected drug data in localStorage
    localStorage.setItem('selectedDrugData', JSON.stringify(record));
    // Navigate to prediction model page
    navigate('/prediction-model');
  };

  const handleAddNewRemark = () => {
    remarkForm.resetFields();
    setEditingRemarkId(null);
    setSubmissionVisible(true);
  };

  const handleCancel = () => {
    setSubmissionVisible(false);
    setEditingRemarkId(null);
    remarkForm.resetFields();
  };

  return (
    <div className="wrapper">
      <AdminSideBar />
      <AdminHeader />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Drug Remarks</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card card-tasks">
                  <div className="card-header">
                    <h4 className="card-title">
                      Remarks List{" "}
                    </h4>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <Card 
                      title={
                        <Space>
                          <ExperimentOutlined style={{ color: '#1890ff' }} />
                          <Title level={4} style={{ margin: 0 }}>Drug Remarks</Title>
                        </Space>
                      }
                      extra={
                        <Button 
                          icon={<SyncOutlined />}
                          onClick={fetchRemarks}
                          loading={loading}
                        >
                          Refresh
                        </Button>
                      }
                    >
                      <Table 
                        columns={columns} 
                        dataSource={remarks} 
                        rowKey="id"
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        size="middle"
                        scroll={{ x: 1500 }}
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

export default DrugRemarks;