import React from 'react';

interface NavbarProps {
    appName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ appName = 'My App' }) => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg rounded-b-lg">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="text-white text-3xl font-extrabold tracking-tight">
                    {appName}
                </div>

                <div className="space-x-8">
                    <a
                        href="#"
                        className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 ease-in-out"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 ease-in-out"
                    >
                        Features
                    </a>
                    <a
                        href="#"
                        className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 ease-in-out"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="text-white text-lg font-medium hover:text-blue-200 transition duration-300 ease-in-out"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;