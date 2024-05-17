import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../Fragments/Navbar';
import { GiChickenOven } from "react-icons/gi";
import { GiShinyApple } from "react-icons/gi";
import { GiBroccoli } from "react-icons/gi";
import PilihMenu from '../Fragments/PilihMenu';
import { Link } from 'react-router-dom';
import { FaBowlRice } from "react-icons/fa6";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgDanger } from 'react-icons/cg';
import { useMutation, useQuery } from 'react-query';
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaJar } from "react-icons/fa6";

const getBahan = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meal/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

const postRandomMenu = async (search, kalori, iduser) => {
  const responsePut = await fetch(`${import.meta.env.VITE_BACKEND_URL}/random/${iduser}?search=${search}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ kalori }),
  });

  const data = await responsePut.json();
  return data;
}

const getHistory = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historymakan/${id}`, {
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

const delBahan = async ({ iduser, idBahan }) => {
  const responsePost = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meal/${iduser}/${idBahan}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await responsePost.json();
  return data;
}


const Menu = () => {
  const [selectedOptionsMakananPokok, setSelectedOptionsMakananPokok] = useState([]);
  const [selectedOptionsLauk, setSelectedOptionsLauk] = useState([]);
  const [selectedOptionsSayuran, setSelectedOptionsSayuran] = useState([]);
  const [selectedOptionsBuah, setSelectedOptionsBuah] = useState([]);
  const [selectedOptionsBumbu, setSelectedOptionsBumbu] = useState([]);
  const [selectedOptionsLainnya, setSelectedOptionsLainnya] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  // const [bahan, setBahan] = useState("");
  const [search, setSearch] = useState('');
  const [kalori, setKalori] = useState(0);
  const [showNotificationGagal, setShowNotificationGagal] = useState(false);
  const [showNotificationGagalRandom, setShowNotificationGagalRandom] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [activeNav, setActiveNav] = useState(localStorage.getItem("activeNav") || null);

  const iduser = localStorage.getItem('id');
  const [menu, setMenu] = useState({});

  const [meal, setMeal] = useState({});
  const [history, setHistory] = useState("");

  const { isLoading: bahanisLoading, data, refetch } = useQuery({
    queryKey: ["bahan", iduser],
    queryFn: () => getBahan(iduser),
    refetchIntervalInBackground: 1000,

  });

  const { isLoading: isLoadingHistory, data: dataHistory } = useQuery({
    queryKey: ["history", iduser],
    queryFn: () => getHistory(iduser),
  });

  const { isLoading: isLoadingUser, data: dataUser } = useQuery({
    queryKey: ["user", iduser],
    queryFn: () => getUser(iduser),
  });

  useEffect(() => {
    if (dataUser && dataUser.data) {
      setKalori(dataUser.data.kaloriHarian);
    }
  }, [dataUser, isLoadingUser]);

  console.log(kalori);

  const [bahan, setBahan] = useState([
    { nama: '', jenis: '', jumlah: '' }
  ]);

  useEffect(() => {
    if (dataHistory && dataHistory.data && dataHistory.data.length > 0) {
      const tanggalSelesai = new Date(dataHistory.data[0].tgl_selesai);
      const formattedDate = tanggalSelesai.toISOString().split('T')[0];
      setHistory(formattedDate);
    }
  }, [dataHistory, isLoadingHistory]);
  console.log(history);


  useEffect(() => {
    if (!bahanisLoading && data) {
      setMeal(data);
    }
  }, [data, bahanisLoading]);

  // Fungsi untuk mereload data ketika jenis berubah
  useEffect(() => {
    refetch();
  }, [iduser, refetch]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 6000); // Check every 6 seconds

    return () => clearInterval(interval);
  }, [refetch]);


  useEffect(() => {
    if (!bahanisLoading && data && data.data) {
      const dataBahan = data.data.bahan.map(bahan => bahan.nama).join(',');
      setBahan(dataBahan)
    }
  }, [data, bahanisLoading]);


  const handleMakananPokok = (data) => {
    setSelectedOptionsMakananPokok(data);
  };
  const handleLauk = (options) => {
    setSelectedOptionsLauk(options);
  };
  const handleSayuran = (options) => {
    setSelectedOptionsSayuran(options);
  };
  const handleBuah = (options) => {
    setSelectedOptionsBuah(options);
  };
  const handleBumbu = (options) => {
    setSelectedOptionsBumbu(options);
  };
  const handleLainnya = (options) => {
    setSelectedOptionsLainnya(options);
  };


  const isDatePassedMenu = (dateString) => {
    const currentDate = new Date();
    const dateFromDatabase = new Date(dateString);
    return dateFromDatabase < currentDate;
  };



  useEffect(() => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      bahan: [...bahan] // Menyalin data dari state bahan ke dalam state menu
    }));
  }, [bahan]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);

    // Tambahkan objek bahan baru ke dalam state bahan
    setBahan([...bahan, { nama: '', jenis: '', jumlah: '' }]);
  };

  const handleRemoveRow = (index) => {
    const updatedBahan = [...bahan];
    updatedBahan.splice(index, 1);
    setBahan(updatedBahan);

    // Hapus baris dari array rows
    const updatedRows = rows.filter(row => row.id !== index + 1);
    setRows(updatedRows);
    // const updatedRows = rows.filter(row => row.id !== id);
    // setRows(updatedRows);
  };


  const id = localStorage.getItem('id')

  const { mutate, isError, isLoading } = useMutation({
    mutationKey: 'menu',
    mutationFn: () => postMenu(menu),
    onError: (error) => {
      // alert('Registrasi gagal. Silakan coba lagi.' + error);
      console.log(error)
    },
    onSuccess: () => {
      console.log("sukses post menu ", menu)
    }
  })

  const handleChangeMenu = (event) => {
    setMenu({
      ...menu,
      [event.target.name]: event.target.value,
    });
  }


  // const handleNavClick = async () => {
  //   if (menu.menu !== '' && menu.kalori_makanan !== '' ) {
  //     setShowNotificationSukses(true);
  //     // setShowModal(true);
  //     // setRedirecting(true);
  //     mutate()
  //   } else {
  //     setShowNotificationGagal(true);
  //     // setShowModalGagal(true);
  //     // setRedirecting(false);
  //   }
  //   console.log("klik", menu);
  // };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // event.preventDefault(); // Prevent default behavior of textarea (inserting newline)
      const langkahBaru = text.split('\n')
      if (langkahBaru !== '') {
        setMenu(prevMenu => ({
          ...prevMenu,
          cara_masak: langkahBaru,
        }));
        // setText(''); // Clear the input field after adding the step
      }
    }
  };

  const updateMenuAvatar = (newAvatar) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      avatar: newAvatar // Update the avatar field in the menu state
    }));
  };

  // console.log(menu);

  useEffect(() => {
    let timeout;
    if (showNotification) {
      timeout = setTimeout(() => {
        setShowNotification(false);
            window.location.href = "/meal";
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showNotification]);

  useEffect(() => {
    let timeout;
    if (showNotificationGagal) {
      timeout = setTimeout(() => {
        setShowNotificationGagal(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [showNotificationGagal]);


  useEffect(() => {
    if (data && data.data && data.data.bahan) {
      const filterData = data.data.bahan.filter(bahan => bahan.jenis === 'pokok');
      setSelectedOptionsMakananPokok(filterData);

      const filterDataLauk = data.data.bahan.filter(bahan => bahan.jenis === 'lauk');
      setSelectedOptionsLauk(filterDataLauk);

      const filterDataBuah = data.data.bahan.filter(bahan => bahan.jenis === 'buah');
      setSelectedOptionsBuah(filterDataBuah);

      const filterDataSayuran = data.data.bahan.filter(bahan => bahan.jenis === 'sayuran');
      setSelectedOptionsSayuran(filterDataSayuran);

      const filterDataBumbu = data.data.bahan.filter(bahan => bahan.jenis === 'pelengkap');
      setSelectedOptionsBumbu(filterDataBumbu);

      const filterDataLainnya = data.data.bahan.filter(bahan => bahan.jenis === 'lainnya');
      setSelectedOptionsLainnya(filterDataLainnya);

    }
  }, [data]);

  const { mutate:randomMutate, onError } = useMutation({
    mutationKey: "postRandomMenu",
    mutationFn: () => postRandomMenu(bahan, kalori, iduser),
    onSuccess: (data) => {
      localStorage.setItem("activeNav", "/meal");
      window.location.href = "/meal";
    }, onError: (error) => {
      console.log(error);
    }
  });

  // const aturMeal = localStorage.setItem("meal", false);

  const handleNavClick = async (navItem) => {
    // const databaseDate = history; //'2024-03-18';
    // const datePassed = isDatePassedMenu(databaseDate);

    if (selectedOptionsMakananPokok.length > 0 && selectedOptionsLauk.length > 0 && selectedOptionsSayuran.length > 0 && dataUser.data.kaloriHarian !== 0 && dataUser !== null ) {
      setShowNotification(true);
      localStorage.setItem("activeNav", "/meal");
      console.log(bahan);
      console.log(iduser);
      await mutate();
      localStorage.setItem("meal", true);
      // window.location.href = "/meal"; // Pindahkan ini ke dalam onSuccess mutate
    } else if (!dataUser || !dataUser.data || !dataUser.data.kaloriHarian) {
      setShowNotificationGagal(true);
      setRedirecting(true);
      // console.log("kalori",dataUser.data.kaloriHarian)
      window.location.href = "/profile";
      localStorage.setItem("activeNav", "/profile");
    }else {
      setShowNotificationGagalRandom(true);
      // localStorage.setItem("activeNav", "/");
      // window.location.href = "/";
    }
  };


//   const handleNavClick = async () => {
//   if (selectedOptionsMakananPokok.length > 0 && selectedOptionsLauk.length > 0 && selectedOptionsSayuran.length > 0) {
//     setShowNotification(true);
//     localStorage.setItem("activeNav", "/meal");
//     await mutate();
//     localStorage.setItem("meal", true);
//     // window.location.href = "/meal"; // Pindahkan ini ke dalam onSuccess mutate
//   } else if (!dataUser || !dataUser.data || !dataUser.data.kaloriHarian) {
//     // Jika dataUser tidak tersedia, dataUser tidak memiliki properti data, atau kaloriHarian kosong, arahkan ke "/profile"
//     setShowNotificationGagal(true);
//     setRedirecting(true);
//     window.location.href = "/profile";
//     localStorage.setItem("activeNav", "/profile");
//   } else {
//     // Jika dataUser dan kaloriHarian sudah ada, arahkan ke "/home"
//     setShowNotification(true);
//     localStorage.setItem("activeNav", "/home");
//     // Lakukan tindakan lain yang diperlukan
//     // window.location.href = "/home"; // Anda bisa menambahkan ini jika diperlukan
//   }
// };

  const { mutate: mutateBahan } = useMutation({
    mutationKey: "delBahan",
    mutationFn: delBahan,
    onSuccess: () => {
      console.log('BERHASIL HAPUS BAHAN' + bahan)
    }
  });

  const handleRemoveOption = async (id) => {
    // const updatedDataBenar = data.data.bahan.filter((_, i) => i !== id);
    // const updatedBahan = updatedDataBenar.map(bahan => bahan.nama);
    // setBahan(updatedBahan);

    // // Lanjutkan dengan proses penghapusan bahan dan pemanggilan mutateBahan
    // const idBahan = data.data.bahan[id].id;
    if (id) {
      await mutateBahan({ iduser, idBahan: id });
      refetch();
      setShowNotification(true);
      // return;
    } else {
      setShowNotificationGagal(true);
    }
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
            // Perbarui untuk mengarahkan pengguna ke '/meal' atau '/login'
            // const redirectPath = isLogin ? "/meal" : "/login";
            // window.location.href = redirectPath;
            // setActiveNav(navItem); // Jika Anda masih membutuhkan ini, pastikan navItem sudah didefinisikan sebelumnya
            // localStorage.setItem("activeNav", navItem);
          }
        }, 1000);
      }, 2000); // 5000 milidetik = 5 detik
    }

    // Membersihkan timer jika komponen di-unmount atau pemberitahuan disembunyikan
    return () => clearTimeout(timeout);
  }, [showNotificationGagal]);

  useEffect(() => {
    let timeout;
    if (showNotificationGagalRandom) {
      timeout = setTimeout(() => {
        setShowNotificationGagalRandom(false);
        setTimeout(() => {
          if (redirecting) {
            // Perbarui untuk mengarahkan pengguna ke '/meal' atau '/login'
            // const redirectPath = isLogin ? "/meal" : "/login";
            // window.location.href = redirectPath;
            // setActiveNav(navItem); // Jika Anda masih membutuhkan ini, pastikan navItem sudah didefinisikan sebelumnya
            // localStorage.setItem("activeNav", navItem);
          }
        }, 1000);
      }, 2000); // 5000 milidetik = 5 detik
    }

    // Membersihkan timer jika komponen di-unmount atau pemberitahuan disembunyikan
    return () => clearTimeout(timeout);
  }, [showNotificationGagalRandom]);




  return (
    <div className="flex bg-primary h-screen overflow-x-hidden">
      <Navbar />
      <div className="flex-grow bg-white h-screen md:ml-20 ml-14 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
        <div className="bg-white p-3 rounded-4xl flex-col justify-center">
          <h1 className="font-bold md:text-2xl ml-6">Meal-Planning</h1>
          {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
          {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
          <div className='flex md:justify-end gap-3 mr-16 mt-4 mb-6'>
            {/* <button type='button' onClick={() => handleNavClick(isLogin ? "/meal" : "/login")} className='font-bold border-2 border-primary rounded-3xl py-2 z-30 px-5 text-primary'>Random</button> */}
            {/* <Link to={isLogin ? "/meal" : "/login"}  className="z-30"> */}
            <button type="button" onClick={() => handleNavClick(isLogin ? "/meal" : "/login")} className='bg-primary flex md:items-center gap-2 hover:border-blue-400 active:border border-4 text-white z-30 font-bold md:text-sm text-xs px-8 py-3 mt-8 md:mt-0 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
              Create Meal Plan
            </button>
            {/* </Link> */}
          </div>
          <div className=' gap-4 ml-10 mb-7 flex'>
            <PilihMenu id="makananpokok" jenis='pokok' onSelectedOptionsChange={handleMakananPokok} title='Makanan Pokok'  >
              <FaBowlRice color='white' />
            </PilihMenu>
            <PilihMenu id="lauk-pauk" jenis='lauk' onSelectedOptionsChange={handleLauk} title='Lauk Pauk' >
              <GiChickenOven color='white' />
            </PilihMenu>
            <PilihMenu id="sayuran" jenis='sayuran' onSelectedOptionsChange={handleSayuran} title='Sayuran'>
              <GiBroccoli color='white' />
            </PilihMenu>
            {/* <PilihMenu id="buah" jenis='buah' onSelectedOptionsChange={handleBuah} title='Buah'>
              <GiShinyApple color='white' />
            </PilihMenu>
            <PilihMenu id="pelengkap" jenis='pelengkap' onSelectedOptionsChange={handleBumbu} title='Bumbu Masak'>
              <FaJar color='white' />
            </PilihMenu>
            <PilihMenu id="lainnya" jenis='lainnya' onSelectedOptionsChange={handleLainnya} title='Lainnya'>
              <BiSolidFoodMenu color='white' />
            </PilihMenu> */}
          </div>
          <h1 className="font-bold md:text-lg md:ml-14 ml-5 mb-4">List Menu Makanan</h1>
          <div className="container md:ml-[30px] mx-auto bg-blue-300 w-[92%] md:w-[92%] md:h-fit px-5 py-5 md:flex block justify-center rounded-3xl">
            <div className='grid md:grid-cols-3 w-full'>
              <div className=' border-x-[5px] border-blue-300 flex-col mb-3 justify-center'>
                <div className='bg-white max-h-auto min-h-[247px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Bahan Pokok :</h3>
                    {selectedOptionsMakananPokok.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsMakananPokok.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=' border-x-[5px] border-blue-300 flex-col mb-6 md:mb-0 justify-center'>
                <div className='bg-white max-h-auto min-h-[247px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Lauk Pauk :</h3>
                    {selectedOptionsLauk.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsLauk.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className=' border-x-[5px] border-blue-300 flex-col mb-6 md:mb-0 justify-center'>
                <div className='bg-white max-h-auto min-h-[247px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Sayuran :</h3>
                    {selectedOptionsSayuran.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsSayuran.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className=' border-x-[5px] border-blue-300 flex-col mb-6 md:mb-0 justify-center'>
                <div className='bg-white max-h-auto min-h-[270px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Buah :</h3>
                    {selectedOptionsBuah.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsBuah.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              {/* <div className=' border-x-[5px] border-blue-300 flex-col mb-6 md:mb-0 justify-center'>
                <div className='bg-white max-h-auto min-h-[270px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Bumbu :</h3>
                    {selectedOptionsBumbu.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsBumbu.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}
              {/* <div className=' border-x-[5px] border-blue-300 flex-col mb-6 md:mb-0 justify-center'>
                <div className='bg-white max-h-auto min-h-[270px] rounded-3xl p-3'>
                  <div className='p-1.5'>
                    <h3 className='ml-2 font-bold'>Lainnya :</h3>
                    {selectedOptionsLainnya.length > 0 && (
                      <div className="">
                        <ul className='ml-2 p-2'>
                          {selectedOptionsLainnya.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 text-sm'>
                              <p className='w-4 h-4 rounded-xl bg-primary ' />
                              {option.nama}
                              <button
                                className="text-red-500 z-20"
                                type="button"
                                onClick={() => handleRemoveOption(option._id)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}

            </div>
          </div>
        </div>
      </div>
      {showNotification && (

        <div className="flex fixed z-50 item-center top-5 md:right-[400px] p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
          <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
          <div>
            <span className="flex items-center h-auto m-2 font-medium">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.</span>
          </div>
        </div>

      )}
      {showNotificationGagal && (
        <div className="flex fixed items-center z-50 top-5 md:right-[400px] p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
          <CgDanger className='text-2xl m-2' />
          <div>
            <span className="font-medium m-2">Silahkan login atau cek Meal-planning.</span>
          </div>
        </div>
      )}
      {showNotificationGagalRandom && (
        <div className="flex fixed items-center z-50 top-5 right-[400px] p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
          <CgDanger className='text-2xl m-2' />
          <div>
            <span className="font-medium m-2">Silahkan lengkapi input makanan pokok, sayuran dan lauk.</span>
          </div>
        </div>
      )}
    </div>
    // </div >
  );
}

export default Menu;