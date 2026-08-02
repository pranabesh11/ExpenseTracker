import React from "react";
import { Modal, Card, Typography, Row, Col, Tag, Divider } from "antd";
import "./ViewExpenseModal.css";

const { Title, Text, Paragraph } = Typography;

export interface ExpenseData {
  id?: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  paymentMode: string;
  description: string;
  status?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  data: ExpenseData | null;
}

const ViewExpenseModal: React.FC<Props> = ({
  open,
  onClose,
  data,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={650}
      centered
      title="Transaction Details"
    >
      {data && (
        <Card className="expense-details-card" bordered={false}>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Text className="label">Category</Text>
              <Title level={5}>{data.category}</Title>
            </Col>

            <Col span={12}>
              <Text className="label">Type</Text>
              <br />
              <Tag color={data.type === "Income" ? "green" : "red"}>
                {data.type}
              </Tag>
            </Col>

            <Col span={12}>
              <Text className="label">Amount</Text>
              <Title level={4} style={{ color: "#1677ff" }}>
                ₹{data.amount.toLocaleString()}
              </Title>
            </Col>

            <Col span={12}>
              <Text className="label">Date</Text>
              <Title level={5}>{data.date}</Title>
            </Col>

            <Col span={12}>
              <Text className="label">Payment Mode</Text>
              <Title level={5}>{data.paymentMode}</Title>
            </Col>

            <Col span={12}>
              <Text className="label">Status</Text>
              <br />
              <Tag color="blue">{data.status || "Completed"}</Tag>
            </Col>
          </Row>

          <Divider />

          <div>
            <Text className="label">Description</Text>

            <Paragraph className="description">
              {data.description}
            </Paragraph>
          </div>
        </Card>
      )}
    </Modal>
  );
};

export default ViewExpenseModal;