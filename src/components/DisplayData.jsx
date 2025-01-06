import React from 'react';

const DisplayData = ({ title, data, onChange }) => {
    return (
        <div>
            {/* ✅ Title Section */}
            <h3 className="text-lg font-semibold mb-3">{title}</h3>

            {/* ✅ Dynamically Display Data */}
            {data.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 mb-2">
                    <span className="font-medium">{item.label}:</span>
                    {onChange ? (
                        <input
                            type="text"
                            value={item.value}
                            onChange={(e) => onChange(index, e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    ) : (
                        <span className="p-2 bg-gray-100 rounded">{item.value}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DisplayData;
