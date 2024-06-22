import React, { useState } from "react";
import { ROLE, STATE, APP_MODE } from "../type_declarations/types";
import "../styles/editModal.scss";

interface EditModalProps {
  item: any;
  onSave: (editedItem: any) => void;
  onClose: () => void;
}

const nonEditableKeys = ["id","username", "registeredAt", "createdAt", "updatedAt","createdBy", "reportedWordId", "reportedWord", "inputValue", "appMode", "variant"];

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

  const renderInput = (key: string, value: any) => {
    if (nonEditableKeys.includes(key)) {
      return (
        <input
          type="text"
          id={key}
          name={key}
          value={value}
          disabled
        />
      );
    }

    if (typeof value === "boolean") {
      return (
        <input
          type="checkbox"
          id={key}
          name={key}
          checked={value}
          onChange={handleChange}
        />
      );
    }

    if (isEnumKey(key)) {
      return (
        <select
          id={key}
          name={key}
          value={value}
          onChange={handleChange}
        >
          {getEnumOptions(key).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    // Default to text input for other types
    return (
      <input
        type="text"
        id={key}
        name={key}
        value={value}
        onChange={handleChange} 
        required
      />
    );
  };

  const enumKeys: Set<string> = new Set(["state", "role","appMode"]); //IMPORTANT

  const isEnumKey = (key: string): boolean => {
    return enumKeys.has(key);
  };

  const getEnumOptions = (key: string): string[] => {
    // Example: Return enum options based on key
    switch (key) {
      case "appMode":
        return Object.values(APP_MODE);
      case "role":
        return Object.values(ROLE);
      case "state":
        return Object.values(STATE);
      default:
        return [];
    }
  };

  return (
    <div className="edit-modal-content">
      <h2>Edit Item</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(editedItem).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}:
            </label>
            {renderInput(key, value)}
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditModal;
