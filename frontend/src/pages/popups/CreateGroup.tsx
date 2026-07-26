import React, { useMemo, useRef, useState } from "react";
import "./CreateGroup.css";
import { DeleteOutlined } from "@mui/icons-material";

export interface Member {
  id: number;
  name: string;
  avatar?: string;
}

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  isOpen,
  onClose,
  members,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [groupName, setGroupName] = useState("");
const [groupImage, setGroupImage] = useState<string | null>(null);
const [search, setSearch] = useState("");
const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

const filteredMembers = useMemo(() => {
  return members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) &&
      !selectedMembers.find((m) => m.id === member.id)
  );
}, [members, search, selectedMembers]);

if (!isOpen) return null;

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setGroupImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setGroupImage(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const addMember = (member: Member) => {
    setSelectedMembers((prev) => [...prev, member]);
    setSearch("");
  };

  const removeMember = (id: number) => {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="cg-overlay">
      <div className="cg-popup">

        <div className="cg-header">
          <h2>Create Group</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="cg-content">

          <div className="cg-image-section">

            {groupImage ? (
              <div className="cg-preview">

                <img src={groupImage} alt="Group" />

                <button
                    className="cg-delete-image"
                    onClick={removeImage}
                >
                    <DeleteOutlined />
                </button>

              </div>
            ) : (
              <div
                className="cg-upload-box"
                onClick={() => fileRef.current?.click()}
              >
                +
                <span>Upload Group Image</span>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />

          </div>

          <div className="cg-field">

            <label>Group Name</label>

            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />

          </div>

          <div className="cg-field cg-search-field">

            <label>Add Members</label>

            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && filteredMembers.length > 0 && (
              <div className="cg-search-list">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="cg-search-item"
                    onClick={() => addMember(member)}
                  >
                    <div className="cg-avatar">
                      {member.avatar ? (
                        <img src={member.avatar} alt="" />
                      ) : (
                        member.name.charAt(0)
                      )}
                    </div>

                    <span>{member.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>

          {selectedMembers.length > 0 && (
            <div className="cg-selected">

              <h4>Selected Members</h4>

              <div className="cg-chip-wrapper">

                {selectedMembers.map((member) => (
                  <div key={member.id} className="cg-chip">

                    <span>{member.name}</span>

                    <button onClick={() => removeMember(member.id)}>
                      ✕
                    </button>

                  </div>
                ))}

              </div>

            </div>
          )}

        </div>

        <div className="cg-footer">

          <button className="cg-cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="cg-create">
            Create Group
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreateGroup;