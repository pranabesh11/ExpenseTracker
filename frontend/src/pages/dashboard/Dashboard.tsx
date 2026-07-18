import React from "react";
import "./dashboard.css"
import { Button, Card, DatePicker, Flex, Form, Typography} from "antd";
const { RangePicker } = DatePicker;
import ReactECharts from "echarts-for-react";
import { DeleteFilled, EditOutlined, EyeFilled, EyeOutlined } from "@ant-design/icons";

const Dashboard: React.FC = () => {
  console.log("Dashboard mounted");
  const data = [
    { type: "Food", value: 27 },
    { type: "Travel", value: 25 },
    { type: "Shopping", value: 18 },
    { type: "Bills", value: 15 },
    { type: "Other", value: 15 },
  ];

  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="dashboard">
      <div className="details">
        <div className="exInfo">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Typography.Title>
          <div className="controls">
            <Form.Item
              label="Select Date Range"
              name="datepicker"
              style={{ marginBottom: 0 }}
            >
              <RangePicker />
            </Form.Item>
            <Button type="primary">Get Details</Button>
            <Button type="primary">Add Income / Expense</Button>
          </div>
        </div>
      </div>
      <div className="summary">
        <div className="summaryCard">
          <div className="summaryValue">₹25,000</div>
          <div className="summaryLabel">Income</div>
        </div>

        <div className="summaryCard">
          <div className="summaryValue">₹18,500</div>
          <div className="summaryLabel">Expense</div>
        </div>

        <div className="summaryCard">
          <div className="summaryValue">₹6,500</div>
          <div className="summaryLabel">Savings</div>
        </div>
      </div>
      <div className="expensepie">
        <div className="chartContainer">
          <ExpensePie />
        </div>

        <div className="expenseList">
          <Typography.Title className="listTitle" level={5}>
            Expense / Income List
          </Typography.Title>

          <div className="expenseItem">
            <div className="itemInfo">
              <div className="itemName">Food</div>
              <div className="itemDescription">IMG, originally known as the International Management Group
                , is an American sports, fashion, events and media company headquartered in New York City.
                IMG, originally known as the International Management Group
                , is an American sports, fashion, events and media company headquartered in New York City.
              </div>
              <div className="itemAmount">₹12,000</div>
            </div>

            <div className="itemActions">
              <Button size="small"><EyeOutlined/></Button>
              <Button size="small"><EditOutlined/></Button>
              <Button size="small" danger><DeleteFilled/></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const ExpensePie = () => {
  const option = {
    title: {
      text: "Expense Breakdown",
      left: "center",
    },

    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>₹{c} ({d}%)",
    },

    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
    },

    series: [
      {
        name: "Expenses",
        type: "pie",
        radius: ["20%", "40%"],
        center: ["40%", "50%"], // move pie left to make space for legend

        label: {
          show: true,
          position: "outside",
          formatter: "{b}\n{d}%",
        },

        labelLine: {
          show: true,
        },

        data: [
          { value: 12000, name: "Food" },
          { value: 8500, name: "Travel" },
          { value: 6000, name: "Shopping" },
          { value: 3500, name: "Bills" },
          { value: 2000, name: "Entertainment" },
          { value: 1500, name: "Other" },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />;
};