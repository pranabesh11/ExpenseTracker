import React, { useState } from "react";
import {
  Modal,
  Button,
  Card,
  Row,
  Col,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Space,
} from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import "./IncomeExpenseModal.css";

const { TextArea } = Input;

type TransactionType = "Income" | "Expense";

interface ExpenseRow {
  key: string;
  category: string;
  amount: number | null;
  description: string;
  date: Dayjs | null;
  type: TransactionType;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const createRow = (): ExpenseRow => ({
  key: Date.now().toString(),
  category: "",
  amount: null,
  description: "",
  date: null,
  type: "Expense",
});

const IncomeExpenseModal: React.FC<Props> = ({
  open,
  onClose,
}) => {
  const [rows, setRows] = useState<ExpenseRow[]>([
    createRow(),
  ]);

  const updateRow = (
    key: string,
    field: keyof ExpenseRow,
    value: any
  ) => {
    setRows((prev) =>
      prev.map((row) =>
        row.key === key
          ? { ...row, [field]: value }
          : row
      )
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      createRow(),
    ]);
  };

  const deleteRow = (key: string) => {
    setRows((prev) =>
      prev.filter((row) => row.key !== key)
    );
  };


  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Add Income / Expense"
      width={850}
      className="expense-modal"
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
        >
          Save
        </Button>,
      ]}
    >

      <div className="expense-container">

        {rows.map((row, index) => (

          <Card
            key={row.key}
            size="small"
            className="expense-card"
            title={`Entry ${index + 1}`}
            extra={
              rows.length > 1 && (
                <Button
                  danger
                  size="small"
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() =>
                    deleteRow(row.key)
                  }
                />
              )
            }
          >

            <Row
              gutter={[8, 8]}
              align="middle"
            >

              {/* Category */}
              <Col
                xs={24}
                sm={12}
                md={8}
              >
                <label>Category</label>

                <Select
                  size="small"
                  placeholder="Select"
                  style={{
                    width: "100%",
                  }}
                  value={
                    row.category || undefined
                  }
                  onChange={(value) =>
                    updateRow(
                      row.key,
                      "category",
                      value
                    )
                  }
                  options={[
                    {
                      label: "Food",
                      value: "Food",
                    },
                    {
                      label: "Travel",
                      value: "Travel",
                    },
                    {
                      label: "Shopping",
                      value: "Shopping",
                    },
                    {
                      label: "Salary",
                      value: "Salary",
                    },
                    {
                      label: "Other",
                      value: "Other",
                    },
                  ]}
                />

              </Col>


              {/* Amount */}
              <Col
                xs={12}
                sm={6}
                md={5}
              >
                <label>Amount</label>

                <InputNumber
                  size="small"
                  style={{
                    width: "100%",
                  }}
                  placeholder="0"
                  value={
                    row.amount ?? undefined
                  }
                  onChange={(value) =>
                    updateRow(
                      row.key,
                      "amount",
                      value
                    )
                  }
                />

              </Col>


              {/* Date */}
              <Col
                xs={12}
                sm={6}
                md={5}
              >
                <label>Date</label>

                <DatePicker
                  size="small"
                  style={{
                    width: "100%",
                  }}
                  value={row.date}
                  onChange={(date) =>
                    updateRow(
                      row.key,
                      "date",
                      date
                    )
                  }
                />

              </Col>


              {/* Type */}
              <Col
                xs={24}
                sm={12}
                md={6}
              >
                <label>Type</label>

                <Select
                  size="small"
                  style={{
                    width: "100%",
                  }}
                  value={row.type}
                  onChange={(value) =>
                    updateRow(
                      row.key,
                      "type",
                      value
                    )
                  }
                  options={[
                    {
                      label: "Income",
                      value: "Income",
                    },
                    {
                      label: "Expense",
                      value: "Expense",
                    },
                  ]}
                />

              </Col>
              {/* Description */}
              <Col span={24}>
                <label>
                  Description
                </label>

                <TextArea
                  size="small"
                  rows={2}
                  placeholder="Description"
                  value={
                    row.description
                  }
                  onChange={(e) =>
                    updateRow(
                      row.key,
                      "description",
                      e.target.value
                    )
                  }
                />

              </Col>

            </Row>

          </Card>

        ))}


        <Space className="add-button">
          <Button
            size="small"
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addRow}
          >
            Add Entry
          </Button>
        </Space>


      </div>

    </Modal>
  );
};

export default IncomeExpenseModal;