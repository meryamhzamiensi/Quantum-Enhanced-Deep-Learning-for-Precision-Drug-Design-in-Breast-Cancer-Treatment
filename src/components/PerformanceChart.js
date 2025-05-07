// components/PerformanceChart.js
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const data = [
  { name: 'DT classique', Accuracy: 90.62, Temps: 0.69, Memoire: 21 },
  { name: 'DT quantique', Accuracy: 83.75, Temps: 0.233, Memoire: 0.98 },
  { name: 'RF classique', Accuracy: 95.76, Temps: 13.85, Memoire: 63.34 },
  { name: 'RF quantique', Accuracy: 84.43, Temps: 5.58, Memoire: 2.25 },
  { name: 'MLP classique', Accuracy: 95.77, Temps: 428.23, Memoire: 423.47 },
  { name: 'MLP quantique', Accuracy: 95.42, Temps: 243.77, Memoire: 1.14 }
];

const PerformanceChart = () => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Comparaison des Performances</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Accuracy" stroke="#8884d8" activeDot={{ r: 8 }} animationDuration={800} />
          <Line type="monotone" dataKey="Temps" stroke="#82ca9d" animationDuration={1200} />
          <Line type="monotone" dataKey="Memoire" stroke="#ff7300" animationDuration={1600} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
