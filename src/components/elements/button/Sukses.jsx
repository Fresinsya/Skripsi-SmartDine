import React, { useEffect, useState } from 'react'
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Sukses = (props) => {
    const { title, onClick2, selectedOptions} = props;
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleSaveChange = () => {
        setShowNotification(true);
        setShowModal(true);
        // onClick(selectedOptions);
        onClick2()

    };

    useEffect(() => {
        let timeout;
        if (showNotification) {
            timeout = setTimeout(() => {
                setShowNotification(false);
            }, 1000); // 5000 milidetik = 5 detik
        }
        return () => clearTimeout(timeout);
    }, [showNotification]);

    return (
        <>
            <button
                className='bg-primary flex items-center gap-2  hover:border-blue-400 active:border border-2 text-white z-20 font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none  '
                type="button"
                onClick={
                    () => {
                    handleSaveChange()
                    onClick2
                    }
                }

            >
                {title}
            </button>
            {showModal ? (
                <div className='absolute z-50'>

                    {showNotification && (

                        <div className="flex fixed z-50  top-5  right-2 items-center justify-center  p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                            <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                            {/* <span className="sr-only">Info</span> */}
                            {/* <span className="sr-only">Info</span> */}
                            <div>
                                <span className="md:font-medium md:text-base text-xs">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.</span>
                            </div>
                        </div>

                    )}

                </div>
            ) : null}

        </>

    )
}

export default Sukses