import React, { useEffect, useState } from "react";
import "./settings.css";
import { Avatar, Button, Input, Upload, Select, Divider, Modal, Image } from "antd";
import { CameraOutlined, DeleteOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { getApiData } from "../../shared/api/get-api-data";

const { TextArea } = Input;

const Settings: React.FC = () => {
    const [fields, setFields] = useState<any[]>([]);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [profileFile, setProfileFile] = useState<File | null>(null);
    const [qrImage, setQrImage] = useState<string | null>(null);
    const [qrFile, setQrFile] = useState<File | null>(null);
    const [showImg, setShowImg] = useState<boolean>(false);
    const [form, setForm] = useState<Record<string, any>>({});
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await getApiData({
                    endpoint: "/billbot/settingsData",
                    payload: { id: 7 },
                });
                const rows = response.data.rows;
                setFields(rows);
                const initialForm = rows.reduce((acc: any, item: any) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {});
                setForm(initialForm);
                const profile = rows.find(
                    (item: any) => item.key === "profileImage"
                );
                const qr = rows.find(
                    (item: any) => item.key === "upiQrCode"
                );
                if (profile) {
                    setProfileImage(
                        "http://localhost:8080" + profile.value
                    );
                }
                if (qr) {
                    setQrImage(
                        "http://localhost:8080" + qr.value
                    );
                }
            } catch (e) {
                console.warn(e);
            }
        };
        fetchSettings();
    }, []);

    const onChange = (key: string, value: any) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const submitSettings = async () => {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            const field = fields.find((item) => item.key === key);
            if (field?.type !== "IMAGE") {
                formData.append(key, value as string);
            }
        });
        formData.append("id", "7");
        if (profileFile) {
            formData.append("profileImage", profileFile);
        }
        if (qrFile) {
            formData.append("upiQrCode", qrFile);
        }
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try{
            const response = await getApiData({
                endpoint: "/billbot/settingsData",
                payload: {},
            });
        }catch(e){
            console.warn(e)
        }
    };

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
                                setProfileFile(file);
                                setProfileImage(URL.createObjectURL(file));
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

                    {fields.filter((field) => field.key !== "profileImage"&& field.key !== "upiQrCode").map((field) => (
                        <div
                            className={
                                field.type === "TEXTAREA"
                                    ? "field fullWidth"
                                    : "field"
                            }
                            key={field.key}
                        >
                            <label>{field.label}</label>

                            {field.type === "IMAGE" ? (
                                    <img
                                        src={"http://localhost:8080" + field.value}
                                        alt={field.label}
                                        style={{
                                            width: 120,
                                            height: 120,
                                            objectFit: "cover",
                                            borderRadius: 8
                                        }}
                                    />

                                ) : field.type === "TEXTAREA" ? (
                                <TextArea
                                    rows={4}
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(e) =>
                                        onChange(field.key, e.target.value)
                                    }
                                />
                            ) : field.type === "SELECT" ? (
                                <Select
                                    value={form[field.key as keyof typeof form]}
                                    onChange={(value) =>
                                        onChange(field.key, value)
                                    }
                                    options={field.options}
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
                </div>
                <div className="field fullWidth">
                <label>UPI QR Code</label>
                <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                        setQrFile(file);
                        setQrImage(URL.createObjectURL(file));
                        return false;
                    }}
                >
                    <Button>
                        Upload QR Code
                    </Button>
                </Upload>
                {qrImage && (
                    <div style={{ marginTop: 12 }}>

                        <img
                            src={qrImage}
                            alt="QR Code"
                            style={{
                                width:120,
                                height:120,
                                objectFit:"cover",
                                borderRadius:8
                            }}
                        />

                        <br />

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => setQrImage(null)}
                            style={{marginTop:8}}
                        >
                            Delete
                        </Button>

                    </div>
                )}
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