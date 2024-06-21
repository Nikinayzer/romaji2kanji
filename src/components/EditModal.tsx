import React from "react";

interface EditModalProps {
  item: any;
  setItem: (item: any) => void;
  handleSave: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, setItem, handleSave }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h2>Edit Item</h2>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setItem(null)}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;