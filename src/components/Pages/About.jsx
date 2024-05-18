import React, { useEffect, useState } from 'react';
import Navbar from '../Fragments/Navbar';
import { GoHomeFill } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdRestaurant } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { Alert } from 'flowbite-react';
import { useQuery } from 'react-query';
import { AiFillMessage } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';



const About = () => {


  return (
    <>
      <div className="flex bg-primary h-auto overflow-x-hidden">
        <Navbar />
        <div className="flex-grow bg-white relative md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
          <div className="bg-white p-3 rounded-4xl flex-col justify-center min-h-screen">
            {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
            {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
            <h1 className="font-bold text-2xl ml-6 ">ABOUT</h1>
            <div className='lg:flex block mb-20 md:mt-12 mt-6 lg:mx-8 justify-center items-center px-8 mx-auto gap-6'>
              <img src="https://res.cloudinary.com/dd8tyaph2/image/upload/v1716021525/wpboil69rwndr0lr2viw.jpg" alt="" />
              <div className='mt-3 md:mt-0'>
                <p className='font-bold font-serif text-base md:text-xl'>SmartDine</p>
                <p className='w-[95%] font-body text-sm md:text-lg md:mt-2 mt-1'>SmartDine adalah aplikasi yang dapat membantu anda dalam merencanakan menu makanan sesuai dengan kebutuhan kalori anda.
                  Aplikasi ini menyediakan fitur untuk perhitungan kalori yang dapat membantu anda dalam menentukan kondisi tubuh sesuai dengan status gizi dan konsumsi kalori harian yang dibutuhkan oleh tubuh anda.
                  Selain itu, aplikasi ini melakukan perencanaan menu makanan anda sesuai dengan bahan makanan yang anda miliki.
                  Dengan SmartDine, anda dapat merencanakan menu makanan yang sesuai dengan kebutuhan tubuh dan bahan makanan yang dimiliki.</p>
              </div>
            </div>
            <p className='mt-8 mb-4 font-bold font-serif ml-1 md:ml-24'>Petunjuk penggunaan SmartDine</p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-[70%] mx-auto'>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>1.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <GoHomeFill size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Melakukan Registrasi atau Login untuk masuk ke akun anda</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>2.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <FaUser size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Masukkan data diri anda pada menu Profil</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>3.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <MdQuiz size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Masukkan data Kebiasaan anda pada menu Kebiasaan User</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>4.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <FiShoppingBag size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Pilih bahan makanan yang anda inginkan, harap masukkan minimal 1 setiap bahan makanan</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>5.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <MdRestaurant size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Lihat jadwal menu makanan selama 7 hari pada menu Meal-Planning</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>6.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <MdRestaurant size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Pilih salah satu hari, dan akan menampilkan 3 paket menu makanan untuk 1 hari</p>
              </div>
              <div className='bg-blue-300 p-5  drop-shadow-lg rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <p className='text-base md:text-lg font-bold font-serif'>7.</p>
                  <p className='flex items-center space-x-2 text-white bg-primary px-2 py-1 rounded-md cursor-pointer'>
                    <MdRestaurant size={20} />
                  </p>
                </div>
                <p className='text-xs md:text-sm font-medium '>Lihat detail menu makanan yang anda pilih</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default About;
