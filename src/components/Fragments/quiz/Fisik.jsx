import React, { useEffect, useState } from 'react'
import Input from '../../elements/input/Input';
import Dropdown from '../../elements/input/Dropdown';
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { CgDanger } from 'react-icons/cg';
import { useMutation, useQuery } from 'react-query';
import Loading from '../Loading';
import ModalDataRiwayat from '../ModalDataRiwayat';


const postKalori = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/process-data/${id}`, {
        method: 'POST',
        // body: JSON.stringify(),
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    });

    const data = await response.json();
    return data;
}

const getRiwayat = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/riwayat/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
}



const Fisik = ({ riwayat, handleChange, handleSukses }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [showNotificationGagal, setShowNotificationGagal] = useState(false);
    const [showNotificationTidakLengkap, setShowNotificationTidakLengkap] = useState(false);
    const [showNotificationPeriode, setShowNotificationPeriode] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [dataRiwayat, setDataRiwayat] = useState([{}]);
    const [length, setLength] = useState(0);
    const [formLengkap, setFormLengkap] = useState(false);
    // const [kalori, setKalori] = useState(0);



    const id = localStorage.getItem('id');

    useEffect(() => {
        if (riwayat && riwayat.data) {
            setDataRiwayat(riwayat.data)
        }
    }, [riwayat]);

    console.log("riwayat:", dataRiwayat)



    const { mutate, data, isLoading } = useMutation({
        mutationKey: "postKalori",
        mutationFn: () => postKalori(id),

        onError: (error) => {
            console.log(error)
        },
        onSuccess: (data) => {
            setShowNotification(true);
            console.log("kalori :", data)
            window.location.reload();
        }
    });

    // console.log("riwayat:" ,riwayat.data.SCC)

    const handleTidakLogin = () => {
        setShowNotificationGagal(true);
        // setRedirecting(true);
    };



    // console.log("data fisik:", dataRiwayat.tgl_selesai)

    // console.log("data riwayattttt:", length)

    useEffect(() => {
        if (dataRiwayat && dataRiwayat.tgl_selesai) {
            const tglSelesai = new Date(dataRiwayat.tgl_selesai).toISOString().split('T')[0];
            // console.log("tgl selesai:", tglSelesai);
            setLength(Object.keys(dataRiwayat).length);
        }
    }, [dataRiwayat]);

    // console.log(length)

    const currentDate = new Date(); // Tanggal saat ini
    // const tglSelesai = new Date(dataRiwayat.tgl_selesai);
    // console.log("tgl selesai:", tglSelesai);
    const handleSaveChange = async () => {
        if (Array.isArray(dataRiwayat) && dataRiwayat.length === 1 && Object.keys(dataRiwayat[0]).length === 0 && isLogin === true) {
            // console.log('riwayat is an array with an empty object');
            // alert("ini post");
            // setShowNotification(true);
            await handleSukses();
            mutate();
            console.log("kirim dari fisikkkk ke quiz");
        } else {
            const tglSelesai = new Date(dataRiwayat.tgl_selesai); // Tanggal selesai dari dataRiwayat

            if (tglSelesai <= currentDate) {
                if (formLengkap === true) {
                    // alert("Data sudah lengkap");
                    // setRedirecting(true);
                    await handleSukses();
                    mutate();

                } else {
                    // alert("Data belum lengkap2");
                    setShowNotificationTidakLengkap(true);
                }
            } else {
                // alert("Periode masih berjalan");
                setShowNotificationPeriode(true);
            }

        }

    };
    const checkIfAllKeysExist = (keysToCheck) => {
        for (const key of keysToCheck) {
            if (!riwayat.hasOwnProperty(key)) {
                setFormLengkap(false);
                return false;
            }
        }
        setFormLengkap(true);
        return true;
    };

    // Specify the 10 keys to check
    const keysToCheck = ['FACV', 'FCVC', 'NCP', 'CAEC', 'CH20', 'SCC', 'FAF', 'TUE', 'CALC', 'MTRANS'];


    useEffect(() => {
        const allKeysExist = checkIfAllKeysExist(keysToCheck);
        console.log("sudah lengkap", allKeysExist);
        console.log("riwayta berubahhahhahahahha")
    }, [riwayat]);


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
        if (showNotificationTidakLengkap) {
            timeout = setTimeout(() => {
                setShowNotificationTidakLengkap(false);
            }, 2000); // 5000 milidetik = 5 detik
        }
        return () => clearTimeout(timeout);
    }, [showNotificationTidakLengkap]);

    useEffect(() => {
        let timeout;
        if (showNotificationPeriode) {
            timeout = setTimeout(() => {
                setShowNotificationPeriode(false);
            }, 2000); // 5000 milidetik = 5 detik
        }
        return () => clearTimeout(timeout);
    }, [showNotificationPeriode]);


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

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLogin");
        setIsLogin(loginStatus === "true");
    }, []);


    return (
        <div>
            {isLoading && <Loading />}
            <div className="relative z-40 my-4 mx-auto ">
                {/*content*/}
                <div className=" rounded-lg  relative flex flex-col w-full outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 rounded-t">
                        <h3 className="text-xl flex justify-center w-full font-bold">
                            Riwayat Data Kebiasaan
                        </h3>
                    </div>
                    <div>
                        <form>
                            <div className=''>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 px-6 pt-6">
                                    <ModalDataRiwayat
                                        id='SCC'
                                        title='Proses Defisit Kalori'
                                        title2='Proses Defisit Kalori'
                                        name="SCC"
                                        onChange={handleChange}
                                        detail="Makanan dengan kalori tinggi adalah makanan yang mengandung jumlah energi yang signifikan per porsi atau berat tertentu. Kalori di dalam makanan berasal dari tiga sumber utama: karbohidrat, protein, dan lemak. 
                                        Makanan dengan kandungan lemak yang tinggi cenderung memiliki lebih banyak kalori dibandingkan dengan makanan yang terutama terdiri dari karbohidrat atau protein karena setiap gram lemak mengandung 9 kalori, sedangkan karbohidrat dan protein masing-masing hanya mengandung 4 kalori per gram.
                                        Contoh makanan dengan kalori tinggi: <br> 1. makanan berminyak <br> 2. kacang-kacangan <br> 3. daging merah <br> 4. makanan cepat saji <br> 5. makanan manis <br> 6. makanan berlemak <br>"
                                    >
                                        <option value="" disabled>Pilih disini</option>
                                        <option value="0" >no</option>
                                        <option value="1" >yes</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                        id='FAF'
                                        title='Aktifitas Fisik'
                                        title2='Aktifitas Fisik'
                                        onChange={handleChange}
                                        name="FAF"
                                        detail="Aktivitas fisik adalah gerakan tubuh yang dilakukan oleh otot-otot tubuh yang membutuhkan energi. Aktivitas fisik dapat membantu meningkatkan kesehatan jantung, meningkatkan kekuatan otot, meningkatkan fleksibilitas, dan meningkatkan kesehatan mental. Aktivitas fisik juga dapat membantu menurunkan berat badan, meningkatkan kesehatan tulang, dan meningkatkan kesehatan mental. Aktivitas fisik yang teratur dapat membantu mencegah penyakit jantung, diabetes, dan kanker."
                                    >
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">Sedikit beraktivitas, tidak berolahraga</option>
                                        <option value="1">Olahraga ringan 1-3 kali dalam seminggu</option>
                                        <option value="2">Olahraga ringan 6-7 kali dalam seminggu</option>
                                        <option value="3">Olahraga berat setiap hari atau 2 kali dalam sehari</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                        id='TUE'
                                        title='Durasi Penggunaan Elektronik'
                                        onChange={handleChange}
                                        name="TUE"
                                        title2='Durasi Penggunaan Elektronik'
                                        detail="Penggunaan elektronik yang berlebihan dapat menyebabkan berbagai masalah kesehatan, termasuk gangguan tidur, gangguan penglihatan, dan masalah postur tubuh. Penggunaan elektronik yang berlebihan juga dapat menyebabkan masalah kesehatan mental, seperti depresi dan kecemasan. Penggunaan elektronik yang berlebihan juga dapat menyebabkan masalah kesehatan fisik, seperti obesitas dan penyakit jantung."
                                    >
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">0 - 2 jam</option>
                                        <option value="1">3 - 5 jam</option>
                                        <option value="2">lebih dari 5 jam</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                        id='MTRANS'
                                        title='Transportasi Harian'
                                        onChange={handleChange}
                                        name="MTRANS"
                                        title2='Transportasi Harian'
                                        detail="Transportasi harian adalah cara seseorang bergerak dari satu tempat ke tempat lain. Transportasi harian dapat dilakukan dengan berjalan kaki, bersepeda, menggunakan kendaraan pribadi, atau menggunakan transportasi umum. Pilihan transportasi harian seseorang dapat mempengaruhi kesehatan fisik dan mentalnya. Berjalan kaki dan bersepeda adalah cara yang baik untuk meningkatkan kesehatan fisik, sedangkan menggunakan kendaraan pribadi atau transportasi umum dapat mempengaruhi kesehatan fisik dan mental seseorang."
                                    >
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">Mobil</option>
                                        <option value="1">Motor</option>
                                        <option value="2">Sepeda</option>
                                        <option value="3">Jalan kaki</option>
                                        <option value="4">Transportasi Umum</option>
                                    </ModalDataRiwayat>
                                    {/* </div> */}
                                    {/* <div className="grid gap-6 mb-6 md:grid-cols-2 px-6 pt-6"> */}
                                    <ModalDataRiwayat 
                                    id='FACV' 
                                    title='Konsumsi Kalori Tinggi' 
                                    required 
                                    name="FACV" 
                                    onChange={handleChange}
                                    detail="Makanan dengan kalori tinggi adalah makanan yang mengandung jumlah energi yang signifikan per porsi atau berat tertentu. Kalori di dalam makanan berasal dari tiga sumber utama: karbohidrat, protein, dan lemak.
                                    Makanan dengan kandungan lemak yang tinggi cenderung memiliki lebih banyak kalori dibandingkan dengan makanan yang terutama terdiri dari karbohidrat atau protein karena setiap gram lemak mengandung 9 kalori, sedangkan karbohidrat dan protein masing-masing hanya mengandung 4 kalori per gram.
                                    Contoh makanan dengan kalori tinggi: <br> 1. makanan berminyak <br> 2. kacang-kacangan <br> 3. daging merah <br> 4. makanan cepat saji <br> 5. makanan manis <br> 6. makanan berlemak <br>"
                                    title2='Konsumsi Makanan Kalori Tinggi' 
                                    >
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">no</option>
                                        <option value="1">yes</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat 
                                    id='FCVC' 
                                    title='Konsumsi Sayuran Harian' 
                                    required 
                                    onChange={handleChange} 
                                    name="FCVC"
                                    title2='Konsumsi Sayuran Harian'
                                    detail="Sayuran adalah sumber yang kaya akan vitamin, mineral, serat, dan antioksidan. Sayuran dapat membantu meningkatkan kesehatan jantung, meningkatkan kesehatan pencernaan, dan meningkatkan kesehatan kulit. Sayuran juga dapat membantu menurunkan berat badan, meningkatkan kesehatan tulang, dan meningkatkan kesehatan mental. Sayuran yang kaya akan serat dapat membantu menurunkan risiko penyakit jantung, diabetes, dan kanker."
                                    >
                                        <option value="" selected >Pilih disini</option>
                                        <option value="1">Tidak pernah</option>
                                        <option value="2">Kadang - kadang</option>
                                        <option value="3">Selalu mengkonsumsi</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                    title2='Total Makan Utama'
                                    detail="Makanan utama adalah makanan yang dikonsumsi sebagai bagian dari makanan utama seseorang. Makanan utama biasanya terdiri dari nasi, roti, pasta, atau sumber karbohidrat lainnya, serta protein dan sayuran. Makanan utama adalah sumber energi yang penting bagi tubuh dan harus dikonsumsi dalam jumlah yang cukup untuk memenuhi kebutuhan energi harian seseorang."
                                     id='NCP' title='Total Makan Utama' required onChange={handleChange} name="NCP">
                                        <option value="" selected >Pilih disini</option>
                                        <option value="1">1 x makan</option>
                                        <option value="2">2 x makan</option>
                                        <option value="3">3 x makan</option>
                                        <option value="4">4 x makan</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                    title2='Konsumsi Camilan'
                                    detail="Camilan adalah makanan ringan yang biasanya dikonsumsi di antara waktu makan utama. Camilan dapat berupa makanan manis, makanan asin, atau makanan sehat lainnya. Camilan yang sehat dapat membantu meningkatkan asupan nutrisi seseorang, sementara camilan yang tidak sehat dapat menyebabkan penambahan berat badan dan masalah kesehatan lainnya."
                                     id='CAEC' title='Konsumsi Camilan' required onChange={handleChange} name="CAEC">
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">Tidak Pernah</option>
                                        <option value="1">Sering mengkonsumsi</option>
                                        <option value="2">Kadang - kadang</option>
                                        <option value="3">Selalu mengkonsumsi</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                    title2='Konsumsi Air Harian'
                                    detail="Air adalah zat yang sangat penting bagi tubuh manusia. Air membantu menjaga suhu tubuh, menghilangkan racun dari tubuh, dan membantu tubuh dalam proses pencernaan. Air juga membantu menjaga kesehatan kulit, rambut, dan kuku. Kebutuhan air harian seseorang bervariasi tergantung pada berbagai faktor, termasuk usia, jenis kelamin, dan tingkat aktivitas fisik."
                                     id='CH20' title='Konsumsi Air Harian' required onChange={handleChange} name="CH20">
                                        <option value="" selected >Pilih disini</option>
                                        <option value="1">1 liter</option>
                                        <option value="2">2 liter</option>
                                        <option value="3">3 liter</option>
                                    </ModalDataRiwayat>
                                    <ModalDataRiwayat
                                    title2='Konsumsi Alkohol'
                                    detail="Konsumsi alkohol yang berlebihan dapat menyebabkan berbagai masalah kesehatan, termasuk kerusakan hati, kerusakan otak, dan peningkatan risiko penyakit jantung. Konsumsi alkohol yang berlebihan juga dapat menyebabkan masalah kesehatan mental, seperti depresi dan kecemasan. Konsumsi alkohol yang berlebihan juga dapat menyebabkan masalah kesehatan fisik, seperti obesitas dan penyakit jantung."
                                     id='CALC' title='Konsumsi Alkohol' required onChange={handleChange} name="CALC">
                                        <option value="" selected >Pilih disini</option>
                                        <option value="0">Tidak Pernah</option>
                                        <option value="1">Sering mengkonsumsi</option>
                                        <option value="2">Kadang - kadang</option>
                                        <option value="3">Selalu mengkonsumsi</option>
                                    </ModalDataRiwayat>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/*footer*/}
                    <div className="flex items-center justify-end py-2 px-5  rounded-b">
                        <button
                            // type="submit"
                            className='bg-primary flex items-center gap-2 hover:border-blue-400 active:border border-4 text-white z-30 font-bold text-sm px-4 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                            onClick={!isLogin ? handleTidakLogin : handleSaveChange}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
            {showNotification && (

                <div class="flex fixed z-50 item-center top-5 right-2 p-4 mb-4 text-sm text-white border border-green-500 rounded-full bg-green-500 dark:bg-gray-800 dark:text-white dark:border-green-500" role="alert">
                    <IoCheckmarkDoneCircle className='text-2xl m-1.5' />
                    <div>
                        <span class="flex items-center h-auto m-2 font-medium">Data yang Anda lakukan telah berhasil disimpan ke dalam sistem.<br /> data tidak dapat diubah selama masa periode.</span>
                    </div>
                </div>

            )}
            {showNotificationTidakLengkap && (
                <div class="flex fixed items-center z-50 top-5 right-2 p-4 mb-4 text-sm text-white border border-yellow-400 rounded-full bg-yellow-400 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                    <CgDanger className='text-2xl m-2' />
                    <div>
                        <span class="font-medium m-2">Data belum lengkap, silahkan isi data terlebih dahulu.</span>
                    </div>
                </div>
            )}

            {showNotificationPeriode && (
                <div class="flex fixed items-center z-50 top-5 right-2 p-4 mb-4 text-sm text-white border border-red-400 rounded-full bg-red-400 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                    <CgDanger className='text-2xl m-2' />
                    <div>
                        <span class="font-medium m-2">Periode masih belom terlampaui.</span>
                    </div>
                </div>
            )}

            {showNotificationGagal && (
                <div class="flex fixed items-center z-50 top-5 right-2 p-4 mb-4 text-sm text-white border border-red-500 rounded-full bg-red-500 dark:bg-gray-800 dark:text-white dark:border-red-500" role="alert">
                    <CgDanger className='text-2xl m-2' />
                    <div>
                        <span class="font-medium m-2">Silahkan login terlebih dahulu untuk melanjutkan.</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Fisik