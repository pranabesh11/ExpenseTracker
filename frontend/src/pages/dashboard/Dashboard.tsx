import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Button, Card, DatePicker, Form, Typography } from "antd";
const { RangePicker } = DatePicker;
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { DeleteFilled, EditOutlined, EyeOutlined } from "@ant-design/icons";
import IncomeExpenseModal from "../popups/IncomeExpenseModal ";
import ViewExpenseModal, { type ExpenseData } from "../popups/ViewExpenseModal";
import { getApiData } from "../../shared/api/get-api-data";
interface IncomeExpense {
  id: number;
  category: string;
  amount: number;
  type: string;
  recurring: string;
  description: string;
  receiptUrl: string | null;
}
const Dashboard: React.FC = () => {
  console.log("Dashboard mounted");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(
    null,
  );
  const [expenses, setExpenses] = useState<IncomeExpense[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  useEffect(() => {
    fetchIncomeExpense();
  }, []);

  const fetchIncomeExpense = async () => {
    try {
      setLoading(true);

      const [startDate, endDate] = dateRange;

      const response = await getApiData({
        endpoint: "/billbot/getIncomeExpense",
        payload: {
          id: 7,
          startdate: startDate?.format("YYYY-MM-DD"),
          endDate: endDate?.format("YYYY-MM-DD"),
          currentPage: 0,
          pageSize: 5,
        },
      });
      console.log("FULL API RESPONSE:", response);
      console.log("SUCCESS:", response.success);
      console.log("LIST:", response.data?.incomeAndExpense);
      if (response.success) {
        const incomeAndExpense = response.data?.incomeAndExpense ?? [];
        console.log("***********", incomeAndExpense);
        setExpenses(incomeAndExpense);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  const handleView = (expense: IncomeExpense) => {
    setSelectedExpense({
      ...expense,
      date: "",
      paymentMode: "",
    });

    setViewOpen(true);
  };
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
  console.log("EXPENSES STATE:", expenses);
  return (
    <div className="dashboard">
      <div className="details">
        <div className="exInfo">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Dashboard
          </Typography.Title>
          <div className="controls">
            <Form.Item label="Select Date Range" style={{ marginBottom: 0 }}>
              <RangePicker
                value={dateRange}
                allowClear={false}
                onChange={(dates) => {
                  if (dates && dates[0] && dates[1]) {
                    setDateRange([dates[0], dates[1]]);
                  }
                }}
              />
            </Form.Item>
            <Button type="primary" onClick={fetchIncomeExpense}>
              Get Details
            </Button>
            <IncomeExpenseModal open={isModalOpen} onClose={handleClose} />
            <Button type="primary" onClick={handleOpen}>
              Add Income / Expense
            </Button>
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

          {loading ? (
            <div>Loading...</div>
          ) : expenses.length === 0 ? (
            <div>No income / expense found.</div>
          ) : (
            expenses.map((expense) => (
              <div className="expenseItem" key={expense.id}>
                <div className="itemInfo">
                  <div className="itemName">{expense.category}</div>

                  <div className="itemDescription">{expense.description}</div>

                  <div className="itemAmount">
                    ₹{expense.amount.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="itemActions">
                  <Button size="small" onClick={() => handleView(expense)}>
                    <EyeOutlined />
                  </Button>

                  <Button size="small">
                    <EditOutlined />
                  </Button>

                  <Button size="small" danger>
                    <DeleteFilled />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ViewExpenseModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        data={selectedExpense}
      />
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

  return (
    <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
  );
};
