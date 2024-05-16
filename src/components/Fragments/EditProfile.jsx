import { Label, Select } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
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


const EditProfile = ({ data }) => {
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState({
        nama: '',
        email: '',
        password: '',
        confirmPassword: '',
        alamat: '',
        usia: '',
        gender: '',
        telepon: '',
        tinggiBadan: '',
        beratBadan: '',
        family_history: '',
        kaloriHarian: ''
    });

    const id = localStorage.getItem('id')


    const { mutate, isPending } = useMutation({
        mutationKey: "updateProfile",
        mutationFn: () => putProfile(id, profile),
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({
            ...profile,
            [name]: value
        });
    }

    const handleClose = () => {
        setShowModal(false)
        window.location.reload();
    }

    const handleSukses = async (event) => {
        console.log(profile)
        setShowModal(true)
        mutate(profile)
        // refetch();
    }

    useEffect(() => {
        if (data) {
            setProfile(data)
        }
    }, [data]);

    return (
        <>
            <button className='flex items-center bg-primary px-4 py-2 z-40 rounded-xl text-white gap-2'
                type="button"
                onClick={() => setShowModal(true)}
            >
                <FaPencilAlt color='white' size={15} />
                Edit Profile
            </button>
            {showModal ? (
                <div className=''>
                    <div
                        className="justify-center pt-[640px] md:pt-0 z-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
                    >

                        <div className="relative w-2/3 md:w-2/3  my-6 mx-auto">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-4 border-b border-solid border-gray-400 rounded-t">
                                    <h3 className="text-xl flex justify-center w-full font-bold">
                                        Edit Profile
                                    </h3>
                                </div>
                                <div>
                                    <form>
                                        <div className="grid gap-6 mb-3 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 px-6 pt-4">
                                            <Input title='Nama' name='nama' value={profile ? profile.nama : ""} onChange={handleChange} type='text' id='nama' placeholder='Anastasia' />
                                            <Input title='Usia' name='usia' value={profile ? profile.usia : ""} onChange={handleChange} type='number' id='usia' placeholder='34' />
                                            <Input title='No. Handphone' name='telepon' value={profile ? profile.telepon : ""} onChange={handleChange} type='tel' id='phone' placeholder='089525272397' />
                                            <Input title='Tinggi Badan' name='tinggiBadan' value={profile ? profile.tinggiBadan : ""} onChange={handleChange} type='text' id='tinggi' placeholder='164' />
                                            <Input title='Berat Badan' name='beratBadan' value={profile ? profile.beratBadan : ""} onChange={handleChange} type='text' id='berat' placeholder='78' />
                                            <Input title='address' name='alamat' value={profile ? profile.alamat : ""} onChange={handleChange} type='text' id='alamat' placeholder='Surabaya, Jawa Timur' />

                                            <Dropdown id='jenisKelamin' name='gender' title='Jenis Kelamin' value={profile ? profile.gender : ""} onChange={handleChange}>
                                                <option selected disabled value="" >pilih gender</option>
                                                <option value="0">perempuan</option>
                                                <option value="1">Laki-laki</option>
                                            </Dropdown>

                                            <Dropdown id='Family_history' title='Histori Keluarga Obesitas' name='family_history' value={profile ? profile.family_history : ""} onChange={handleChange}>
                                                <option selected disabled value="">pilih history</option>
                                                <option value="0">no</option>
                                                <option value="1">yes</option>
                                            </Dropdown>
                                            {/* <Dropdown id='smoke' title='Perokok'>
                                                <option value="0">no</option>
                                                <option value="1">yes</option>
                                            </Dropdown> */}
                                        </div>

                                        <div className="grid gap-3 mb-12 mt-12 md:grid-cols-3 px-4 ml-4">
                                            <Input title='email' name='email' value={profile ? profile.email : ""} onChange={handleChange} type='email' id='email' placeholder='anastasia@gmail.com' />
                                            <div className="mb-2 px-6">
                                                <label for="password" className="block text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="password" id="password" className="bg-white border-x-transparent border-t-transparent border-b-blue-700 border-2 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:bg-blue-50 focus:border-b-primary focus:border-x-transparent focus:border-t-transparent focus:ring-transparent" placeholder="•••••••••" required />
                                            </div>
                                            <div className="mb-2 px-6">
                                                <label for="confirm_password" className="block text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                                <input type="password" id="confirm_password" className="bg-white border-x-transparent border-t-transparent border-b-blue-700 border-2 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:bg-blue-50 focus:border-b-primary focus:border-x-transparent focus:border-t-transparent focus:ring-transparent" placeholder="•••••••••" required />
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                {/*footer*/}
                                <div className="flex items-center justify-end py-3 px-5 border-t border-solid border-gray-400 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                    <div>
                                        <Sukses title='Save Changes' onClick2={handleSukses} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </div>
            ) : null}
        </>
    )
}

export default EditProfile