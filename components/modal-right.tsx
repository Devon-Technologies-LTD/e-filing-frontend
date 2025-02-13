import React from "react";

interface RightSidebarModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // Allow UI to be passed as props
}

const RightSidebarModal: React.FC<RightSidebarModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    return (
        <div
            className={`fixed inset-0 flex justify-end transition-opacity z-50 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            onClick={onClose}
        >
            <div
                className={`w-2/6 bg-white h-screen p-6 shadow-lg transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default RightSidebarModal;
