import React, { useEffect, useState } from 'react'

const SuksesMenu = (props) => {
    const { title, onClick, selectedOptions} = props;
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleSaveChange = () => {
        setShowNotification(true);
        setShowModal(true);
        onClick(selectedOptions);
        // onClick2()

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

    return (
        <>
            <button
                className='bg-primary flex items-center gap-2  hover:border-blue-400 active:border border-2 text-white z-20 font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none  '
                type="button"
                onClick={() => {handleSaveChange()}}

            >
                {title}
            </button>
            {showModal ? (
                <div className='absolute z-50'>

                    {showNotification && (

                        <div className="flex fixed z-50  top-5 overla right-2 p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
                            </div>
                        </div>

                    )}

                </div>
            ) : null}

        </>

    )
}

export default SuksesMenu