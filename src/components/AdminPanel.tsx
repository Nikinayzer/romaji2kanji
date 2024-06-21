import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import "../styles/AdminPanel.css";

import ApiService from "../api/apiService";
import EditModal from "./EditModal";
import Pagination from "./Pagination";

// Enum for tabs
enum Tab {
  USERS = "users",
  WORDS = "words",
  WORDS_SUGGESTIONS = "words_suggestions",
  REPORTS = "reports",
}

const AdminPanel: React.FC = () => {
  // Redux hooks and state initialization
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();

  // State variables
  const [activeTab, setActiveTab] = useState(Tab.USERS);
  const [content, setContent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: any[] = [];
        switch (activeTab) {
          case Tab.USERS:
            data = await ApiService.fetchAllUsers();
            break;
          case Tab.WORDS:
            data = await ApiService.fetchAllWords();
            break;
          case Tab.WORDS_SUGGESTIONS:
            // Handle words suggestions if needed
            break;
          case Tab.REPORTS:
            // Handle reports if needed
            break;
          default:
            data = [];
            break;
        }
        setContent(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setContent([]);
      }
    };

    fetchData();
  }, [activeTab]);

  // Handle edit button click
  const handleEdit = (item: any) => {
    setEditingItem(item);
  };

  // Handle save action in modal
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

  // Calculate pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  // Handle pagination click
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to render details based on the active tab
  const renderDetails = (item: any) => {
    switch (activeTab) {
      case Tab.USERS:
        return (
          <div className="details">
            <div className="detail-row"><strong>Username:</strong> {item.username}</div>
            <div className="detail-row"><strong>Role:</strong> {item.role}</div>
            <div className="detail-row"><strong>Registered At:</strong> {item.registeredAt}</div>
            <div className="detail-row"><strong>Updated At:</strong> {item.updatedAt}</div>
          </div>
        );
      case Tab.WORDS:
        return (
          <div className="details">
            <div className="detail-row"><strong>English:</strong> {item.english}</div>
            <div className="detail-row"><strong>Kana:</strong> {item.kana}</div>
            <div className="detail-row"><strong>Kanji:</strong> {item.kanji}</div>
            <div className="detail-row"><strong>Is Katakana:</strong> {item.isKatakana ? "Yes" : "No"}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel">
        {/* Tab menu */}
        <div className="admin-panel-menu">
          <ul>
            {Object.values(Tab).map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab as Tab)}
              >
                {tab.replace(/_/g, ' ')} {/* Display tab name with spaces */}
              </li>
            ))}
          </ul>
        </div>
        {/* Content section */}
        <div className="admin-panel-content">
          <div className="admin-panel-search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          {/* List of items */}
          <ul className="admin-panel-content-list">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <li key={item.id} className="content-item">
                  {/* Render different fields based on active tab */}
                  {renderDetails(item)}
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </li>
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
          {/* Pagination component */}
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={content.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      {/* Edit modal */}
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
