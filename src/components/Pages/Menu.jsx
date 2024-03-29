import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from '../Fragments/Navbar';
import Dropdown from '../elements/input/Dropdown';
import { FaPencilAlt } from 'react-icons/fa';
import Input from '../elements/input/Input';
import PotoProfile from '../Fragments/PotoMenu';
import { useMutation, useQuery } from 'react-query';
import { CgDanger } from "react-icons/cg";
import { IoCheckmarkDoneCircle } from "react-icons/io5";



const postMenu = async (menu) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu`, {
    method: 'POST',
    body: JSON.stringify(menu),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data;
}

const Menu = ({ fotoMakanan }) => {
  const [rows, setRows] = useState([{ id: 1 }]); // Initial state with one row
  const [showNotificationSukses, setShowNotificationSukses] = useState(false);
  const [showNotificationGagal, setShowNotificationGagal] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [imgBaru, setImgBaru] = useState('');
  const [menu, setMenu] = useState({
    menu: '',
    bahan: [],
    avatar: '',
    cara_masak: [],
    kalori_makanan: '',
    berat_makanan: ''
  });

  const [bahan, setBahan] = useState([
    { nama: '', jenis: '', jumlah: '' }
  ]);

  const handleChangeBahan = (e, index) => {
    const { id, value } = e.target;
    const inputName = id.split('_')[0]; // Extracting the name from the id
    const updatedBahan = bahan.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          [inputName]: value,
        };
      }
      return item;
    });
    setBahan(updatedBahan);
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


  const handleNavClick = async () => {
    if (menu.menu !== '' && menu.kalori_makanan !== '' ) {
      setShowNotificationSukses(true);
      // setShowModal(true);
      // setRedirecting(true);
      mutate()
    } else {
      setShowNotificationGagal(true);
      // setShowModalGagal(true);
      // setRedirecting(false);
    }
    console.log("klik", menu);
  };

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

  console.log(menu)

  useEffect(() => {
    let timeout;
    if (showNotificationSukses) {
      timeout = setTimeout(() => {
        setShowNotificationSukses(false);
            window.location.href = "/meal";
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [showNotificationSukses]);

  useEffect(() => {
    let timeout;
    if (showNotificationGagal) {
      timeout = setTimeout(() => {
        setShowNotificationGagal(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [showNotificationGagal]);

  return (
    <div className="flex bg-primary h-auto overflow-x-hidden min-h-[500px]">
      <Navbar />
      <div className="flex-grow bg-white relative ml-20 mt-[17px] mx-4 mb-[17px] pb-4 pt-4 rounded-2xl">
        <div className="bg-white p-3 rounded-4xl flex-col justify-center">
          <h1 className="font-bold text-2xl ml-6 mb-3">Create Menu</h1>
          {/* <div className="w-[calc(100%-4rem)] h-full bg-transparent border-[21px] border-primary fixed z-20 top-0 right-0"></div> */}
          {/* <div className="w-[calc(100%-6rem)] h-[95%] bg-transparent border-[16px] border-white fixed z-20 top-4 right-4 rounded-2xl"></div> */}
          <div className='flex justify-end gap-3 mr-16 mt-4 mb-6'>
            <button type="button" onClick={() => handleNavClick(isLogin ? "/meal" : "/login")} className='bg-primary flex items-center gap-2 hover:border-blue-400 active:border border-4 text-white z-30 font-bold text-sm px-8 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
              Create Menu
            </button>
          </div>
          <div className='z-20'>
            <PotoProfile data={menu} imgBaru={imgBaru} setImgBaru={setImgBaru} updateMenuAvatar={updateMenuAvatar} />
            <div className='flex justify-center items-center'>
              <img id='preview-img' src={fotoMakanan || imgBaru} alt="" className='w-40 h-40 rounded-2xl' /> {/* Menggunakan nilai imgBaru di sini */}
            </div>
          </div>
          {/*  */}
          <div className=' gap-4 ml-[120px] mt-5 mb-2 block md:flex lg:flex'>
            <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 z-20">
              <div className="sm:col-span-4">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nama Menu
                </label>
                <div className="mt-2 w-96">
                  <input
                    onChange={handleChangeMenu}
                    type="text"
                    name="menu"
                    id="menu"
                    autoComplete="given-name"
                    placeholder='Nasi Goreng'
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Kalori menu</label>
                <div class="relative mt-2 rounded-md shadow-sm w-full">

                  <input type="text" onChange={handleChangeMenu} name="kalori_makanan" id="kalori_makanan" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="400" />
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <p className='h-full mt-4 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'>Kkal</p>

                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Takaran</label>
                <div class="relative mt-2 rounded-md shadow-sm w-full">

                  <input type="text" onChange={handleChangeMenu} name="berat_makanan" id="berat_makanan" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="400" />
                  <div class="absolute inset-y-0 right-0 flex items-center">
                    <p className='h-full mt-4 rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm'>Gram</p>
                  </div>
                </div>
              </div>
              <div className='sm:col-span-6 '>
                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Cara memasak</label>
                <textarea
                  value={text}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Masukkan langkah memasak..."
                  className="w-full h-32 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-400"
                />
              </div>
            </div>
            <div className="mt-5 border rounded-xl w-1/2 mr-28 z-20">
              <div className='p-4'>
                <h2 className=''>Cara Memasak:</h2>
                <div className="overflow-auto min-h-72 max-w-[440px]" style={{ maxHeight: '400px' }}>
                  <ol className='list-decimal ml-9'>
                    {menu.cara_masak.map((langkah, index) => (
                      <li key={index}>{langkah}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='flex justify-center my-10'>
              <table className="table-auto w-[80%] text-center z-20">
                <thead>
                  <tr className='bg-blue-300'>
                    <th>Nama Bahan</th>
                    <th>Jenis Bahan</th>
                    <th>Takaran</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td className='flex z-20  items-center justify-center my-4'>
                        <input
                          type="text"
                          id={`nama_${index}`}
                          name={`nama_${index}`}
                          onChange={(e) => handleChangeBahan(e, index)}
                          value={bahan[index]?.nama || ''} // Accessing the nama property directly
                          className="mx-4 block w-[85%] rounded-md border-0 p-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Kecap manis"
                        />
                      </td>
                      <td className='z-20 my-4 w-1/3'>
                        <Dropdown
                          id={`jenis_${index}`}
                          name={`jenis`}
                          onChange={(e) => handleChangeBahan(e, index)}
                          value={bahan[index]?.jenis || ''}
                        >
                          <option selected disabled value="" >Select Jenis Bahan</option>
                          <option value="pokok">Makanan pokok</option>
                          <option value="lauk">Lauk pauk</option>
                          <option value="buah">Buah</option>
                          <option value="sayuran">Sayuran</option>
                          <option value="lainnya">Lainnya</option>
                        </Dropdown>
                      </td>

                      <td className='flex z-20  items-center justify-center my-4'>
                        <input
                          type="text"
                          id={`jumlah_${index}`}
                          name={`jumlah_${index}`}
                          onChange={(e) => handleChangeBahan(e, index)}
                          value={bahan[index]?.jumlah || ''}
                          className="mx-4 block w-[85%] rounded-md border-0 p-2.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="1 sendok makan"
                        />
                      </td>
                      <td className='z-20'>
                        <div className='flex justify-center items-center mx-6'>
                          <button className=' text-white p-2 rounded-lg ' type='button' onClick={() => handleRemoveRow(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary z-50">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                          <button type="button" onClick={handleAddRow} className=' text-white p-2 rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-primary">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {
        showNotificationSukses && (

          <div className="flex fixed z-50 item-center top-5 right-[400px] p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
            <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
            <div>
              <span className="flex items-center h-auto m-2 font-medium">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.</span>
            </div>
          </div>

        )
      }
      {
        showNotificationGagal && (
          <div className="flex fixed items-center z-50 top-5 right-[400px] p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
            <CgDanger className='text-2xl m-2' />
            <div>
              <span className="font-medium m-2">Silahkan login atau cek Meal-planning.</span>
            </div>
          </div>
        )
      }
    </div>
    // </div >
  );
}

export default Menu;