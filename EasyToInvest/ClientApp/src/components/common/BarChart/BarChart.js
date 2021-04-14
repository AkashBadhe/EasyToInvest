import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from './Barchart.module.css';
import formatter from '../../utils/CurrencyFormatory';
const currencyFormattor = formatter('en-IN','INR').format;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentItem = payload.find(p => p.payload.name === label);
    return (
      <div className={styles.cucustomTooltip}>
         <p>Label</p>
         <p>Interest: {currencyFormattor(currentItem.payload.Interest)}</p>
         <p>Invested: {currencyFormattor(currentItem.payload.Invested)}</p>
         <p>Maturity Value: {currencyFormattor(currentItem.payload.Interest + currentItem.payload.Invested)}</p>
      </div>
    );
  }

  return null;
};

export default function ({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Invested" stackId="a" fill="#5367ff" />
        <Bar dataKey="Interest" stackId="a" fill="#00bd8e" />
      </BarChart>
    </ResponsiveContainer>
  );
}
