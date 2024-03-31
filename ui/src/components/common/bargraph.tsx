import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartData {
  name: string;
  value: number;
}

interface Props {
  data: BarChartData[];
}

const RechartsBarGraph: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" barSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartsBarGraph;
