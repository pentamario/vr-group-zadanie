import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const useToggleIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

    // ✅ Toggles the dropdown state
    const toggleDropdown = () => setIsOpen(!isOpen);

    // ✅ Returns the appropriate icon
    const Icon = isOpen ? ChevronUp : ChevronDown;

    return { isOpen, toggleDropdown, Icon };
};

export default useToggleIcon;
