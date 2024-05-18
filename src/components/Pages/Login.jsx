import React, { useEffect, useState } from 'react';
import Input from '../elements/input/Input';
import Sukses from '../elements/button/Sukses';
import { useMutation } from 'react-query';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgDanger } from 'react-icons/cg';

const postLogin = async (user) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
}


const Login = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationGagal, setShowNotificationGagal] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { mutate, isError, isLoading } = useMutation({
        mutationKey: 'login',
        mutationFn: () => postLogin(loginData),
        onError: (error) => {
            if (error.stat !== 'Bad Request') {
                console.log(error.message);
                alert('Login gagal. Silakan coba lagi.');
            }
        },
        onSuccess: (data) => {
            if (data.token !== undefined) {
                console.log('login berhasil!', data);
                // alert('Login berhasil!');
                setShowNotification(true);
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                localStorage.setItem('isLogin', true);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setShowNotificationGagal(true);
                console.log('login gagal!', data);

                // alert('Login gagal. Silakan periksa detail akun Anda dan coba lagi.');
                // const data = result.data;
                // window.location.href = '/';
            }
        },
    })

    const handleChange = (event) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    }

    const handleLogin = async (event) => {
        event.preventDefault();


        mutate(loginData);
        console.log(loginData)
    }

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
        <div className=" bg-primary w-full h-screen overflow-x-auto flex justify-center items-center">
            <div className=" z-20 bg-white w-[80%] lg:w-[35%] h-fit lg:h-[85%] lg:ml-48 my-12 pb-4 pt-4 lg:rounded-l-2xl  ">
                <form onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold text-center mt-10">Login</h1>
                    <div className='flex-col text-center mt-3'>
                        <h3>Selamat datang kembali!</h3>
                        <h3>Silakan masukkan detail akun Anda.</h3>
                    </div>
                    <div className="grid md:grid-cols-1 items-center md:mx-16 mx-6 mb-4 mt-8 gap-12">
                        <Input tipe="text" onChange={handleChange} name="email" id="email" placeholder="anastasia@gmail.com" title="email" />
                        <Input tipe="password" onChange={handleChange} name="password" id="password" placeholder="********" title="Password" />
                        <div className="flex items-center gap-6 md:ml-16 mt-2 justify-end">
                            <button
                                // type="submit"
                                className='bg-primary flex items-center gap-2 hover:border-blue-400 active:border border-4 text-white z-30 font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            {showNotification && (
                                <div class="flex fixed z-50 item-center top-5 right-2 p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                                    <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                                    <div>
                                        <span class="flex items-center h-auto m-2 font-medium">Selamat datang! Login berhasil dilakukan. </span>
                                    </div>
                                </div>
                            )}
                            {showNotificationGagal && (
                                <div class="flex fixed items-center z-50 top-5 right-2 p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                                    <CgDanger className='text-2xl m-2' />
                                    <div>
                                        <span class="font-medium m-2">Silahkan cek email dan password anda.</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className='flex items-center gap-6 md:ml-16 mt-2 justify-end'>
                            <button type="submit"> <Sukses title='Login Akun' /> </button>
                        </div> */}
                    </div>
                    <div className='font-semibold md:text-base text-xs mx-10 my-4'>sudah memiliki akun? <a href="/registrasi" className='text-primary font-bold'>Register</a></div>
                </form>
            </div>
            {/* <div className={`md:w-[85%] lg:w-[52%] mx-10 z-20 md:ml-14 min-h-60 ${window.innerWidth < 768 ? 'hidden' : ''}`}>
              <Line data={dataline} width={100} height={40} options={options} />
            </div>
            <p className={`text-center border border-primary rounded-2xl ${window.innerWidth >= 768 ? 'hidden' : ''}`}>Silahkan ubah dalam tampilan dekstop untuk melihat grafik</p> */}
            <img
                src="https://res.cloudinary.com/dd8tyaph2/image/upload/v1711342674/download_19_bv73fy.jpg"
                className='w-[30%] my-auto mr-48 rounded-r-3xl h-[85%] hidden lg:block'
            />

            {/* <img  alt="" className='' /> */}
            {/* <div className='absolute w-[8%] mt-[68px] flex justify-center ml-[1030px]'>
                <img src="sudut.png" alt="" className=' rounded-3xl' />
            </div> */}
        </div>
    )
}

export default Login;
