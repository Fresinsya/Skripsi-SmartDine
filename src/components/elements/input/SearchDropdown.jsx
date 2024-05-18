import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";

const getMenu = async (jenis) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu/search?jenisBahan=${jenis}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};



const SearchDropdown = ({ onSelectedFoodChange, jenis, dataBenar, setDataBenar }) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedFood, setSelectedFood] = useState("");
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [allFoods, setAllFoods] = useState([]);

    const { isLoading, data, refetch } = useQuery({
        queryKey: ["menu", jenis], // Menambahkan jenis sebagai bagian dari queryKey
        queryFn: () => getMenu(jenis),
        refetchIntervalInBackground: 1000,

    });

    useEffect(() => {
        if (!isLoading && data) {
            setMenu(data.data);
        }
    }, [data, isLoading]);

    // Fungsi untuk mereload data ketika jenis berubah
    useEffect(() => {
        refetch();
    }, [jenis, refetch]);
    // console.log(menu);

    useEffect(() => {
        if (data) {
            const filterData = data.data;
            const bahanPokok = filterData.flatMap(makanan => makanan.bahan.filter(bahan => bahan.jenis.includes(jenis)));

            // Hapus duplikat berdasarkan nama bahan
            const uniqueBahanPokok = bahanPokok.filter((bahan, index, self) => (
                index === self.findIndex((t) => (
                    t.nama.toLowerCase() === bahan.nama.toLowerCase()
                ))
            ));

            setFilteredFoods(uniqueBahanPokok);
            setAllFoods(uniqueBahanPokok);
        }
    }, [data, jenis]);

    // console.log("namama",filteredFoods)

    const handleOpen = () => {
        setOpen(!open);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value.toLowerCase();
        setInputValue(value);

        // const allFoods = menu.flatMap(data => data.nama);
        // console.log(allFoods)

        if (value === "") {
            setFilteredFoods(allFoods); // Kembali ke semua data makanan ketika input kosong
        } else {
            const filtered = filteredFoods.filter(data => data.nama.toLowerCase().includes(value));
            setFilteredFoods(filtered);
        }
        // setInputValue(event.target.value);
        // const filtered = filteredFoods.filter(data => data.nama.toLowerCase().includes(event.target.value.toLowerCase()));
        // setFilteredFoods(filtered);
    };

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    // const filteredMenu = menu.filter((item) =>
    //     item.menu.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    const handleItemClick = (data) => {
        handleOpen(false);
        const isDuplicate = selectedFood.some(item => item.nama === data.nama);
        if (!isDuplicate) {
            const updatedSelectedFood = [...selectedFood, data];
            setSelectedFood(updatedSelectedFood);
            setDataBenar(prev => [...prev, { jenis: jenis, nama: data.nama }]);
            onSelectedFoodChange(updatedSelectedFood);
            setInputValue("");
        } else {
            alert("Data sudah ada dalam daftar!");
        }
    };


    console.log(filteredFoods)
    console.log(selectedFood)

    return (
        <div className="relative font-medium">
            <button
                type="button"
                onClick={handleOpen}
                className={`bg-gray-100 w-full border border-blue-500 shadow-lg p-3 flex items-center justify-between rounded-lg ${!selectedFood && "text-gray-700"
                    }`}
            >
                {selectedFood
                    ? selectedFood.length > 25
                        ? selectedFood.substring(0, 25) + "..."
                        : selectedFood
                    : "Select Food"}
                <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
            </button>
            {open && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded border border-gray-300 shadow-md">
                    <div className="flex items-center p-2">
                        <AiOutlineSearch size={18} className="text-gray-700" />
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleSearchChange}
                            placeholder="Search food"
                            className="placeholder-gray-700 p-2 ml-2 w-full outline-none"
                        />
                    </div>
                    <ul className="overflow-y-auto max-h-48">
                        {filteredFoods.map((data) => {
                            return (

                                <li
                                    key={data._id}
                                    className={`p-2 text-sm hover:bg-sky-600 hover:text-white ${data.nama === selectedFood && "text-black"}`}
                                    onClick={() => {
                                        handleOpen(false);
                                        setSelectedFood(data.nama);
                                        setDataBenar(prev => ([...prev, { jenis: jenis, nama: data.nama }]));
                                        onSelectedFoodChange(data.nama);
                                    }}
                                >
                                    {data.nama}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;
