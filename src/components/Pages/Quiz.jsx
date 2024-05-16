import React, { useEffect, useState } from 'react'
import Navbar from '../Fragments/Navbar'
import Makan from '../Fragments/quiz/makan';
import Fisik from '../Fragments/quiz/Fisik';
import { useMutation, useQuery } from 'react-query';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgDanger } from 'react-icons/cg';

const postRiwayat = async ({ riwayat, id, kondisi }) => {
    if (kondisi === null) {

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/`, {
            method: 'POST',
            body: JSON.stringify(riwayat),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return data;
    }
    else {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(riwayat),
        });

        const data = await response.json();
        return data;
    }
}

const getRiwayatByUserId = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}


const Quiz = () => {
    const [modalSize, setModalSize] = useState('md');
    const [isLogin, setIsLogin] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationGagal, setShowNotificationGagal] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [Tanggal, setTanggal] = useState('');


    const id = localStorage.getItem('id');

    const [riwayat, setRiwayat] = useState({
        FACV: '',
        FCVC: '',
        NCP: '',
        CAEC: '',
        CH20: '',
        SCC: '',
        FAF: '',
        TUE: '',
        CALC: '',
        MTRANS: '',
        NObeyesdad: '',
        IdUser: id || '',
    });



    // console.log(localStorage.getItem('id'));


    const { mutate, isError, isLoading } = useMutation({
        mutationKey: 'riwayat',
        mutationFn: postRiwayat,
        onError: (error) => {
            console.log('Error:', error);
            setShowNotificationGagal(true);
        },
        onSuccess: (data) => {
            console.log('Riwayat berhasil!', data);
            setShowNotification(true);
            // localStorage.setItem('activeNav', '/profile');
            // window.location.href = "/profile"; 
        }
    });

    const { data } = useQuery({
        queryKey: ["riwayat"],
        queryFn: () => getRiwayatByUserId(id),
    });

    useEffect(() => {
        if (!isLoading) {
            setRiwayat(data);
        }
    }, [data, isLoading]);

    const handleChange = (event) => {
        const id = localStorage.getItem('id');
        setRiwayat({
            ...riwayat,
            [event.target.name]: event.target.value,
            IdUser: id || '', // Memastikan bahwa IdUser tidak kosong
        });
    }

    useEffect(() => {
        const id = localStorage.getItem('id');
        setRiwayat(prevState => ({
            ...prevState,
            IdUser: id || '', // Memastikan bahwa IdUser tidak kosong
        }));
    }, []);
    console.log('Updated riwayat:', riwayat);




    const currentDate = new Date().toISOString().split('T')[0];
    const handleSukses = async (event) => {
        const tglSelesai = new Date(riwayat.data.tgl_selesai).toISOString().split('T')[0];
        console.log(tglSelesai, currentDate, isLogin);
        // try {
            // if (riwayat && riwayat.data && riwayat.data.tgl_selesai) {
            //     const history = riwayat.data.tgl_selesai;
            //     console.log(history);
            // } else {
            //     console.log("Data riwayat tidak lengkap atau tidak tersedia.");
            // }

            // const isDatePassed = (dateString) => {
            //     const currentDate = new Date();
            //     const dateFromDatabase = new Date(dateString);
            //     return currentDate > dateFromDatabase; // Perubahan dibuat di sini
            // };

            // const databaseDate = new Date(history);
            // const datePassed = isDatePassed(databaseDate);

            // if (datePassed && isLogin === true) {
            //     setShowNotification(true);
            //     await mutate();
            // } else {
            //     setShowNotificationGagal(true);

            // }
            //     const dataKirim = {riwayat : riwayat, id : id, kondisi : data.data};
            //     console.log("datakirim",dataKirim)
            //     await mutate(dataKirim);
            // } catch (error) {
            //     console.error("Error:", error);
            //     setShowNotificationGagal(true);
            // }
            if (tglSelesai <= currentDate && isLogin === true) {
                const dataKirim = { riwayat: riwayat, id: id, kondisi: data.data };
                console.log("datakirim", dataKirim)
                await mutate(dataKirim);
                // setRedirecting(true);
            } else {
                // setShowNotificationGagal(true);
                console.log("gagaggaggaggagagaggagagag")
            }
        }

    // console.log(riwayat.data.tgl_selesai);


    useEffect(() => {
            const loginStatus = localStorage.getItem("isLogin");
            setIsLogin(loginStatus === "true");
        }, []);


        useEffect(() => {
            let timeout;
            if (showNotification) {
                timeout = setTimeout(() => {
                    setShowNotification(false);
                }, 2000); // 5000 milidetik = 5 detik
            }
            return () => clearTimeout(timeout);
        }, [showNotification]);

        useEffect(() => {
            let timeout;
            if (showNotificationGagal) {
                timeout = setTimeout(() => {
                    setShowNotificationGagal(false);
                    setTimeout(() => {
                        if (redirecting) {
                            window.location.href = "/login";
                        }
                    }, 1000);
                }, 2000); // 5000 milidetik = 5 detik
            }

            // Membersihkan timer jika komponen di-unmount atau pemberitahuan disembunyikan
            return () => clearTimeout(timeout);
        }, [showNotificationGagal]);

        useEffect(() => {
            const formatDate = (isoDate) => {
                const date = new Date(isoDate);
                const day = date.getDate().toString().padStart(2, '0'); // Mendapatkan hari (DD)

                // Mendapatkan nama bulan berdasarkan indeks bulan
                const monthIndex = date.getMonth();
                const monthNames = [
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                ];
                const month = monthNames[monthIndex];

                const year = date.getFullYear(); // Mendapatkan tahun (YYYY)

                return `${day} ${month} ${year}`;
            };

            const history = riwayat?.data?.tgl_selesai;
            console.log(history);

            if (history) {
                const formattedDate = formatDate(history);
                setTanggal(formattedDate);
            }
        }, [riwayat]);


        // console.log(riwayat)

        return (
            <>
                <div className="flex bg-primary h-screen overflow-x-hidden overflow-y-auto">
                    <Navbar />
                    <div className="flex-grow bg-white h-fit md:h-screen ml-20 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
                        <div className="p-3 rounded-4xl flex-col justify-center">
                            <h1 className="font-bold text-2xl ml-6">Kebiasaan User</h1>
                            {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-pri fixed z-20 top-0 right-0"></div> */}
                            {/* <div className="w-[calc(100%-6rem)] h-[[calc(100%-5rem)]] bg-transparent border-[16px] border-red-700 fixed z-20 top-4 right-4 rounded-2xl"></div> */}
                            <div className=' ml-4 md:ml-20 lg:ml-32 mt-6'>
                                <p className='font-bold mt-4 md:text-lg border border-primary w-fit px-3 rounded-lg'>Periode : {Tanggal}</p>
                            </div>
                            <div className='flex gap-8 justify-center mt-1 '>
                                <div className='bg-[#6a87e5bc] rounded-2xl h-auto mt-2 mx-3 mb-[10px] w-3/4 px-3 py-1'>
                                    <Fisik riwayat={riwayat} handleChange={handleChange} handleSukses={handleSukses} />
                                </div>
                                {/* <div className='bg-[#6a87e5bc] rounded-2xl mt-8 mx-2 mb-[23px] px-5 py-1'>
                                <Makan riwayat={riwayat} handleChange={handleChange} handleSukses={handleSukses} />
                            </div> */}
                            </div>
                        </div>
                    </div>

                </div>
                {showNotification && (

                    <div class="flex fixed z-50 item-center top-5 right-[400px] p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                        <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                        <div>
                            <span class="flex items-center h-auto m-2 font-medium">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.</span>
                        </div>
                    </div>

                )}
                {showNotificationGagal && (
                    <div class="flex fixed items-center z-50 top-5 right-[400px] p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                        <CgDanger className='text-2xl m-2' />
                        <div>
                            <span class="font-medium m-2">silahkan login terlebih dahulu atau lengkapi data profile anda.</span>
                        </div>
                    </div>
                )}
                {/* </div > */}
            </>
        )
    }

    export default Quiz