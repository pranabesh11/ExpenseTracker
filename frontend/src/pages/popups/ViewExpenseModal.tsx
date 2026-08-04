import React from "react";
import { Modal, Card, Typography, Row, Col, Tag } from "antd";
import "./ViewExpenseModal.css";

const { Text } = Typography;

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
      width={540}
      centered
      title="Transaction Details"
    >
      {data && (
        <Card className="expense-details-card" bordered={false}>
          <Row gutter={[12, 16]}>
            <Col span={12}>
              <div className="info-item">
                <Text className="label">Category</Text>
                <Text strong>{data.category}</Text>
              </div>
            </Col>

            <Col span={12}>
              <div className="info-item">
                <Text className="label">Type</Text>
                <Tag color={data.type === "Income" ? "green" : "red"}>
                  {data.type}
                </Tag>
              </div>
            </Col>

            <Col span={12}>
              <div className="info-item">
                <Text className="label">Amount</Text>
                <Text className="amount">
                  ₹{data.amount.toLocaleString()}
                </Text>
              </div>
            </Col>

            <Col span={12}>
              <div className="info-item">
                <Text className="label">Date</Text>
                <Text>{data.date}</Text>
              </div>
            </Col>

            <Col span={12}>
              <div className="info-item">
                <Text className="label">Payment Mode</Text>
                <Text>{data.paymentMode}</Text>
              </div>
            </Col>

            <Col span={12}>
              <div className="info-item">
                <Text className="label">Status</Text>
                <Tag color="blue">{data.status || "Completed"}</Tag>
              </div>
            </Col>

            {/* Larger Description Section */}
            <Col span={24}>
              <div className="info-item description-section">
                <Text className="label">Description</Text>
                <div className="description">
                  {data.description || "-"}
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </Modal>
  );
};

export default ViewExpenseModal;