import React, { useMemo, useState } from "react";
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
  Tag,
  Empty,
  Divider,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "./IncomeExpenseModal.css";

const { TextArea } = Input;

type TransactionType = "Income" | "Expense";

type RecurrenceType =
  | "None"
  | "Daily"
  | "Weekly"
  | "Monthly"
  | "Yearly";

interface ExpenseRow {
  key: string;
  category: string;
  amount: number | null;
  description: string;
  date: Dayjs | null;
  type: TransactionType;
  recurrence: RecurrenceType;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const createForm = (): ExpenseRow => ({
  key: "",
  category: "",
  amount: null,
  description: "",
  date: dayjs(),
  type: "Expense",
  recurrence: "None",
});

const IncomeExpenseModal: React.FC<Props> = ({
  open,
  onClose,
}) => {
  const [entries, setEntries] = useState<ExpenseRow[]>([]);
  const [form, setForm] = useState<ExpenseRow>(createForm());
  const [editingKey, setEditingKey] = useState<string | null>(null);

  const editing = useMemo(
    () => editingKey !== null,
    [editingKey]
  );

  const updateField = (
    field: keyof ExpenseRow,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(createForm());
    setEditingKey(null);
  };

  const saveEntry = () => {
    if (!form.category || !form.amount) return;

    if (editing) {
      setEntries((prev) =>
        prev.map((item) =>
          item.key === editingKey
            ? {
                ...form,
                key: editingKey,
              }
            : item
        )
      );
    } else {
      setEntries((prev) => [
        ...prev,
        {
          ...form,
          key: Date.now().toString(),
        },
      ]);
    }

    resetForm();
  };

  const editEntry = (key: string) => {
    const data = entries.find(
      (item) => item.key === key
    );

    if (!data) return;

    setForm(data);
    setEditingKey(key);
  };

  const deleteEntry = (key: string) => {
    setEntries((prev) =>
      prev.filter(
        (item) => item.key !== key
      )
    );

    if (editingKey === key) {
      resetForm();
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      centered
      title="Add Income / Expense"
      className="expense-modal"
      maskClosable={false}
    >

      <Card
        className="editor-card"
        title={
          editing
            ? "Edit Entry"
            : "New Entry"
        }
      >

        <Row gutter={[10,10]}>

          <Col
            xs={12}
            sm={8}
            md={8}
          >
            <label>Category</label>
            <Select
              size="small"
              style={{
                width:"100%"
              }}
              placement={
                window.innerWidth < 768
                  ? "topLeft"
                  : "bottomLeft"
              }
              getPopupContainer={() => document.body}
              value={
                form.category || undefined
              }
              placeholder="Select"
              onChange={(v)=>
                updateField(
                  "category",
                  v
                )
              }
              options={[
                {label:"Food",value:"Food"},
                {label:"Travel",value:"Travel"},
                {label:"Shopping",value:"Shopping"},
                {label:"Salary",value:"Salary"},
                {label:"Other",value:"Other"},
              ]}
            />
          </Col>


          <Col
            xs={12}
            sm={6}
            md={5}
          >
            <label>Amount</label>
            <InputNumber
              size="small"
              style={{
                width:"100%"
              }}
              value={
                form.amount ?? undefined
              }
              onChange={(v)=>
                updateField(
                  "amount",
                  v
                )
              }
            />
          </Col>


          <Col
  xs={12}
  sm={6}
  md={6}
>
            <label>Date</label>
            <DatePicker
              size="small"
              style={{
                width:"100%"
              }}
              value={form.date}
              onChange={(v)=>
                updateField(
                  "date",
                  v
                )
              }
            />
          </Col>


          <Col
  xs={12}
  sm={6}
  md={5}
>
            <label>Type</label>
            <Select
              size="small"
              style={{
                width:"100%"
              }}
              placement={
                window.innerWidth < 768
                  ? "topLeft"
                  : "bottomLeft"
              }
              getPopupContainer={() => document.body}
              value={form.type}
              onChange={(v)=>
                updateField(
                  "type",
                  v
                )
              }
              options={[
                {
                  label:"Income",
                  value:"Income"
                },
                {
                  label:"Expense",
                  value:"Expense"
                }
              ]}
            />
          </Col>


          <Col
  xs={12}
  sm={6}
  md={8}
>
            <label>Recurring</label>
            <Select
              size="small"
              style={{
                width:"100%"
              }}
              placement={
                window.innerWidth < 768
                  ? "topLeft"
                  : "bottomLeft"
              }
              getPopupContainer={() => document.body}
              value={form.recurrence}
              onChange={(v)=>
                updateField(
                  "recurrence",
                  v
                )
              }
              options={[
                {
                  label:"None",
                  value:"None"
                },
                {
                  label:"Daily",
                  value:"Daily"
                },
                {
                  label:"Weekly",
                  value:"Weekly"
                },
                {
                  label:"Monthly",
                  value:"Monthly"
                },
                {
                  label:"Yearly",
                  value:"Yearly"
                }
              ]}
            />
          </Col>


          <Col
  xs={24}
  sm={16}
  md={16}
>
            <label>Description</label>

            <TextArea
              rows={2}
              placeholder="Description"
              value={
                form.description
              }
              onChange={(e)=>
                updateField(
                  "description",
                  e.target.value
                )
              }
            />
          </Col>

        </Row>


        <Divider />

        <Space>
          <Button
            size="small"
            type="primary"
            icon={
              editing
                ? <CheckOutlined/>
                : <PlusOutlined/>
            }
            onClick={saveEntry}
          >
            {
              editing
              ? "Update"
              : "Add Entry"
            }
          </Button>

          <Button
            size="small"
            onClick={resetForm}
          >
            Clear
          </Button>

        </Space>

      </Card>


      <Divider />


      {
        entries.length === 0 ?

        <Empty />

        :

        <Row gutter={[10,10]}>
          {
            entries.map(item=>(

              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={6}
                key={item.key}
              >

                <Card
                  size="small"
                  className={
                    editingKey===item.key
                    ?
                    "selected-card"
                    :
                    ""
                  }
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={()=>
                        editEntry(item.key)
                      }
                    />,
                    <DeleteOutlined
                      key="delete"
                      onClick={()=>
                        deleteEntry(item.key)
                      }
                    />
                  ]}
                >

                  <div className="entry-header">
                    <b>
                      {item.category}
                    </b>

                    <Tag
                      color={
                        item.type==="Income"
                        ?
                        "green"
                        :
                        "red"
                      }
                    >
                      {item.type}
                    </Tag>
                  </div>


                  <div>
                    ₹ {item.amount}
                  </div>

                  <div>
                    {item.date?.format(
                      "DD MMM YYYY"
                    )}
                  </div>


                  <Tag color="blue">
                    {item.recurrence}
                  </Tag>


                  {
                    item.description &&
                    <p>
                      {item.description}
                    </p>
                  }

                </Card>

              </Col>

            ))
          }
        </Row>
      }

    </Modal>
  );
};

export default IncomeExpenseModal;