import React, { useEffect, useState } from 'react';
import Navbar from '../Fragments/Navbar';
import React, { useEffect, useState } from 'react';
import Navbar from '../Fragments/Navbar';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const getMenu = async (idDetail) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu/${idDetail}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

// const getRandom = async (id, idMenu) => {
//   const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/random/${id}/${idMenu}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await response.json();
//   return data;
// };


const Detail = () => {
  const { idDetail, kalori, berat, selectedDay, paketName } = useParams();
  const [filteredMenu, setFilteredMenu] = useState(null);
  const [bahan, setBahan] = useState([]);
  const [randomData, setRandomData] = useState({});

  const { isLoading, isError, data } = useQuery(
    ["menu", idDetail],
    () => getMenu(idDetail),
    { enabled: !!idDetail }
  );

  // const { selectedDay, paketName } = useParams();
  const id = localStorage.getItem('id');


  // const { isLoading: isLoadingRandom, isError: isErrorRandom, data: random } = useQuery({
  //   queryKey: ["random"],
  //   queryFn: () => getRandom(id, idMenu),

  // });

  // useEffect(() => {
  //   if (random) {
  //     setRandomData(random);
  //   }
  // }, [random]);

  // console.log("random",randomData);

  useEffect(() => {
    if (data) {
      const filterData = data.data;
      setFilteredMenu(filterData);
    }
  }, [data]);

  useEffect(() => {
    if (filteredMenu) {
      const bahanPokok = filteredMenu.bahan.map(bahan => bahan.nama);
      // const bahanTakaran = filteredMenu.bahan.map(bahan => bahan.jumlah);
      // const combinedIngredients = bahanPokok.map((namaBahan, index) => `${namaBahan} ${bahanTakaran[index]}`);
      // console.log(combinedIngredients);
      setBahan(bahanPokok);
    }
  }, [filteredMenu]);
  // console.log(filteredMenu.bahan.map(bahan => bahan.jumlah))


  // Ensure filteredMenu is not null before accessing its properties
  const avatarUrl = filteredMenu ? filteredMenu.avatar : null;

  // console.log(kalori)

  return (
    <>
      <div className="flex bg-primary h-auto overflow-x-hidden">
        <Navbar />
        <div className="flex-grow bg-white relative ml-20 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
          <div className="bg-white p-3 rounded-4xl flex-col justify-center min-h-screen">
            {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
            {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
            <div className='flex'>
              <Link to={`/paket/${selectedDay}/${paketName}`} className='z-20 flex'>
                <IoIosArrowBack className="flex text-3xl text-primary ml-3 mt-3" />
                <p className="font-bold text-sm flex justify-center mt-4 text-primary">back</p>
              </Link>
            </div>
            <h1 className='flex justify-center font-bold mt-4 md:mt-0 md:text-2xl mb-4'>{filteredMenu ? filteredMenu.menu : ''}</h1>
            <div className='md:flex block gap-5 mt-6 '>
              {avatarUrl && <img src={avatarUrl} alt="" className='md:w-[30%] w-[50%] md:min-h-[500px] md:rounded-l-3xl max-h-[50%] rounded-full md:ml-3 mx-auto md:mx-0 md:my-0 my-2' />}
              {/* <img src='nasgor.jpg' alt="" className='w-[30%] h-auto rounded-l-3xl ml-3' /> */}
              <div className='mx-4'>
                <div className='flex gap-6'>
                  <p className='font-bold mt-4 md:text-lg  border border-primary w-fit px-3 rounded-lg mb-3'>{"Kalori : " + kalori + " Kkal"}</p>
                  <p className='font-bold mt-4 md:text-lg border border-primary w-fit px-3 rounded-lg mb-3'>{"Porsi : " + berat + " gram"}</p>
                </div>
                <p className='font-bold text-lg'>Bahan:</p>
                <ul style={{ listStyleType: 'disc' }} className='grid md:grid-cols-2 ml-8'>
                  {bahan && Array.isArray(bahan) && bahan.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className='font-bold text-lg mt-3'>Langkah:</p>
                <ul style={{ listStyleType: 'discimal' }} className='ml-8'>
                  {filteredMenu ? filteredMenu.cara_masak.map((item, index) => (
                    <li key={index}>{item}</li>
                  )) : ''}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
  );
};

export default Detail;

export default Detail;
