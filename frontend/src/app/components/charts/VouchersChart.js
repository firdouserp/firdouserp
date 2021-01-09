import React from "react";
import { Error, Loading, useQueryWithStore } from "react-admin";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
const Label = (props) => {
  const { x, y, value } = props;

  return (
    <text
      x={x}
      y={y}
      dx={"2%"}
      dy={"-1%"}
      fontSize="15"
      fontWeight="normal"
      fill={"#1976d2"}
      textAnchor="left"
    >
      {value}
    </text>
  );
};
const VouchersChart = () => {
  const { data, loading, error } = useQueryWithStore({
    type: "getList",
    resource: "vouchers/monthly",
    payload: {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "vou_date", order: "DESC" },
      filter: {},
    },
  });

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!data) return null;

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <ResponsiveContainer>
        <BarChart
          width={600}
          height={300}
          data={data.reverse()}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="vou_date" />
          <YAxis />
          <Legend label="Vouchers Per Month" />
          <Bar
            name="Vouchers this Month"
            label={<Label />}
            dataKey="count"
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VouchersChart;
