import React, { useEffect, useState } from 'react'
import { GoHomeFill } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdRestaurant } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { Alert } from 'flowbite-react';
import { useQuery } from 'react-query';
import { AiFillMessage } from "react-icons/ai";
import { Tooltip } from 'react-tooltip';
import { IoCheckmarkDoneCircle } from "react-icons/io5";



const getMeal = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/random/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}


const Navbar = () => {
    const [activeNav, setActiveNav] = useState(localStorage.getItem("activeNav") || null);
    const [redirecting, setRedirecting] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [menu, setMenu] = useState(false);

    const id = localStorage.getItem('id');
    const { isLoading, isError, data } = useQuery({
        queryKey: ["meal"],
        queryFn: () => getMeal(id),
    });

    // console.log("navbar",data)

    const hapusLocalStorage = () => {
        if (localStorage.getItem("isLogin") !== "false") {
            localStorage.removeItem("nama");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("id");
            localStorage.setItem("isLoggedOut", true);
            localStorage.setItem("isLogin", false);

            setRedirecting(true);
            setShowNotification(true);
            setShowModal(true);
            alert('Anda telah logout.');
        } else {
            localStorage.removeItem("nama");
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            localStorage.removeItem("id");
            localStorage.setItem("isLoggedOut", true);
            localStorage.setItem("isLogin", false);
            alert('Anda telah logout.');
        }
    };


    const handleClickMenu = () => {
        setMenu(!menu); // Toggle menu state
    }

    useEffect(() => {
        let timeout;
        if (showNotification) {
            timeout = setTimeout(() => {
                setShowNotification(false);
                if (redirecting) {
                    window.location.href = "/login";
                }
                if (redirecting) {
                    window.location.href = "/login";
                }
            }, 1000);
        }

        return () => clearTimeout(timeout);
    }, [showNotification, redirecting]);

    useEffect(() => {
        localStorage.setItem("activeNav", activeNav);
    }, [activeNav]);

    // Fungsi untuk menangani klik pada navbar
    const handleNavClick = (navItem) => {
        setActiveNav(navItem);
    };

    const handleNavClickMeal = (nav) => {
        if (data.data.length > 0) {
            localStorage.setItem("activeNav", "/meal");
            window.location.href = "/meal";
        } else {
            alert("Fitur Meal Planning belum diaktifkan");
        }

    };



    return (
        <nav>
            <div className="md:w-20 w-14 h-screen text-white fixed flex flex-col justify-evenly items-center">
                {/* <div className="h-[15%] flex flex-col justify-center">
                    <a
                        href="#"
                        onClick={() => handleNavClick("#")} // Fixed missing parentheses
                        className={`flex items-center space-x-2 ${activeNav === "#" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}


                    >
                        <TiThMenu size={20} />
                    </a>
                </div> */}
                <div className="h-[70%] flex flex-col justify-center items-center gap-12 mt-[10%]">
                    <a data-tooltip-id="Home" data-tooltip-content="Home"
                        href="/"
                        onClick={() => handleNavClick("/")}
                        // Menambahkan kelas "border border-white" jika activeNav adalah "/"
                        className={`flex items-center space-x-2 ${activeNav === "/" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}
                    >
                        <GoHomeFill size={20} />
                    </a>
                    <Tooltip id="Home" />

                    {/* profile */}
                    <a data-tooltip-id="Profil" data-tooltip-content="Profil"
                        href="/profile"
                        onClick={() => handleNavClick("/profile")}
                        className={`flex items-center space-x-2 ${activeNav === "/profile" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}

                    >
                        <FaUser size={20} />
                    </a>
                    <Tooltip id="Profil" />

                    {/* quiz */}
                    <a data-tooltip-id="Data Riwayat" data-tooltip-content="Data Riwayat"
                        href="/quiz"
                        onClick={() => handleNavClick("/quiz")}
                        className={`flex items-center space-x-2 ${activeNav === "/quiz" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}

                    >
                        <MdQuiz size={20} />
                    </a>
                    <Tooltip id="Data Riwayat" />

                    {/* menu */}
                    <a data-tooltip-id="Bahan Menu" data-tooltip-content="Bahan Menu"
                        href="/menu"
                        onClick={() => handleNavClick("/menu")}
                        className={`flex items-center space-x-2 ${activeNav === "/menu" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}
                    >

                        <FiShoppingBag size={20} />
                    </a>
                    <Tooltip id="Bahan Menu" />
                    <a data-tooltip-id="Meal-Planning" data-tooltip-content="Meal-Planning"
                        // href="/meal"
                        onClick={() => handleNavClickMeal("/meal")}
                        className={`flex items-center space-x-2 ${activeNav === "/meal" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}
                    >
                        <MdRestaurant size={20} />
                    </a>
                    <Tooltip id="Meal-Planning" />
                    
                </div>
                <div className="h-[30%] flex flex-col justify-center items-center gap-5">
                    
                    <a data-tooltip-id="About" data-tooltip-content="About"
                        href="/about"
                        onClick={() => handleNavClick("/about")}
                        className={`flex items-center space-x-2 ${activeNav === "/about" ? "border-2 p-2 border-[#B5D5FE] rounded-2xl" : ""}`}

                    >
                        <AiFillMessage size={20} />
                    </a>
                    <Tooltip id="About" />
                    <a data-tooltip-id="Logout" data-tooltip-content="Logout"
                        href="/login"
                        onClick={hapusLocalStorage}
                        className="flex items-center justify-center "
                    >
                        <LuLogOut size={20} />
                    </a>
                    <Tooltip id="Logout" />

                    {showModal ? (
                        <div className='absolute z-50'>
                            {showNotification && (
                                <div className="flex fixed z-50  top-5 right-2 p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                                    <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                                    {/* <span className="sr-only">Info</span> */}
                                    <div>
                                        <span className="font-medium">Logout akun berhasil.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
            {menu ? (
                <div className="w-40 h-screen text-white fixed flex flex-col justify-evenly items-center">
                    <div className="fixed z-50 top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50">
                        <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4">
                            <div className="flex justify-end">
                                <button onClick={() => setMenu(false)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                <a href="/" onClick={() => setActiveNav("/")} className={activeNav === "/" ? "active" : ""}>
                                    Home
                                </a>
                                <a href="/menu" onClick={() => setActiveNav("/menu")} className={activeNav === "/menu" ? "active" : ""}>
                                    Menu
                                </a>
                                <a href="/quiz" onClick={() => setActiveNav("/quiz")} className={activeNav === "/quiz" ? "active" : ""}>
                                    Quiz
                                </a>
                                <a href="/profile" onClick={() => setActiveNav("/profile")} className={activeNav === "/profile" ? "active" : ""}>
                                    Profile
                                </a>
                                <a href="/login" onClick={hapusLocalStorage}>
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </nav >

    )
}

export default Navbar
