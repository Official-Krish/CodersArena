  "use client"
import { signOut } from "next-auth/react";
  import { useState, useRef, useEffect } from "react";

  const Avatar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);  
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
  
    const handleClickOutside = (event : MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };
  
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
  
    return (
        <div className="relative inline-block text-left">
            <div>
                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                    />
                </button>
            </div>
            {dropdownOpen && (
                <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
                        <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => signOut()}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};
  
  
  
export default Avatar;