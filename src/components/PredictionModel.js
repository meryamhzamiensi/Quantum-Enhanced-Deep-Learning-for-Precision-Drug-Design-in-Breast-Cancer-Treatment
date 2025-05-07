import React, { useState, useEffect } from "react";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Card,
  Form,
  Select,
  Button,
  Typography,
  Divider,
  Spin,
  Result,
  Space,
  Tag,
  message,
  Descriptions,
  Alert,
  Progress,
  Row,
  Col
} from "antd";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// API configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  }
});

const modelOptions = [
  { value: 'dt_classic', label: 'Decision Tree Classic', architecture: 'sklearn' },
  { value: 'dt_quantum', label: 'Decision Tree Quantum', architecture: 'q-en' },
  { value: 'rf_classic', label: 'Random Forest Classic', architecture: 'sklearn' },
  { value: 'rf_quantum', label: 'Random Forest Quantum', architecture: 'q-en' },
  { value: 'mlp_classic', label: 'MLP Classic', architecture: 'MLP' },
  { value: 'mlp_quantum', label: 'MLP Quantum', architecture: 'q-en_MLP' },
];

const efficacyClasses = [
  { 
    id: 0,
    label: 'very_low',
    name: 'Very Low Efficacy',
    description: 'Minimal or no effect on cancer cells',
    color: '#ff4d4f',
    tagColor: 'red',
    progressColor: 'red'
  },
  { 
    id: 1,
    label: 'low',
    name: 'Low Efficacy',
    description: 'Limited effect on cancer cells',
    color: '#ff7a45',
    tagColor: 'orange',
    progressColor: 'orange'
  },
  { 
    id: 2,
    label: 'medium',
    name: 'Medium Efficacy',
    description: 'Moderate effect on cancer cells',
    color: '#faad14',
    tagColor: 'gold',
    progressColor: 'gold'
  },
  { 
    id: 3,
    label: 'high',
    name: 'High Efficacy',
    description: 'Strong effect on cancer cells',
    color: '#52c41a',
    tagColor: 'green',
    progressColor: 'green'
  },
  { 
    id: 4,
    label: 'excellent',
    name: 'Excellent Efficacy',
    description: 'Exceptional effect on cancer cells',
    color: '#389e0d',
    tagColor: 'cyan',
    progressColor: 'green'
  }
];

const PredictionModel = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [drugData, setDrugData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('selectedDrugData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDrugData(parsedData);
      } catch (error) {
        console.error("Error parsing stored drug data:", error);
        message.error("Failed to load selected drug data");
      }
    }
  }, []);

  const handleModelChange = (value) => {
    setSelectedModel(value);
    setPredictionResult(null);
  };

  const handlePrediction = async () => {
    if (!selectedModel) {
      message.warning("Please select a model first");
      return;
    }

    if (!drugData) {
      message.warning("No drug data available for prediction");
      return;
    }

    setLoading(true);
    setPredictionResult(null);

    try {
      const features = extractFeaturesFromDrugData(drugData);
      
      const response = await api.post('predict/', {
        model_name: getModelName(selectedModel),
        features: features
      });

      const predictedClass = efficacyClasses.find(
        ec => ec.label === response.data.label
      );

      setPredictionResult({
        status: 'success',
        model: selectedModel,
        modelName: getModelName(selectedModel),
        prediction: response.data.prediction,
        label: response.data.label,
        classInfo: predictedClass
      });
      
    } catch (error) {
      console.error("Prediction error:", error);
      setPredictionResult({
        status: 'error',
        error: error.response?.data?.error || 'Prediction failed. Please try again.'
      });
      message.error("Prediction failed. See details below.");
    } finally {
      setLoading(false);
    }
  };

  const getModelName = (modelValue) => {
    const mapping = {
      'dt_classic': 'decision_tree_30_model',
      'dt_quantum': 'decision_tree_30d_4q_model',
      'rf_classic': 'rf_model',
      'rf_quantum': 'q_data4_rf_model',
      'mlp_classic': 'breast_cancer_MLP_model',
      'mlp_quantum': 'breast_cancer_model_q-en_MLP'
    };
    return mapping[modelValue] || '';
  };

  // Updated to match exactly with drug remarks table columns
  const extractFeaturesFromDrugData = (data) => {
    return [
      data.drug_id || 0,                  // DRUG_ID
      data.drug_name || '',               // DRUG_NAME
      data.target || '',                  // TARGET
      data.target_pathway || '',          // TARGET_PATHWAY
      data.cna === 'Yes' ? 1 : 0,           // CNA
      data.gene_expression === 'Yes' ? 1 : 0, // Gene Expression
      data.methylation === 'Yes' ? 1 : 0,   // Methylation
      data.msi_status || 'unknown',       // MSI Status
      data.screen_medium || 'unknown',    // Screen Medium
      data.growth_properties || 'unknown', // Growth Properties
      parseFloat(data.auc) || 0,          // AUC
      parseFloat(data.z_score) || 0       // Z_SCORE
    ];
  };

  const goBackToDrugRemarks = () => {
    navigate('/remarques-pharmacien');
  };

  const renderDrugData = () => {
    if (!drugData) {
      return (
        <Alert
          type="warning"
          message="No Drug Selected"
          description="Return to Drug Remarks page and select a drug for prediction."
          action={
            <Button size="small" type="primary" onClick={goBackToDrugRemarks}>
              Go Back
            </Button>
          }
        />
      );
    }

    return (
      <Descriptions
        title="Selected Drug Data"
        bordered
        size="small"
        column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="Drug ID">{drugData.drug_id || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Drug Name">{drugData.drug_name || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Target">{drugData.target || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Pathway">{drugData.target_pathway || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="CNA">
          {drugData.cna === "Y" ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="Gene Expression">
          {drugData.gene_expression === 'Y' ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="Methylation">
          {drugData.methylation === 'Y' ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="MSI Status">
          <Tag color={drugData.msi_status === 'MSI-H' ? 'red' : 'blue'}>
            {drugData.msi_status || 'Unknown'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Screen Medium">{drugData.screen_medium || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Growth Properties">{drugData.growth_properties || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="AUC">
          {drugData.auc ? parseFloat(drugData.auc).toFixed(2) : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Z-Score">
          {drugData.z_score ? parseFloat(drugData.z_score).toFixed(2) : 'N/A'}
        </Descriptions.Item>
      </Descriptions>
    );
  };

  const renderEfficacyScale = () => {
    return (
      <div style={{ margin: '20px 0' }}>
        <Title level={5}>Efficacy Scale:</Title>
        <Row gutter={16}>
          {efficacyClasses.map((efficacy) => (
            <Col key={efficacy.id} span={24/efficacyClasses.length}>
              <div style={{ textAlign: 'center' }}>
                <Tag color={efficacy.tagColor}>{efficacy.name}</Tag>
                <Progress
                  percent={20 * (efficacy.id + 1)}
                  showInfo={false}
                  strokeColor={efficacy.progressColor}
                />
                <Text type="secondary">{efficacy.description}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const renderPredictionResult = () => {
    if (!predictionResult) return null;

    if (predictionResult.status === 'error') {
      return (
        <Result
          status="error"
          title="Prediction Failed"
          subTitle={predictionResult.error}
        />
      );
    }

    const { classInfo } = predictionResult;
    const modelInfo = modelOptions.find(m => m.value === selectedModel);

    return (
      <div style={{ marginTop: 24 }}>
        <Result
          status="success"
          title={classInfo.name}
          subTitle={`Predicted efficacy against cancer cells`}
          extra={[
            <Tag color={classInfo.tagColor} key="efficacy-tag">
              {classInfo.label.toUpperCase()}
            </Tag>,
            <Text key="model-info">Model: {modelInfo?.label}</Text>
          ]}
        />
        
        <Card title="Efficacy Details" style={{ marginTop: 16 }}>
          <Descriptions bordered>
            <Descriptions.Item label="Efficacy Class" span={3}>
              <Tag color={classInfo.tagColor}>{classInfo.name}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {classInfo.description}
            </Descriptions.Item>
            <Descriptions.Item label="Numerical Value">
              {predictionResult.prediction}
            </Descriptions.Item>
            <Descriptions.Item label="Prediction Model">
              {modelInfo?.label}
            </Descriptions.Item>
            <Descriptions.Item label="Model Type">
              {modelInfo?.architecture}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {renderEfficacyScale()}
      </div>
    );
  };

  return (
    <div className="wrapper">
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <Card title={<Title level={4}>Drug Efficacy Prediction Model</Title>}>
              {renderDrugData()}
              
              <Divider />
              
              <Form form={form} layout="vertical">
                <Form.Item 
                  label="Select Prediction Model" 
                  required
                  tooltip="Choose a model for predicting drug efficacy"
                >
                  <Select
                    placeholder="Select a model"
                    value={selectedModel}
                    onChange={handleModelChange}
                    style={{ width: '100%' }}
                  >
                    {modelOptions.map(option => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                
                <Form.Item>
                  <Space>
                    <Button 
                      type="primary" 
                      onClick={handlePrediction}
                      loading={loading}
                      disabled={!selectedModel || !drugData}
                    >
                      Run Prediction
                    </Button>
                    <Button onClick={goBackToDrugRemarks}>
                      Back to Drug List
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
              
              {loading && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <Spin size="large" />
                  <Paragraph style={{ marginTop: 8 }}>Running prediction...</Paragraph>
                </div>
              )}
              
              {renderPredictionResult()}
            </Card>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default PredictionModel;