import React, { useEffect, useState } from 'react'
import Navbar from '../Fragments/Navbar'
// import { GrValidate } from 'react-icons/gi';
import EditProfile from '../Fragments/EditProfile';
import PotoProfile from '../Fragments/PotoProfile';
import { useMutation, useQuery } from 'react-query';
import { GrValidate } from "react-icons/gr";

const getProfile = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}
const getRiwayat = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}

const Profile = () => {
    const [user, setUser] = useState({})
    const [riwayat, setRiwayat] = useState({})

    const id = localStorage.getItem('id')
    const { isLoading, isError, data } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(id),

    });
    // console.log(user)

    useEffect(() => {
        if (!isLoading) {
            setUser(data.data);
        }
    }, [data, isLoading]);


    const { isLoading: isLoadingRiwayat, data: dataRiwayat } = useQuery({
        queryKey: ["riwayat"],
        queryFn: () => getRiwayat(id),

    });
    console.log(riwayat)

    useEffect(() => {
        if (!isLoadingRiwayat) {
            setRiwayat(dataRiwayat.data);
        }
    }, [dataRiwayat, isLoadingRiwayat]);

    return (
        <>
            <div className="flex bg-primary h-screen overflow-x-hidden overflow-y-auto">
                <Navbar />
                <div className="flex-grow bg-white md:min-h-screen h-fit md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
                    <div className=" p-3 rounded-4xl flex-col justify-center mb-10">
                        <h1 className="font-bold text-2xl ml-6">User Profile</h1>
                        {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div>
                        <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
                        <div className='md:ml-8  md:mr-12 mr-4 mb-16'>
                            <p className='md:text-base font-bold ml-6 mt-8'>Monitoring</p>
                            <div className='grid md:grid-cols-4 lg:grid-cols-5 grid-cols-1'>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>Kalori</p>
                                            <p className='font-semibold mx-auto'>{user ? user.kaloriHarian + ' Kkal' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>Usia</p>
                                            <p className='font-semibold mx-auto'>{user ? user.usia + ' Tahun' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>Tinggi</p>
                                            <p className='font-semibold mx-auto'>{user ? user.tinggiBadan + ' cm' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>Berat</p>
                                            <p className='font-semibold mx-auto'>{user ? user.beratBadan + ' kg' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>BMR</p>
                                            <p className='font-semibold mx-auto'>{riwayat ? riwayat.BMR + ' Kkal' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>TDEE</p>
                                            <p className='font-semibold mx-auto'>{riwayat ? riwayat.TDEE : "-"}</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className=''>
                                <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1'>
                                    <div>
                                        <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                            <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                            <div className='flex flex-col justify-center items-center w-[50%]'>
                                                <p className='text-non-aktif font-bold text-sm'>TDEE</p>
                                                <p className='font-semibold mx-auto'>{riwayat ? riwayat.TDEE + ' Kkal' : "-"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-3 md:ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <p className='text-non-aktif font-bold text-sm'>Status gizi</p>
                                            <p className='font-semibold mx-auto'>{riwayat ? riwayat.NObeyesdad : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mb-[7px] my-10'>
                            <p className='text-lg font-bold ml-20'>Biodata</p>
                            <div className='md:flex-row flex flex-col justify-center items-center gap-20 mt-6'>
                                <div>
                                    <img src={user ? user.avatar : 'https://res.cloudinary.com/dd8tyaph2/image/upload/v1716126670/profilr_zwq5dq.png'} alt="" className=' w-48 h-48 rounded-2xl' />
                                    <PotoProfile data={user} />
                                </div>
                                <div className='bg-[#6a87e585] md:w-[50%] w-full rounded-2xl py-6 px-7'>
                                    <div className='grid md:grid-cols-1 lg:grid-cols-2 grid-cols-1  my-3'>
                                        <div className='border border-primary bg-white rounded-xl mx-2 mb-2 px-3 py-3'>
                                            <p className='font-bold text-sm'>Nama :</p>
                                            <p className='font-medium '>{user ? user.nama : ""}</p>
                                        </div>
                                        <div className='border border-primary bg-white rounded-xl mx-2 mb-2 px-3 py-3'>
                                            <p className='font-bold text-sm'>Email :</p>
                                            <p className='font-medium '>{user ? user.email : ""}</p>
                                        </div>
                                        <div className='border border-primary bg-white rounded-xl mx-2 mb-2 px-3 py-3'>
                                            <p className='font-bold text-sm'>No. Handphone :</p>
                                            <p className='font-medium '>{user ? user.telepon : "-"}</p>
                                        </div>
                                        <div className='border border-primary bg-white rounded-xl mx-2 mb-2 px-3 py-3'>
                                            <p className='font-bold text-sm'>Alamat :</p>
                                            <p className='font-medium '>{user ? user.alamat : "-"}</p>
                                        </div>
                                    </div>
                                    {/* <div className='grid md:grid-cols-2 my-3'>
                                    </div> */}
                                    <div className='flex justify-end w-[90%] mt-6'>
                                        <EditProfile data={user} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div >
        </>
    )
}

export default Profile