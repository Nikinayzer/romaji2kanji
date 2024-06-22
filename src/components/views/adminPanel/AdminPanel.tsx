import React, { useState, useEffect } from "react";

import "../../../styles/adminPanel.scss";
import ApiService from "../../../api/apiService";
import Modal from "../../Modal";
import EditModal from "../../EditModal";
import Pagination from "../../Pagination";
import { getEnumString, formatDateTime } from "../../../util/util"; // Adjust the import path as necessary
import { ROLE, TAB } from "../../../type_declarations/types";
import Spinner from "../../spinner/Spinner";
import { useAppSelector } from "../../../redux/hooks";
import { useToast, ToastType, Position } from "../../toastFactory/ToastContext";
const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TAB.USERS);
  const [content, setContent] = useState<any[]>([]);
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({ key: "", direction: "" });
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data: any[] = [];
        switch (activeTab) {
          case TAB.USERS:
            data = await ApiService.fetchAllUsers();
            break;
          case TAB.WORDS:
            data = await ApiService.fetchAllWords();
            break;
          // case TAB.WORDS_SUGGESTIONS:
          //   data = [];
          //   break;
          case TAB.REPORTS:
            data = await ApiService.fetchAllReports();
            break;
          default:
            data = [];
            break;
        }
        setContent(data);
        setFilteredContent(data); // Initialize filteredContent with fetched data
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setContent([]);
        setFilteredContent([]);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, [activeTab]);

  useEffect(() => {
    // Perform filtering whenever searchTerm changes
    const filteredData = content.filter((item) =>
      Object.entries(item).some(([key, value]) =>
        isTimestampKey(key)
          ? isTimestampMatch(value, searchTerm)
          : isValueMatch(value, searchTerm)
      )
    );
    setFilteredContent(filteredData);
  }, [content, searchTerm]);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const validate = (item: any): boolean => {
    // if (item.name.trim() === "") {
    //   console.error("Name is required.");
    //   return false;
    // }
    // if (item.age < 18) {
    //   console.error("Age must be at least 18.");
    //   return false;
    // }

    return true;
  };

  const handleSave = async (updatedItem: any) => {
    try {
      const isValid = validate(updatedItem);

      if (!isValid) {
        console.error("Validation failed. Item not saved.");
        return;
      }
      let response;
      switch (activeTab) {
        case TAB.USERS:
          response = await ApiService.updateUser(updatedItem);
          break;
        case TAB.WORDS:
          response = await ApiService.updateWord(updatedItem);
          break;
        case TAB.REPORTS:
          response = await ApiService.updateReport(updatedItem);
          break;
        default:
          throw new Error("Unsupported tab type");
      }

      const savedItem = response;
      setContent((prevContent) =>
        prevContent.map((item) => (item.id === savedItem.id ? savedItem : item))
      );
      setFilteredContent((prevFilteredContent) =>
        prevFilteredContent.map((item) =>
          item.id === savedItem.id ? savedItem : item
        )
      );
      setEditingItem(null);
      setShowModal(false);
      showToast("Item saved successfully.", ToastType.SUCCESS, Position.BOTTOM_RIGHT);
    } catch (error) {
      showToast("Failed to save the item.", ToastType.ERROR, Position.BOTTOM_RIGHT);
      console.error("Failed to save the item.", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredContent].sort((a, b) => {
      if (isTimestampKey(key)) {
        // Custom sorting for timestamps
        const timestampA = new Date(a[key]).getTime();
        const timestampB = new Date(b[key]).getTime();
        return direction === "ascending"
          ? timestampA - timestampB
          : timestampB - timestampA;
      } else {
        // Default sorting for other keys
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      }
    });

    setFilteredContent(sortedData);
  };

  const isTimestampKey = (key: string): boolean => {
    // Define your logic to identify timestamp keys here
    const timestampKeys = ["createdAt", "updatedAt", "registeredAt"]; // Example: consider these as timestamp keys
    return timestampKeys.includes(key);
  };

  const isTimestampMatch = (value: any, searchTerm: string): boolean => {
    // Define your logic to check if a timestamp matches the search term
    const timestamp = new Date(value).toLocaleString(); // Example: convert timestamp to a searchable string format
    return timestamp.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const isValueMatch = (value: any, searchTerm: string): boolean => {
    // Default matching logic for non-timestamp values
    return (
      value !== null &&
      value !== undefined &&
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatTimestampToString = (timestamp: string): string => {
    return formatDateTime(timestamp);
  };

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel">
        <div className="admin-panel-menu">
          <ul>
            {Object.values(TAB).map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab as TAB)}
              >
                {tab.replace(/_/g, " ")}
              </li>
            ))}
          </ul>
        </div>
        <div className="admin-panel-content">
          <div className="admin-panel-search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="admin-panel-toolbar">
              <button onClick={() => requestSort("id")}>
                Sort by ID {sortConfig.direction === "ascending" ? "↑" : "↓"}
              </button>
            </div>
          </div>
          <ul className="admin-panel-content-list">
            {loading ? (
              <Spinner /> // Show spinner when loading
            ) : currentItems.length > 0 ? (
              currentItems.map((item) => (
                <li key={item.id} className="content-item">
                  <div className="details">
                    {Object.keys(item).map((key) => (
                      <div key={key} className="detail-row">
                        <strong>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </strong>{" "}
                        {key === "role"
                          ? getEnumString(ROLE, item[key])
                          : isTimestampKey(key)
                          ? formatTimestampToString(item[key])
                          : !(item[key] === "" || item[key] === null)
                          ? item[key]
                          : "N/A"}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </li>
              ))
            ) : (
              <li>No items found.</li>
            )}
          </ul>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredContent.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <EditModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminPanel;
