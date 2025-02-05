import React from "react";

const UnitSelector = ({ label, value, unit, onUnitChange, options}) => {
    return (
        <div className="flex items-center gap-2 hover:border-gray-400">
            <span className="me-auto">{label}</span>
            <div className="px-4">
                <span>{value}</span>
                <select
                    className="p-2 bg-white focus:outline-none hover:cursor-pointer"
                    onChange={(e) => onUnitChange(e.target.value)}
                    value={unit}
                >
                    {options.map((option) => (
                        <option key = {option.value} value = {option.value}>
                            {option.label}
                        </option>
                    ))}

                </select>
            </div>
        </div>
    );
};

export default UnitSelector;