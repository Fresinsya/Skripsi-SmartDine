import { Select } from 'flowbite-react';
import React, { useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { FaFileImage } from "react-icons/fa6";
import { useMutation } from 'react-query';

const postGambar = async (image, id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/editProfile/menu/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(image),
    });
    const data = await response.json();
    return data;
}


const PotoMenu = ({ imgBaru, setImgBaru, updateMenuAvatar, avatar }) => {

    const [showModal, setShowModal] = useState(false);
    const [modalSize, setModalSize] = useState('md');
    const [image, setImage] = useState(null);

    const handleImgUpload = (e) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
            const img = document.getElementById("imgBaru");
            img.src = event.target.result;
            // console.log(event.target.result)
        };

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const newImages = reader.result;
            setImage(newImages);
            setImgBaru(newImages);
            updateMenuAvatar(newImages);
            // setBase64Images(newImages);
            // setBarang({ ...barang, image: newImages });
            // console.log({ newImages });
        };

    };


    const id = localStorage.getItem('id')

    const { mutate } = useMutation({
        mutationKey: "uploadGambar",
        mutationFn: () => postGambar({ image }, id),

        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log(data)
        }
    });

    // console.log(imgBaru)

    const uploadGambar = async (e) => {
        // mutate()
        setShowModal(false)
    }

    return (
        <div >
            <button className='bg-primary p-3 rounded-full z-20 absolute right-[535px] top-[280px]'
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

                        <div className="relative w-1/3 my-6 mx-auto ">
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
                                        <img id='imgBaru' src={imgBaru || avatar} alt="" className='w-20 h-20 rounded-full' />
                                        
                                    </div>
                                    <div className='flex justify-center mt-3 mb-2'>
                                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
                                    </div>
                                    <div className='flex justify-center w-full '>
                                        <div className=''>
                                            <input onChange={handleImgUpload} name='avatar' class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
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
                                        onClick={uploadGambar}
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
        </div>
    )
}

export default PotoMenu