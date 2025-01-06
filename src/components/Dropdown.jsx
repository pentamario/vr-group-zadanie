import React from 'react';
import useToggleIcon from '../hooks/useToggleIcon';

const Dropdown = ({ options, label = "Options", onSelect }) => {
    const { isOpen, toggleDropdown, Icon } = useToggleIcon(); 

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-between space-x-2"
            >
                {label}
                <Icon size={20} />
            </button>

            {/* ✅ Ensure onSelect is defined before calling */}
            {isOpen && (
                <div className="absolute mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                if (typeof onSelect === 'function') {
                                    onSelect(option);
                                } else {
                                    console.error("onSelect prop is not defined or not a function!");
                                }
                                toggleDropdown(); 
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-blue-100 transition duration-200"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
