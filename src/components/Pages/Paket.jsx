import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../Fragments/Navbar';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IoIosArrowBack } from "react-icons/io";

const postRandom = async (bahan) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/generate?search=${bahan}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

const getRandom = async (id, day, paket) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/random/${id}/${day}/${paket}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};
const getBahan = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meal/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

const Paket = () => {
    const { selectedDay, paketName } = useParams();
    // const [selectedDay, setSelectedDay] = useState("1");
    const [random, setRandom] = useState({});
    const [filteredMenu, setFilteredMenu] = useState([]);

    const id = localStorage.getItem('id');
    const { isLoading, isError, data } = useQuery({
        queryKey: ["random"],
        queryFn: () => getRandom(id, selectedDay, paketName),

    });

    // console.log(data)

    const { isLoading: lodingBahan, data: bahan } = useQuery({
        queryKey: ["bahan", id],
        queryFn: () => getBahan(id),
        // refetchIntervalInBackground: 1000,

    });

    // useEffect(() => {
    //     if (!lodingBahan) {
    //         const dataBahan = bahan.data.bahan.map(bahan => bahan.nama).join(', ');
    //         console.log(dataBahan)
    //     }
    // }, [bahan, lodingBahan]);




    // console.log(filteredMenu)
    // console.log(random)
    // console.log(selectedDay)

    // useEffect(() => {
    //     if (data) {
    //         const filterData = data.data;
    //         const bahanPokok = filterData.flatMap(menu => menu.menus.filter(menu => menu.day === "1"));
    //         setFilteredMenu(bahanPokok);
    //     }
    // }, [data]);

    // useEffect(() => {
    //     if (data && selectedDay) {
    //         const filterData = data.data.menus;
    //         const bahanPokok = filterData.filter(menu => menu.menus[0].day === selectedDay.toString());
    //         setFilteredMenu(bahanPokok);
    //         console.log(filteredMenu)
    //     }
    // }, [data, selectedDay]);

    useEffect(() => {
        if (data) {
            setFilteredMenu(data.data.menus);
        }
    }, [data]);

    console.log(filteredMenu)

    const handleBack = () => {
        window.location.href = '/meal';
    }




    return (
        <div className="flex bg-primary h-screen overflow-x-hidden overflow-y-auto min-h-[645px]">
            <Navbar />
            <div className="flex-grow bg-white min-h-screen md:h-screen md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
                <div className="bg-white p-3 rounded-4xl flex-col justify-center">
                    <div className='flex'>
                        <button onClick={handleBack} className='z-30 flex'>
                            <IoIosArrowBack className="flex text-3xl text-primary ml-3 mt-3" />
                            <p className="font-bold text-sm flex justify-center mt-4 text-primary">back</p>
                        </button>
                    </div>
                    {/* <h1 className="font-bold text-2xl ml-6 ">Meal-Planning</h1> */}
                    {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
                    {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
                    <h1 className='mt-16 md:ml-36 ml-4'>Detail Menu Harian</h1>
                    <div className="flex justify-center gap-10 z-auto md:mx-8">
                        <div className='border-primary border-4 rounded-2xl mt-5 w-[80%] md:h-[259px] h-fit'>
                            <p className='border-2 w-32 rounded-3xl p-2 m-9 border-b-primary border-l-primary font-bold flex item-center justify-center bg-white'>
                                {selectedDay ? `Day ${selectedDay}` : 'Select Day'}
                            </p>
                            {selectedDay && (
                                <div className='md:flex grid justify-center gap-10 z-auto mx-8'>
                                    <div className='flex-col items-center justify-center z-30 w-full '>
                                        <p className='ml-8'>Makanan pokok</p>
                                        <Link to={`/detail/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[0]?.id_menu : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[0]?.kalori_modif : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[0]?.berat_modif : ""}/${selectedDay}/${paketName}`} >
                                            <button type='button' className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>
                                                {filteredMenu && filteredMenu.length > 0 ? filteredMenu[0]?.menu : ""}
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='z-30 w-full'>
                                        <p className='ml-8'>Lauk pauk</p>
                                        <Link to={`/detail/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[1]?.id_menu : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[1]?.kalori_modif : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[1]?.berat_modif : ""}/${selectedDay}/${paketName}`} >
                                            <button type='button' className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>
                                                {filteredMenu && filteredMenu.length > 0 ? filteredMenu[1]?.menu : ""}
                                            </button>
                                        </Link>
                                    </div>
                                    <div className='z-30 w-full mb-4'>
                                        <p className='ml-8'>Sayuran</p>
                                        <Link to={`/detail/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[2]?.id_menu : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[2]?.kalori_modif : ""}/${filteredMenu && filteredMenu.length > 0 ? filteredMenu[2]?.berat_modif : ""}/${selectedDay}/${paketName}`} >
                                            <button type='button' className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>
                                                {filteredMenu && filteredMenu.length > 0 ? filteredMenu[2]?.menu : ""}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paket;
