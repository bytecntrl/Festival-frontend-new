import React from 'react';

interface PageButtonProps {
    pageNumber: number;
    isActive: boolean;
    onClick: () => void;
}
  
export default function PageButton({ pageNumber, isActive, onClick }: PageButtonProps) {
    return (
        <button
            type="button"
            className={`btn btn-primary ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {pageNumber}
        </button>
    );
}