import React, { useEffect, useState } from 'react'
import Navbar from '../Fragments/Navbar'
// import { GrValidate } from 'react-icons/gi';
import EditProfile from '../Fragments/EditProfile';
import PotoProfile from '../Fragments/PotoProfile';
import { useMutation, useQuery } from 'react-query';
import { GrValidate } from "react-icons/gr";
import Modal from '../Fragments/Modal';
import ModalLabel from '../Fragments/ModalLabel';

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
    const [label, setLabel] = useState('')

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
        if (!isLoadingRiwayat && dataRiwayat && dataRiwayat.data) {
            setRiwayat(dataRiwayat.data);
            if (dataRiwayat.data.NObeyesdad !== null) {
                setLabel(dataRiwayat.data.NObeyesdad);
            }
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
                        <div className={`md:ml-14 md:mr-12 mr-4 md:mt-12 mb-8  ${label === '' ? 'hidden' : ''}`}>
                            <p className='md:text-base font-bold  mt-8 mb-4'>Skala Kondisi Tubuh</p>
                            <div className={`flex gap-2`}>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Insufficient_Weight' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel 
                                    title={"Insufficient_weight"} 
                                    title2={"Kekurangan Berat Badan"} 
                                    detail={"Kekurangan berat badan adalah kondisi di mana seseorang memiliki berat badan yang berada di bawah rentang berat badan yang dianggap sehat untuk tinggi badan tertentu."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Normal_Weight' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Normal_weight"}
                                    title2={"Berat Badan Normal"}
                                    detail={"Berat badan normal adalah kondisi di mana seseorang memiliki berat badan yang berada di rentang berat badan yang dianggap sehat untuk tinggi badan tertentu."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Overweight_Level_I' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Overweight_Level_I"}
                                    title2={"Kegemukan Level I"}
                                    detail={"Overweight level 1 adalah kondisi di mana seseorang memiliki berat badan yang berada di atas rentang berat badan yang dianggap sehat untuk tinggi badan tertentu."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Overweight_Level_II' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Overweight_Level_II"}
                                    title2={"Kegemukan Level II"}
                                    detail={"Overweight level 2 adalah kondisi di mana seseorang memiliki berat badan yang berada di atas rentang berat badan yang dianggap sehat untuk tinggi badan tertentu, dan kegemukan level 2 sudah mendekati pada tingkat obesitas tipe 1."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Obesity_Type_I' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Obesity_Type_I"}
                                    title2={"Obesitas Tipe I"}
                                    detail={"Obesitas kelas 1 adalah kondisi di mana seseorang memiliki berat badan yang berada di atas rentang berat badan yang dianggap sehat untuk tinggi badan tertentu, dan obesitas kelas 1 sudah masuk pada tingkat obesitas."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Obesity_Type_II' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Obesity_Type_II"}
                                    title2={"Obesitas Tipe II"}
                                    detail={"Obesitas kelas 2 adalah kondisi di mana seseorang memiliki berat badan yang berada di atas rentang berat badan yang dianggap sehat untuk tinggi badan tertentu, dan obesitas kelas 2 sudah masuk pada tingkat obesitas yang berat harus segera melakukan diet yang sehat."} />
                                </p>
                                <p className={`p-3 rounded-xl font-semibold ${label === 'Obesity_Type_III' ? 'bg-primary text-white' : 'bg-red-200 text-gray-500'}`}>
                                    <ModalLabel
                                    title={"Obesity_Type_III"}
                                    title2={"Obesitas Tipe III"}
                                    detail={"Obesitas kelas 3 adalah kondisi di mana seseorang memiliki berat badan yang berada di atas rentang berat badan yang dianggap sehat untuk tinggi badan tertentu, dan obesitas kelas 3 sudah masuk pada tingkat obesitas yang sangat berat harus segera melakukan diet yang sehat."} />
                                </p>
                            </div>
                        </div>
                        <div className='md:ml-8 md:mr-12 mr-4 mb-16'>
                            <p className='md:text-base font-bold ml-6 mt-8'>Monitoring</p>
                            <div className='grid md:grid-cols-4 lg:grid-cols-5 grid-cols-1'>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"Kalori"}
                                                title2={"Kalori Harian"}
                                                detail={"Kebutuhan kalori harian adalah jumlah energi yang diperlukan oleh tubuh seseorang untuk menjalankan fungsi-fungsi dasar dan aktivitas sehari-hari. Mengetahui dan memahami kebutuhan kalori harian Anda adalah langkah penting dalam menjaga kesehatan dan keseimbangan tubuh secara keseluruhan."}
                                            />
                                            <p className='font-semibold mx-auto'>{user ? user.kaloriHarian + " Kkal" : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"Usia"}
                                                title2={"Usia"}
                                                detail={"Usia adalah jumlah tahun yang telah dilalui sejak kelahiran seseorang. Usia memainkan peran penting dalam menentukan kebutuhan kalori harian seseorang, karena kebutuhan kalori harian seseorang akan berkurang seiring bertambahnya usia."}
                                            />
                                            <p className='font-semibold mx-auto'>{user ? user.usia + ' Tahun' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"Tinggi"}
                                                title2={"Tinggi Badan"}
                                                detail={"Tinggi badan adalah jarak vertikal dari kepala hingga ujung kaki seseorang. Tinggi badan memainkan peran penting dalam menentukan kebutuhan kalori harian seseorang, karena kebutuhan kalori harian seseorang akan berkurang seiring bertambahnya usia."}
                                            />
                                            <p className='font-semibold mx-auto'>{user ? user.tinggiBadan + ' cm' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"Berat"}
                                                title2={"Berat Badan"}
                                                detail={"Berat badan adalah jumlah massa tubuh seseorang. Berat badan memainkan peran penting dalam menentukan kebutuhan kalori harian seseorang, karena kebutuhan kalori harian seseorang akan berkurang seiring bertambahnya usia."}
                                            />
                                            <p className='font-semibold mx-auto'>{user ? user.beratBadan + ' kg' : "-"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"BMR"}
                                                title2={"Basal Metabolic Rate (BMR)"}
                                                detail={"Basal Metabolic Rate (BMR) merupakan perhitungan dari pengukuran jumlah kalori yang dibutuhkan oleh tubuh untuk tetap berfungsi atau bekerja saat kita sedang istirahat seperti detak jantung, bernafas, dan aktivitas otak. BMR berkontribusi besar dalam perhitungan pengeluaran kalori harian pada tubuh. "}
                                            />
                                            <p className='font-semibold mx-auto'>{riwayat && riwayat.BMR !== undefined ? riwayat.BMR + ' Kkal' : '-'}</p>
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
                                                <Modal
                                                    title={"TDEE"}
                                                    title2={"Total Daily Energy Expenditure (TDEE)"}
                                                    detail={"Total Daily Energy Expenditure (TDEE) adalah total jumlah kalori yang dibakar oleh tubuh Anda dalam satu hari. Ini mencakup semua kalori yang digunakan untuk mempertahankan fungsi dasar tubuh, mencerna makanan, dan melakukan aktivitas fisik. Mengetahui TDEE adalah kunci untuk mengelola berat badan dan kesehatan secara keseluruhan, karena ini memberi Anda gambaran tentang berapa banyak energi yang Anda butuhkan setiap hari."} />
                                                <p className='font-semibold mx-auto'>{riwayat && riwayat.TDEE !== undefined ? riwayat.TDEE + ' Kkal' : '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex items-center border border-primary rounded-3xl h-16 ml-3 md:ml-4 mt-4 justify-center gap-2'>
                                        <div className='bg-primary rounded-full w-10 h-10 flex items-center justify-center'><GrValidate color='white' size={25} /></div>
                                        <div className='flex flex-col justify-center items-center w-[50%]'>
                                            <Modal
                                                title={"Kondisi Tubuh"}
                                                title2={"Kondisi Tubuh"}
                                                detail={"Obesitas atau kelebihan berat badan merupakan masalah kesehatan yang dapat menyerang siapa saja. Menurut penelitian di beberapa jurnal peer-review, obesitas dapat dipengaruhi oleh banyak faktor, tetapi yang paling penting adalah gaya hidup dan pola makan. Obesitas seharusnya tidak hanya dianggap sebagai akibat dari gaya hidup yang tidak sehat, tetapi obesitas merupakan penyakit yang dapat memicu munculnya penyakit berbahaya lainnya. Terdapat 7 kondisi tubuh sebagai berikut:<br/> 1. Kekurangan berat badan <br/> 2. Berat badan normal <br/> 3. Overweight level 1 <br/> 4. Overweight level 2 <br/> 5. Obesitas kelas 1 <br/> 6. Obesitas kelas 2 <br/> 7. Obesitas kelas 3 "}
                                            />
                                            <p className='font-semibold mx-auto'>{riwayat && riwayat.NObeyesdad !== undefined ? riwayat.NObeyesdad : '-'}</p>
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