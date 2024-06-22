import React, { useEffect, useState } from "react";
import "../../styles/toast.scss"; // Ensure your CSS file path is correct
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export enum ToastType {
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    ERROR = "error",
}

export enum Position {
    TOP_CENTER = "top-center",
    BOTTOM_RIGHT = "bottom-right",
}

export interface ToastProps {
    message: string;
    type: ToastType;
    position: Position;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps & { id: string; autoHide: boolean; duration: number }> = ({
                                                                                               id,
                                                                                               message,
                                                                                               type,
                                                                                               position,
                                                                                               autoHide,
                                                                                               duration,
                                                                                               onClose,
                                                                                           }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (autoHide) {
            timer = setTimeout(() => {
                //setVisible(false);
                if (onClose) onClose();
            }, duration);
        }
        return () => clearTimeout(timer);
    }, [autoHide, duration, onClose]);

    const handleClose = () => {
        //setVisible(false);
        if (onClose) onClose();
    };

    return (
        <div className={`toast ${type} ${position} ${visible ? "show" : "hide"}`} onClick={handleClose}>
            <div className="toast-content">
                <div className="toast-message">{message}</div>
                {onClose && (
                    <button className="toast-close-button" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Toast;
