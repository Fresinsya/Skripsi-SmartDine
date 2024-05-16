import React, { useState } from 'react';
import Input from '../elements/input/Input';
import Sukses from '../elements/button/Sukses';
import { useMutation } from 'react-query';

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
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const { mutate, isError, isLoading } = useMutation({
        mutationKey: 'login',
        mutationFn: () => postLogin(loginData),
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            console.log('login berhasil!' + data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('id', data.id)
            window.location.href = '/'
            localStorage.setItem('isLogin', true)
            // localStorage.setItem('meal', false)
        }
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
    return (
        <div className=" bg-primary w-full h-screen overflow-x-auto flex justify-center">
            <div className=" z-20 bg-white w-[80%] lg:w-[35%] h-[85%] lg:ml-48 my-12 pb-4 pt-4 lg:rounded-l-2xl md:rounded-2xl">
                <form onSubmit={handleLogin}>
                    <h1 className="text-4xl font-bold text-center mt-10">Login</h1>
                    <div className='flex-col text-center mt-3'>
                        <h3>Selamat datang kembali!</h3>
                        <h3>Silakan masukkan detail akun Anda.</h3>
                    </div>
                    <div className="grid md:grid-cols-1 items-center mx-16 mb-4 mt-8 gap-12">
                        <Input tipe="text" onChange={handleChange} name="email" id="email" placeholder="anastasia@gmail.com" title="email" />
                        <Input tipe="password" onChange={handleChange} name="password" id="password" placeholder="********" title="Password" />
                        <div className='flex items-center gap-6 ml-16 mt-2 justify-end'>
                            <button type="submit"> <Sukses title='Login Akun' /> </button>
                        </div>
                    </div>
                    <div className='font-semibold mx-10'>sudah memiliki akun? <a href="/registrasi" className='text-primary font-bold'>Register</a></div>
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
