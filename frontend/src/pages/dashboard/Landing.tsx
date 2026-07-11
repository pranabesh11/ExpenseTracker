import {
  Button,
  Card,
  Col,
  Row,
  Typography,
  Statistic,
} from "antd";
import {
  WalletOutlined,
  BarChartOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const { Title, Paragraph } = Typography;

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="landing-navbar">
        <h2>BillBot</h2>

        <Button type="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </header>

      {/* Main Content */}
      <section className="landing-content">

        {/* Left Side */}
        <div className="landing-left">
          <Title className="hero-title">
            Take Control of Every Rupee You Spend.
          </Title>

          <Paragraph className="hero-description">
            BillBot is your personal expense management assistant that helps
            you record expenses, analyze spending habits, generate reports and
            stay financially organized—all from one simple dashboard.
          </Paragraph>

            <div className="stats">
                <Statistic
                    title={<span style={{ color: "white" }}>Expense Tracking</span>}
                    value="24 × 7"
                    valueStyle={{ color: "#fff" }}
                />
                <Statistic
                    title={<span style={{ color: "white" }}>Reports</span>}
                    value="Real-time"
                    valueStyle={{ color: "#fff" }}
                />
                <Statistic
                    title={<span style={{ color: "white" }}>Security</span>}
                    value="100%"
                    suffix="Private"
                    valueStyle={{ color: "#fff" }}
                />
            </div>
        </div>

        {/* Right Side */}
        <div className="landing-right">
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <Card className="feature-card">
                <WalletOutlined className="feature-icon" />
                <Title level={5}>Expense Tracking</Title>
                <Paragraph>
                  Record daily income and expenses effortlessly.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card className="feature-card">
                <BarChartOutlined className="feature-icon" />
                <Title level={5}>Analytics</Title>
                <Paragraph>
                  Visual reports to understand spending patterns.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card className="feature-card">
                <DollarCircleOutlined className="feature-icon" />
                <Title level={5}>Budget Planning</Title>
                <Paragraph>
                  Set budgets and monitor your monthly goals.
                </Paragraph>
              </Card>
            </Col>

            <Col span={12}>
              <Card className="feature-card">
                <SafetyCertificateOutlined className="feature-icon" />
                <Title level={5}>Secure Access</Title>
                <Paragraph>
                  Protected authentication with secure sessions.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

      </section>
    </div>
  );
};

export default Landing;