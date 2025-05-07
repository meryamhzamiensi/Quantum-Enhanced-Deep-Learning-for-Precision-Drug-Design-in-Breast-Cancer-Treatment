import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const ModelStatsTable = ({ modelStats }) => {
    const modelColumns = [
        {
            title: 'Model',
            dataIndex: 'model',
            key: 'model',
            render: (text) => <Text strong>{text}</Text>
        },
        {
            title: 'Accuracy (%)',
            dataIndex: 'accuracy',
            key: 'accuracy',
            render: (text) => <Text type="success">{text}</Text>
        },
        {
            title: 'Time (s)',
            dataIndex: 'time',
            key: 'time'
        },
        {
            title: 'Memory (MB)',
            dataIndex: 'memory',
            key: 'memory'
        }
    ];

    return (
        <Table 
            columns={modelColumns} 
            dataSource={modelStats} 
            rowKey="model" 
            pagination={false}
            size="small"
        />
    );
};

export default ModelStatsTable;
