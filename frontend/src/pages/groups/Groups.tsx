import React, { useEffect, useState } from "react";
import "./groups.css";
import { Avatar, Button, Dropdown, Input, type MenuProps } from "antd";
import { MoreOutlined, PlusOutlined, SearchOutlined, SendOutlined } from "@ant-design/icons";

const groups = [
  { id: 1, name: "React Developers", lastMessage: "Hey everyone!" },
  { id: 2, name: "Expense Tracker", lastMessage: "Update completed." },
  { id: 3, name: "College Friends", lastMessage: "Let's meet tomorrow." },
];
const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "View Group",
  },
  {
    key: "2",
    label: "Mute",
  },
  {
    key: "3",
    label: "Delete Chat",
  },
];

const Groups: React.FC = () => {
    const [selectedGroup, setSelectedGroup] = useState(groups[0]);
    const [mobileView, setMobileView] = useState(window.innerWidth < 992);
    const [showChat, setShowChat] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
    {
        id: 1,
        sender: "received",
        text: "Hello 👋",
    },
    {
        id: 2,
        sender: "sent",
        text: "Hi! How are you?",
    },
    {
        id: 3,
        sender: "received",
        text: "I'm doing great. This is a dummy WhatsApp conversation. Feel free to send a new message.",
    },
    ]);
    const sendMessage = () => {
  if (!input.trim()) return;

  setMessages((prev) => [
        ...prev,
        {
        id: Date.now(),
        sender: "sent",
        text: input,
        },
    ]);
        setInput("");
    };

  useEffect(() => {
    const resize = () => {
      const mobile = window.innerWidth < 992;
      setMobileView(mobile);

      if (!mobile) {
        setShowChat(false);
      }
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const openChat = (group: typeof groups[0]) => {
    setSelectedGroup(group);
    if (mobileView) {
      setShowChat(true);
    }
  };

  return (
    <div className="groupsContainer">
      {(!mobileView || !showChat) && (
        <div className="groupList">
            <div className="groupHeader">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                >
                    Create Group
                </Button>
                <Button
                    type="primary"
                    icon={<SearchOutlined/>}
                >
                    Search
                </Button>
            </div>

          {groups.map((group) => (
            <div
                key={group.id}
                className={`groupItem ${
                    selectedGroup.id === group.id ? "active" : ""
                }`}
                onClick={() => openChat(group)}
            >
                <Avatar size={48}>
                    {group.name.charAt(0)}
                </Avatar>
                <div className="groupInfo">
                    <div className="groupName">{group.name}</div>
                    <div className="lastMessage">{group.lastMessage}</div>
                </div>
            </div>
          ))}
        </div>
      )}

      {(!mobileView || showChat) && (
        <div className="chatWindow">
          {mobileView && (
            <Button
              className="backButton"
              onClick={() => setShowChat(false)}
            >
              ← Back
            </Button>
          )}

            <div className="chatHeader">
                <div className="chatHeaderLeft">
                    <Avatar size={45}>
                    {selectedGroup.name.charAt(0)}
                    </Avatar>
                    <h3>{selectedGroup.name}</h3>
                </div>
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={["click"]}
                >
                    <Button
                    type="text"
                    icon={<MoreOutlined />}
                    />
                </Dropdown>
            </div>
            <div className="messages">
                <div className="messagesContent">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </div>
          <div className="chatInput">
            <Button>+</Button>

            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onPressEnter={sendMessage}
                placeholder="Type a message..."
                className="messageInput"
            />

            <Button
                type="primary"
                onClick={sendMessage}
            >
                <SendOutlined />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;