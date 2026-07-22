import React, { useState } from "react";
import "./settings.css";
import {
    Avatar,
    Button,
    Input,
    Upload,
    Select,
    Divider,
    Modal,
    Image 
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
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [showImg, setShowImg] = useState<boolean>(false);
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
    const submitSettings = ()=>{
        console.log(profileImage, form, qrImage)
    }

    return (
        <div className="settingsPage">

            <div className="settingsCard">

                <h1>Profile Settings</h1>

                <div className="avatarSection">

                    <Avatar
                        size={130}
                        src={profileImage || undefined}
                        icon={!profileImage && <UserOutlined />}
                    />

                    <div className="avatarActions">

                        <Button
                            icon={<EyeOutlined />}
                            onClick={()=>setShowImg(true)}
                        >
                            View
                        </Button>

                        <Upload
                            showUploadList={false}
                            beforeUpload={(file) => {
                                const imageUrl = URL.createObjectURL(file);
                                setProfileImage(imageUrl);
                                return false;
                            }}
                        >
                            <Button icon={<CameraOutlined />}>
                                Update
                            </Button>
                        </Upload>

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={()=>setProfileImage(null)}
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

                        <Upload
                            showUploadList={false}
                            beforeUpload={(file) => {
                                const imageUrl = URL.createObjectURL(file);
                                setQrImage(imageUrl);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}>
                                Upload QR Code
                            </Button>
                        </Upload>

                        {qrImage && (
                            <div style={{ marginTop: 12 }}>
                                <img
                                    src={qrImage}
                                    alt="Selected"
                                    style={{
                                        width: 120,
                                        height: 120,
                                        objectFit: "cover",
                                        borderRadius: 8,
                                        border: "1px solid #ddd",
                                        display: "block",
                                        marginBottom: 8,
                                    }}
                                />

                                <Button
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    onClick={() => setQrImage(null)}
                                >
                                    Remove Image
                                </Button>
                            </div>
                        )}

                    </div>

                </div>

                <Divider />

                <div className="footerButtons">

                    <Button>
                        Cancel
                    </Button>

                    <Button type="primary" onClick={submitSettings}>
                        Save Changes
                    </Button>

                </div>

            </div>
            <Modal
                open={showImg}
                onCancel={() => setShowImg(false)}
                footer={null}
                centered
                maskClosable={false}
            >
                {profileImage ? (
                    <Image
                        width="100%"
                        alt="Profile"
                        src={profileImage}
                    />
                ) : (
                    <div style={{ textAlign: "center" }}>
                        No profile image selected
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Settings;