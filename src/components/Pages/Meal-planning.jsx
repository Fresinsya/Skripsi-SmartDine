import React, { useState, useEffect } from 'react';
// import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../Fragments/Navbar';
import { Link, unstable_HistoryRouter, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useMediaQuery } from '@react-hook/media-query';

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

const getRandom = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/random/${id}`, {
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

const Meal = () => {
    const [selectedDay, setSelectedDay] = useState("1");
    const [random, setRandom] = useState({});
    const [filteredMenu, setFilteredMenu] = useState([]);

    const id = localStorage.getItem('id');
    const { isLoading, isError, data } = useQuery({
        queryKey: ["random"],
        queryFn: () => getRandom(id),


    });

    console.log(data)

    const { isLoading: lodingBahan, data: bahan, refetch: reload } = useQuery({
        queryKey: ["bahan", id],
        queryFn: () => getBahan(id),
        refetchIntervalInBackground: 1000,

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

    useEffect(() => {

        if (data) {
            // window.location.reload();
            const filterData = data.data;
            const bahanPokok = filterData.flatMap(menu => menu.menus.filter(menus => menus.day === "1"));
            setFilteredMenu(bahanPokok);
            console.log(filteredMenu)
        }
    }, [data]);

    // useEffect(() => {
    //     if (data) {
    //         const filterData = data.data;
    //         const bahanPokok = filterData.flatMap(menu => menu.menus.filter(menus => menus.day.includes(selectedDay)));
    //         setFilteredMenu(bahanPokok);
    //         console.log(filteredMenu)
    //     }
    // }, [data, selectedDay]);


    useEffect(() => {
        if (data) {
            // Ambil objek hari berdasarkan selectedDay
            const selectedDayData = data[selectedDay - 1];
            if (selectedDayData) {
                // Ambil menu untuk hari yang dipilih
                const selectedDayMenus = selectedDayData.menus;
                setFilteredMenu(selectedDayMenus);
                console.log("day", selectedDayMenus)
            }
        }
    }, [data, selectedDay]);

    // const { day = 1 } = useParams();


    const handleDayClick = (selectedDay) => {

        const index = parseInt(selectedDay) - 1;
        setSelectedDay(selectedDay);
        if (data) {
            setFilteredMenu(data.data[index]?.menus);
            console.log("day", data.data[index]?.menus)
        }
        // window.location.href = `/meal/${selectedDay}`;
    };

    const handlePackageClick = () => {
        const startIndex = parseInt(selectedDay) + 2; // Index berdasarkan selectedDay + 2
        const selectedData = [];
        for (let i = startIndex; i < startIndex + 3; i++) {
            if (data && data.data[i]) {
                selectedData.push(...data.data[i].menus);
            }
        }
        // Menyimpan selectedData ke localStorage
        // localStorage.setItem('selectedData', JSON.stringify(selectedData));
    };




    const settings = {
        autoplay: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const days = ["1", "2", "3", "4", "5", "6", "7"];

    // useEffect(() => {
    //     if (location.pathname === '/meal') {
    //         window.location.reload();
    //     }
    // }, [location.pathname]);

    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <div className="flex bg-primary h-screen overflow-x-auto overflow-y-auto">
            <Navbar />
            <div className="flex-grow bg-white h-fit md:h-screen md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
                <div className=" p-3 rounded-4xl flex-col justify-center ">
                    <h1 className="font-bold text-2xl ml-6 ">Meal-Planning</h1>
                    {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
                    {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}

                    <div className="container md:mx-auto mt-10 md:bg-blue-300 lg:mt-8 md:mt-16  md:max-w-md lg:max-w-lg h-40 md:flex  justify-center rounded-3xl">
                        <div className=" md:ml-[1px] bg-blue-300 md:w-[85%] w-fit md:h-40 h-fit flex justify-center rounded-3xl">
                            {isDesktop ? (
                                <Slider {...settings} className=' w-[90%] h-40 flex justify-center items-center'>
                                    {days.map((day, index) => (
                                        // <div></div>
                                        // <div className='border-x-[30px] w-[20px] border-transparent' key={index}>
                                             <button
                                                type='button'
                                                className={`border-2 w-32 rounded-3xl p-4 border-primary md:text-xs ${selectedDay === day ? 'bg-primary text-white' : 'bg-white'}`}
                                                // onClick={() => setSelectedDay(day)}
                                                onClick={() => handleDayClick(day)}

                                            >
                                                Day {day}
                                            </button> 
                                        // </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="md:flex grid w-full justify-center mx-auto items-center py-4">
                                    {days.map((day, index) => (
                                        <div className='border-x-[30px] border-transparent' key={index}>
                                            <button
                                                type='button'
                                                className={`border-2 w-32 rounded-3xl my-1 border-primary ${selectedDay === day ? 'bg-primary text-white' : 'bg-white'}`}
                                                onClick={() => handleDayClick(day)}
                                            >
                                                Day {day}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className='md:mt-16 mt-40  md:ml-32'>Detail Menu Harian</h1>
                    <div className='border-primary border-4 rounded-2xl mt-5 md:mx-auto md:w-[70%] md:h-[259px]'>
                        <p className='border-2 w-32 rounded-3xl p-2 m-9 border-b-primary border-l-primary font-bold flex item-center justify-center bg-white'>
                            {selectedDay ? `Day ${selectedDay}` : 'Select Day'}
                        </p>
                        {selectedDay && (
                            <div className='md:flex grid md:justify-center md:gap-10 gap-2 z-auto mx-8'>
                                <div className='flex-col items-center justify-center z-30 w-full '>
                                    {/* <p className='ml-8'>Sarapan</p> */}
                                    <Link to={`/paket/${selectedDay}/1`}>
                                        <button
                                            type='button'
                                            className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>
                                            Paket 1
                                        </button>
                                    </Link>
                                </div>
                                <div className='z-30 w-full'>
                                    {/* <p className='ml-8'>Makan Siang</p> */}
                                    <Link to={`/paket/${selectedDay}/2`} >
                                        <button type='button' className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>Paket 2</button>
                                    </Link>
                                </div>
                                <div className='z-30 w-full mb-2'>
                                    {/* <p className='ml-8'>Makan Malam</p> */}
                                    <Link to={`/paket/${selectedDay}/3`}>
                                        <button type='button' className='border-2 w-full rounded-3xl p-4 border-primary bg-primary flex item-center justify-center text-white'>Paket 3</button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Meal;
