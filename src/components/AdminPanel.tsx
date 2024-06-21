import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import "../styles/AdminPanel.css";

import EditModal from "./EditModal";
import Pagination from "./Pagination";

// Template data for testing
const userTemplateData = [
  { id: 1, username: "user1", role: "admin", registeredAt: "2022-01-01T00:00:00Z", updatedAt: "2022-01-02T00:00:00Z" },
  { id: 2, username: "user2", role: "user", registeredAt: "2022-01-03T00:00:00Z", updatedAt: "2022-01-04T00:00:00Z" },
  // More user data...
];
const wordTemplateData = [
  { id: 1, english: "hello", kana: "こんにちは", kanji: "今日は", isKatakana: false },
  { id: 2, english: "cat", kana: "ねこ", kanji: "猫", isKatakana: false },
  // More word data...
];

for (let i = 3; i <= 150; i++) {
  userTemplateData.push({
    id: i,
    username: `user${i}`,
    role: i % 2 === 0 ? "user" : "admin",
    registeredAt: `2022-01-${(i % 30) + 1}T00:00:00Z`,
    updatedAt: `2022-01-${((i + 1) % 30) + 1}T00:00:00Z`,
  });
}


for (let i = 3; i <= 50; i++) {
  wordTemplateData.push({
    id: i,
    english: `word${i}`,
    kana: `かな${i}`,
    kanji: `漢字${i}`,
    isKatakana: i % 2 === 0,
  });
}

enum Tab {
  USERS = "users",
  WORDS = "words",
  WORDS_SUGGESTIONS = "words_suggestions",
  REPORTS = "reports",
}

const AdminPanel: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState(Tab.USERS);
  const [content, setContent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      let data: any[];
      switch (activeTab) {
        case Tab.USERS:
          data = userTemplateData;
          break;
        case Tab.WORDS:
          data = wordTemplateData;
          break;
        case Tab.REPORTS:
          //data = reportsTemplateData;
          data = wordTemplateData;
          break;
        default:
          data = [];
          break;
      }
      setContent(data);
    };

    fetchData();
  }, [activeTab]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/${activeTab.toLowerCase()}/${editingItem.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingItem),
      });
      const updatedItem = await response.json();
      setContent((prevContent) =>
        prevContent.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
      setEditingItem(null);
    } catch (error) {
      console.error("Failed to save the item.", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel">
        <div className="admin-panel-menu">
          <ul>
            <li
              className={activeTab === Tab.USERS ? "active" : ""}
              onClick={() => setActiveTab(Tab.USERS)}
            >
              Users
            </li>
            <li
              className={activeTab === Tab.WORDS ? "active" : ""}
              onClick={() => setActiveTab(Tab.WORDS)}
            >
              Words
            </li>
            <li
              className={activeTab === Tab.WORDS_SUGGESTIONS ? "active" : ""}
              onClick={() => setActiveTab(Tab.WORDS_SUGGESTIONS)}
            >
              Words Suggestions
            </li>
            <li
              className={activeTab === Tab.REPORTS ? "active" : ""}
              onClick={() => setActiveTab(Tab.REPORTS)}
            >
              Reports
            </li>
          </ul>
        </div>
        <div className="admin-panel-content">
          <div className="admin-panel-search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <ul className="admin-panel-content-list">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <li key={item.id}>
                  {item.username || item.english}
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </li>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={content.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      {editingItem && (
        <EditModal
          item={editingItem}
          setItem={setEditingItem}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminPanel;
