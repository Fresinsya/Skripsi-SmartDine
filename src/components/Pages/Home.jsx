import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdRestaurant } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Navbar from "../Fragments/Navbar";

import { Line } from "react-chartjs-2";
// import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";
// import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const getRekapKalori = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/rekap/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
const getUser = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

const Home = () => {
  const [rekap, setRekap] = useState({})
  const [kalori, setKalori] = useState({})
  const [bmr, setBmr] = useState({});
  const [tdee, setTdee] = useState({});
  const [tanggal, setTanggal] = useState([])
  const [berat, setBerat] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [activeNav, setActiveNav] = useState(localStorage.getItem("activeNav") || null);

  const id = localStorage.getItem('id')
  const { isLoading, isError, data } = useQuery({
    queryKey: ["RekapKalori"],
    queryFn: () => getRekapKalori(id),

  });

  const { isLoading: loadingUser, isError: errorUser, data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(id),
  });
  console.log(tanggal)


  useEffect(() => {
    if (data && data.data) {
      // Mengumpulkan semua data.Defisit dengan IdUser yang sama
      const kalori = data.data.map(entry => entry.total_kalori_harian);
      setKalori(kalori);
      const bmrTubuh = data.data.map(entry => entry.BMR);
      setBmr(bmrTubuh);
      const tdeeTubuh = data.data.map(entry => entry.TDEE);
      setTdee(tdeeTubuh);
      const defisit = data.data.map(entry => entry.Defisit);
      setRekap(defisit);


      const tanggalArray = data.data.map(
        entry => {
          const tanggalObj = new Date(entry.tgl_input);
          return ("0" + tanggalObj.getDate()).slice(-2);
        });

      // Menggabungkan elemen-elemen array tanggalArray menjadi string dengan separator ","
      // const tanggalString = tanggalArray.join(",");

      setTanggal(tanggalArray);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if(dataUser && dataUser.data){
      setBerat(dataUser.data.beratBadan)
    }
  }, [dataUser, loadingUser]);

  console.log(berat)

  // console.log(tanggal)

  const menuLink = isLogin ? "/meal" : "/login";
  const menuLogin = isLogin ? "/profile" : "/login";

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    localStorage.setItem("activeNav", navItem); // Mengirim nilai activeNav ke local storage
  };

  // useEffect(() => {
  //   localStorage.setItem("activeNav", menuLogin);
  // }, [menuLogin]);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin");
    setIsLogin(loginStatus === "true");
  }, []);


  // Data untuk Line Chart
  const dataline = {
    labels: tanggal,
    datasets: [
      // {
      //   label: "Berat Badan",
      //   data: berat,
      //   fill: false,
      //   borderColor: "#0699AA",
      // },
      {
        label: "BMR",
        data: bmr,
        fill: false,
        borderColor: "#0699AA",
      },
      {
        label: "TDEE",
        data: tdee,
        fill: false,
        borderColor: "#B51B75",
      },
      // {
      //   label: "Kalori",
      //   data: kalori,
      //   label: "Defisit Kalori",
      //   data: rekap,
      //   fill: false,
      //   borderColor: "#0699AA",
      // },
      {
        label: "Kalori",
        data: kalori,
        fill: false,
        borderColor: "#F54E29",
        // borderColor: "#F54E29",
      },
    ],
  };

  // Konfigurasi Chart dengan chart.js

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Progres Mingguan Anda',
      },
    },
  };
  return (
    <div className="flex bg-primary h-screen overflow-x-hidden overflow-y-auto ">
      <Navbar />
      <div className="flex-grow bg-white h-fit md:h-screen md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
        <div className=" p-3 rounded-4xl flex-col justify-center mb-10">
          <h1 className="font-bold md:text-2xl ml-6">DASHBOARD</h1>
          {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0 rounded-2xl"></div> */}
          {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
          <div className="md:flex block lg:gap-36 md:gap-28 md:mt-10 lg:mt-1 md:mb-2 justify-center lg:justify-center md:justify-start items-center">
            <div className="">
              <div
                className="p-4 m-5 lg:w-[440px] md:w-[620px] bg-[#B5D5FE] shadow-gray-300 rounded-xl border border-[#0F2650]"
                style={{ boxShadow: "18px 19px 14px -3px rgba(0,0,0,0.1)" }}
              >
                <p className="text-center text-xs md:text-base my-5 text-primary font-bold">Lengkapi Profile agar dapat melakukan meal-planning yang sesuai dengan kebutuhan kalori anda.</p>
                <Link to={menuLogin} onClick={() => handleNavClick(isLogin ? "/profile" : "/login")} className="w-full flex justify-end">
                  <button type="button" className='z-50 bg-primary flex items-center gap-2 hover:border-blue-400 active:border border-4 text-white font-bold md:text-sm text-xs px-8 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                    Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:hidden lg:block ml-16 md:ml-0 md:mt-[-62px]">
              <img
                src="download.jpg"
                alt=""
                className="-rotate-90 md:w-[179px] w-[60%] md:ml-2 rounded-2xl"
              />
              <p
                className="bg-white ml-[-54px] md:ml-[-73px]  md:mt-[-76px] mt-[-50px] font-bold text-xs md:text-base text-center rounded-3xl shadow-lg md:w-[340px] w-fit py-2 px-4"
                style={{ boxShadow: "0.5px 3px 5px 4px rgba(0,0,0,0.4)" }}
              >
                "Setiap usaha yang kamu lakukan <br /> investasi berharga tubuhmu."
              </p>
            </div>

          </div>
          <div className="md:block lg:flex gap-10 lg:gap-8 mt-16 lg:mt-0 justify-center items-center ">
            <div className={`md:w-[85%] lg:w-[52%] mx-10 z-20 md:ml-14 min-h-60 ${window.innerWidth < 768 ? 'hidden' : ''}`}>
              <Line data={dataline} width={100} height={40} options={options} />
            </div>
            <p className={`text-center border border-primary rounded-2xl ${window.innerWidth >= 768 ? 'hidden' : ''}`}>Silahkan ubah dalam tampilan dekstop untuk melihat grafik</p>
            <div className="lg:mr-16 z-20 mt-16 lg:mt-5">
              <div
                className="p-4 my-5 lg:w-[240px] mx-6 h-[210px] bg-[#B5D5FE] shadow-gray-300 rounded-xl border border-[#0F2650]"
                style={{ boxShadow: "18px 19px 14px -3px rgba(0,0,0,0.1)" }}>
                <p className="text-center my-5 text-primary font-bold">Tetapkan menu harian Anda dengan melihat meal-planning di sini.</p>
                <Link to={menuLink} onClick={() => handleNavClick(isLogin ? "/meal" : "/login")} className="w-full flex justify-end">
                  <button type="button" className='z-50 bg-primary flex items-center gap-2 hover:border-blue-400 active:border border-4 text-white font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                    Meal Planning
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;