import { Label, Select } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import Input from '../elements/input/Input';
import Dropdown from '../elements/input/Dropdown';
import { useMutation, useQuery } from 'react-query';
import Sukses from '../elements/button/Sukses';

const putProfile = async (id, profile) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    });
    const hasil = await response.json();
    return hasil;
}


const ModalDataRiwayat = (props) => {
    const { children, id, title, title2, onChange, name, value } = props;
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    }

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showModal]);

    return (
        <div>
            <button
                htmlFor={id}
                className='block md:text-sm text-xs font-medium text-gray-900 dark:text-white'
                type="button"
                onClick={() => setShowModal(true)}
            >
                {title}
            </button>

            {showModal ? (
                <div className='fixed inset-0 z-50 flex items-center justify-center border'>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <div
                        ref={modalRef}
                        className="relative w-2/5 md:w-1/3 my-6 mx-auto z-50"
                    >
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-3 border-b border-solid border-gray-400 rounded-t">
                                <h3 className="text-xl flex justify-center w-full font-bold">
                                    {title2}
                                </h3>
                            </div>
                            <div className='p-5'>
                                <p className='px-3' dangerouslySetInnerHTML={{ __html: props.detail }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* <label htmlFor={id} className="block md:text-sm text-xs font-medium text-gray-900 dark:text-white">
                {title}
            </label> */}
            <select defaultValue="" value={value}
                className="bg-white overflow-x-auto border-x-transparent border-t-transparent border-b-blue-700 border-2 text-gray-900 md:text-sm text-xs rounded-lg w-full focus:bg-white focus:border-b-primary focus:border-x-transparent focus:border-t-transparent focus:ring-transparent"
                onChange={onChange} name={name}
                id={id}
            >
                {children}
            </select>
        </div>
    )
}

export default ModalDataRiwayat