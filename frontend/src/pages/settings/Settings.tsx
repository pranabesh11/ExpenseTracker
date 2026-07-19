import React, { useState } from "react";
import "./settings.css";
import {
    Avatar,
    Button,
    Input,
    Upload,
    Select,
    Divider,
} from "antd";
import {
    CameraOutlined,
    DeleteOutlined,
    EyeOutlined,
    UploadOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;

const dummyFields = [
    { key: "firstName", label: "First Name", value: "Pranab", type: "text" },
    { key: "lastName", label: "Last Name", value: "Pratihar", type: "text" },
    { key: "nickname", label: "Nickname", value: "Piku", type: "text" },
    { key: "email", label: "Email", value: "pranab@email.com", type: "email" },
    { key: "phone", label: "Phone", value: "+91 9876543210", type: "text" },
    { key: "upiId", label: "UPI ID", value: "pranab@ybl", type: "text" },
    { key: "address", label: "Address", value: "Kolkata, West Bengal", type: "text" },
    { key: "currency", label: "Currency", value: "INR", type: "select" },
    { key: "language", label: "Language", value: "English", type: "select" },
    {
        key: "about",
        label: "About",
        value: "Love tracking expenses with friends.",
        type: "textarea",
    },
];

const Settings: React.FC = () => {
    const [form, setForm] = useState(
        dummyFields.reduce(
            (acc, item) => ({
                ...acc,
                [item.key]: item.value,
            }),
            {}
        )
    );

    const onChange = (key: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="settingsPage">

            <div className="settingsCard">

                <h1>Profile Settings</h1>

                <div className="avatarSection">

                    <Avatar
                        size={130}
                        icon={<UserOutlined />}
                    />

                    <div className="avatarActions">

                        <Button
                            icon={<EyeOutlined />}
                        >
                            View
                        </Button>

                        <Button
                            icon={<CameraOutlined />}
                        >
                            Update
                        </Button>

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>

                    </div>

                </div>

                <Divider />

                <div className="settingsGrid">

                    {dummyFields.map((field) => (
                        <div
                            className={
                                field.type === "textarea"
                                    ? "field fullWidth"
                                    : "field"
                            }
                            key={field.key}
                        >
                            <label>{field.label}</label>

                            {field.type === "textarea" ? (
                                <TextArea
                                    rows={4}
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(e) =>
                                        onChange(field.key, e.target.value)
                                    }
                                />
                            ) : field.type === "select" ? (
                                <Select
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(value) =>
                                        onChange(field.key, value)
                                    }
                                    options={[
                                        {
                                            label: field.key === "currency"
                                                ? "INR"
                                                : "English",
                                            value: field.key === "currency"
                                                ? "INR"
                                                : "English",
                                        },
                                        {
                                            label: field.key === "currency"
                                                ? "USD"
                                                : "বাংলা",
                                            value: field.key === "currency"
                                                ? "USD"
                                                : "বাংলা",
                                        },
                                    ]}
                                />
                            ) : (
                                <Input
                                    type={field.type}
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(e) =>
                                        onChange(field.key, e.target.value)
                                    }
                                />
                            )}
                        </div>
                    ))}

                    <div className="field fullWidth">

                        <label>UPI QR Code</label>

                        <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>
                                Upload QR Code
                            </Button>
                        </Upload>

                    </div>

                </div>

                <Divider />

                <div className="footerButtons">

                    <Button>
                        Cancel
                    </Button>

                    <Button type="primary">
                        Save Changes
                    </Button>

                </div>

            </div>

        </div>
    );
};

export default Settings;