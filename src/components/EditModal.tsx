import React, { useState } from "react";
import { Status, Role } from "../type_declarations/types";
import "../styles/EditModal.css";

interface EditModalProps {
  item: any;
  onSave: (editedItem: any) => void;
  onClose: () => void;
}

const nonEditableKeys = ["id", "registeredAt", "createdAt", "updatedAt"];

const EditModal: React.FC<EditModalProps> = ({ item, onSave, onClose }) => {
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    setEditedItem({ ...editedItem, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(editedItem);
    onClose();
  };

  return (
    <div className="edit-modal-content">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(editedItem).map((key) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            {nonEditableKeys.includes(key) ? (
              <input
                type="text"
                id={key}
                name={key}
                value={editedItem[key]}
                disabled
              />
            ) : key === "status" ? (
              <select
                id={key}
                name={key}
                value={editedItem[key]}
                onChange={handleChange}
              >
                {Object.values(Status).map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : key === "role" ? (
              <select
                id={key}
                name={key}
                value={editedItem[key]}
                onChange={handleChange}
              >
                {Object.values(Role).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            ) : typeof editedItem[key] === "boolean" ? (

                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={editedItem[key]}
                  onChange={handleChange}
                />

            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={editedItem[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditModal;
