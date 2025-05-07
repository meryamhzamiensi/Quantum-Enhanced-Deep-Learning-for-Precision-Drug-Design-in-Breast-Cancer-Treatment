import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./layouts/AdminSideBar";
import AdminFooter from "./layouts/AdminFooter";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import axios from "axios";
import { Form, Input, Button, Select, message } from "antd";

const { TextArea } = Input;

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default function MoleculeSubmissionForm() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const moleculesCollectionRef = collection(db, "molecule_submissions");

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      // Submit to your API
      await api.post('drugs/', values);
      
      // Optionally also submit to Firebase
      await addDoc(moleculesCollectionRef, values);
      
      message.success('Drug submitted successfully');
      form.resetFields();
      // If you need to refresh a list, you would call fetchDrugs() here
      // But you need to define it or receive it as prop
    } catch (error) {
      message.error('Failed to submit drug');
      console.error('Error submitting drug:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AdminSideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <h4 className="page-title">Soumission de Molécule</h4>
            <div className="card p-4">
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  name="drug_name"
                  label="Nom de la Molécule"
                  rules={[{ required: true, message: "Veuillez saisir le nom de la molécule." }]}
                >
                  <Input placeholder="Ex : Tamoxifen" />
                </Form.Item>

                <Form.Item
                  name="drug_id"
                  label="Identifiant Chimique (ID)"
                  rules={[{ required: true, message: "Veuillez entrer un identifiant unique." }]}
                >
                  <Input placeholder="Ex : CID123456" />
                </Form.Item>

                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  loading={submitting}
                >
                  Soumettre pour Analyse Quantique
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </>
  );
}