import { Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { FaFileImage } from "react-icons/fa6";
import { useMutation } from 'react-query';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgDanger } from 'react-icons/cg';
import Loading from './Loading';

const postGambar = async (image, id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_VERCEL_URL}/editProfile/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image),
    });
    const data = await response.json();
    return data;
}


const PotoProfile = ({ data }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalSize, setModalSize] = useState('md');
    const [isLogin, setIsLogin] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [showNotificationGagal, setShowNotificationGagal] = useState(false);
    const [image, setImage] = useState(null);

    const handleImgUpload = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
            const img = document.getElementById("preview-img");
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImages = reader.result;
            setImage(newImages);
            // setBase64Images(newImages);
            // setBarang({ ...barang, image: newImages });
            // console.log({ newImages });
        };
    };

    const id = localStorage.getItem('id')

    const { mutate, isLoading } = useMutation({
        mutationKey: "uploadGambar",
        mutationFn: () => postGambar({ image }, id),

        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
            setShowNotification(true);
            window.location.reload();
        }
    });



    const uploadGambar = async (e) => {
        mutate()
        setShowModal(false)
    }

    const handleGagal = () => {
        setShowNotificationGagal(true);
        // setRedirecting(true);
    };

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

    return (
        <>
        {isLoading && <Loading />}
            <button className='bg-primary p-3 z-50 rounded-full ml-40  bottom-32'
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaPencilAlt color='white' size={15} />
            </button>
            {showModal ? (
                <div className=''>

                    <div
                        className="justify-center z-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                    >

                        <div className="relative w-2/3 md:w-1/3 my-6 mx-auto ">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-xl flex justify-center w-full font-bold">
                                        Foto Profile
                                    </h3>
                                </div>
                                <div className='my-3'>
                                    <div className='flex justify-center'>
                                        <img src={data.avatar} id='preview-img' alt="" className='w-20 h-20 rounded-full' />
                                    </div>
                                    <div className='flex justify-center mt-3 mb-2'>
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                                    </div>
                                    <div className='flex justify-center items-center w-full px-3 '>
                                        <div className=''>
                                            <input onChange={handleImgUpload} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                        </div>
                                    </div>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit" className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={isLogin ? handleGagal : uploadGambar}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
            {showNotification && (

                <div class="flex fixed z-50 item-center top-5 right-2 md:ml-0 p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                    <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                    <div>
                        <span class="flex items-center h-auto m-2 font-medium">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.</span>
                    </div>
                </div>

            )}
            {showNotificationGagal && (
                <div class="flex fixed items-center z-50 top-5 right-2 p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                    <CgDanger className='text-2xl m-2' />
                    <div>
                        <span class="font-medium m-2">silahkan login terlebih dahulu atau lengkapi data profile anda.</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default PotoProfile