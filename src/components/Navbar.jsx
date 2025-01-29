// Navbar.jsx (Updated)
import React from 'react';
import Dropdown from './Dropdown';
import { Axis3d , Earth } from 'lucide-react';

const Navbar = ({ onStartDrawing, onCoordinateOptionSelect }) => {
    return (
        <aside className="flex flex-col items-center justify-start bg-white p-2 shadow-md h-screen fixed">
            <div className="p-3 bg-blue-500 mb-2 rounded-lg">
                <Earth size={30} stroke="white" />
            </div>
            <button onClick={() => onStartDrawing(2)} className="p-2 bg-blue-500 hover:bg-blue-400 rounded-lg">
                <Axis3d stroke="white" />
            </button>
        </aside>

    );
};

export default Navbar;
