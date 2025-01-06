import React from 'react';
import Dropdown from './Dropdown';

const Navbar = ({ onStartDrawing, onCoordinateOptionSelect }) => {
    return (
        <nav className="flex justify-between items-center bg-white p-4 px-6 shadow-md">
            <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">My Map App</span>
            </div>

            {/* ✅ Dropdown for Drawing Options */}
            <Dropdown
                options={['Two Endpoints', 'Three Endpoints']}
                label="Draw Options"
                onSelect={(option) => {
                    if (option === 'Two Endpoints') onStartDrawing(2);
                    else if (option === 'Three Endpoints') onStartDrawing(3);
                }}
            />

            {/* ✅ Dropdown for Coordinate Input Options */}
            <Dropdown
                options={['Two Coordinates', 'Three Coordinates']}
                label="Input Coordinates"
                onSelect={onCoordinateOptionSelect} // ✅ Controlled by the MapComponent
            />
        </nav>
    );
};

export default Navbar;
