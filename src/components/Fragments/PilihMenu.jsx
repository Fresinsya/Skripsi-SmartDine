// PilihMenu.js
import React, { useEffect, useState } from 'react';
import SearchDropdown from '../elements/input/SearchDropdown';
import SuksesMenu from '../elements/button/SuksesMenu';
import { useMutation, useQuery } from 'react-query';

const postBahan = async (bahan) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/meal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bahan),
  });
  const data = await response.json();
  return data;
};


const PilihMenu = ({ onSelectedOptionsChange, title, children, id, jenis }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [dataBenar, setDataBenar] = useState([]);

  const iduser = localStorage.getItem('id');

  // const [meal, setMeal] = useState({});

  const [bahan, setBahan] = useState({
    IdUser: iduser,
    bahan: [],
  });


  const { mutate, isPending } = useMutation({
    mutationKey: "postBahan",
    mutationFn: postBahan,
    onSuccess: () => {
      console.log('Riwayat berhasil!')
    }
  });

  // console.log(dataBenar)

  const handleChange = (event) => {
    setBahan({
      ...bahan,
      [event.target.name]: event.target.value,
    });
  }

  const handleClick = () => {
    setIsClicked(true);
    setShowModal(true);
  };


  const handleTampilOption = (selectedFood) => {
    setSelectedOptions([...selectedOptions, selectedFood]);
  }


  const handleRemoveOption = (index) => {
    const updatedOptions = selectedOptions.filter((_, i) => i !== index);
    setSelectedOptions(updatedOptions);

    const updatedDataBenar = dataBenar.filter((_, i) => i !== index);
    setDataBenar(updatedDataBenar);
  }

  const handleSelectedOptionsChange = async () => {
    onSelectedOptionsChange(selectedOptions);
    // console.log({ ...bahan, bahan: dataBenar })
    mutate({ ...bahan, bahan: dataBenar })
  };

  // console.log(dataBenar)



  return (
    <>
      <button
        id={id}
        className={`bg-primary flex items-center gap-2  hover:border-blue-400 md: active:border border-4 text-white z-30 font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${isClicked ? 'border-red-500 border-x-transparent border-t-transparent' : ''}`}
        type="button"
        // jenis={jenis}
        onClick={handleClick}
      >
        {children}
        {title && window.innerWidth >= 640 && <span>{title}</span>}
      </button>
      {showModal ? (
        <div className='z-50'>
          <div
            className="justify-center z-50 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
          >
            <div className="relative w-2/3 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Bahan Makanan</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="w-11/12 mt-3 mx-auto z-30">
                  <SearchDropdown dataBenar={dataBenar} setDataBenar={setDataBenar} onSelectedFoodChange={handleTampilOption} jenis={jenis} />
                  <div className='p-2'>
                    {selectedOptions.length > 0 && (
                      <div className="mt-4">
                        <h3 className='ml-2 font-bold'>{title}:</h3>
                        <ul className='ml-2 p-2 grid md:grid-cols-3'>
                          {selectedOptions.map((option, index) => (
                            <li key={index} className='flex items-center gap-3 font-medium'>
                              <p className='w-4 h-4 rounded-xl bg-primary' />
                              {option}
                              <button
                                className="text-red-500 "
                                type="button"
                                onClick={() => handleRemoveOption(index)}
                              > x </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)} // Tutup modal tanpa melakukan apa pun
                  >
                    Close
                  </button>
                  <div className='flex items-center gap-6 mr-4'>
                    {/* Mengirim handleSelectedOptionsChange sebagai properti onClick */}
                    <SuksesMenu title='Save Change' onClick={handleSelectedOptionsChange} selectedOptions={selectedOptions} onchange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </>
  );
};

export default PilihMenu;
