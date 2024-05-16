import React from "react";
import { GoHomeFill } from "react-icons/go";
import { TiThMenu } from "react-icons/ti";
import { MdRestaurant } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import Navbar from "../Fragments/Navbar";

import { Line, Chart } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  // Data untuk Line Chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Monthly Progress",
        data: [5, 10, 8, 15, 12],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  // Konfigurasi Chart dengan chart.js

  const options = {
    scales: {
      x: {
        type: "linear",
      },
      y: {
        type: "linear",
      },
    },
  };
  return (
    <div className="flex bg-primary h-auto ">
      <Navbar />
      <div className="flex-grow bg-white relative ml-32 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
        <div className="bg-white p-3 rounded-4xl">
          <h1 className="font-bold text-2xl ml-6">DASHBOARD</h1>
          <div className="w-[calc(100%-8rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0 rounded-2xl"></div>
          <div className="w-[calc(100%-10rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div>
          <div className="flex gap-44 justify-center">
            <div className="ml-20 mt-[-49px]">
              <img
                src="download.jpg"
                alt=""
                className="-rotate-90 w-44 ml-2 rounded-2xl"
              />
              <p
                className="bg-white ml-[-73px] mt-[-140px] font-bold absolute text-center rounded-3xl shadow-lg w-[340px] py-2 px-4"
                style={{ boxShadow: "0.5px 3px 5px 4px rgba(0,0,0,0.4)" }}
              >
                "Setiap usaha yang kamu lakukan <br/> investasi berharga tubuhmu."
              </p>
            </div>
            <div className="">
              <div
                className="p-4 m-5 w-[380px] bg-[#B5D5FE] shadow-gray-300 rounded-xl border border-[#0F2650]"
                style={{ boxShadow: "18px 19px 14px -3px rgba(0,0,0,0.1)" }}
              >
                <picture className="flex justify-center rounded">
                  <img
                    className="rounded-full aspect-square mx-3 my-2 w-20 h-[78px] border border-[#0F2650]"
                    src="https://picsum.photos/360/240"
                  />
                </picture>
                <h1 className="flex justify-center mt-4 mb-2 mx-3 font-bold text-xl">
                  Olivia Davis, Psy.D.
                </h1>
              </div>
            </div>
          </div>
          <div className="flex gap-20 justify-center items-center">
            <div className="w-[52%] ml-10">
              <Line data={data} width={100} height={40} />
            </div>
            <div className="mr-8">
              <div
                className="p-4 m-5 w-[240px] h-[210px] bg-[#B5D5FE] shadow-gray-300 rounded-xl border border-[#0F2650]"
                style={{ boxShadow: "18px 19px 14px -3px rgba(0,0,0,0.1)" }}>
                <picture className="flex justify-center rounded">
                  <img
                    className="rounded-full aspect-square mx-3 my-2 w-20 h-[78px] border border-[#0F2650]"
                    src="https://picsum.photos/360/240"
                  />
                </picture>
                <h1 className="flex justify-center mt-4 mb-2 mx-3 font-bold text-xl">
                  Olivia Davis, Psy.D.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;