import React from 'react'
import ModalDataRiwayat from '../../Fragments/ModalDataRiwayat'

const Dropdown = (props) => {
    const { children, id, title , onChange, name, value} = props
    // const { children, id, title , onChange, name, value} = props
    return (
        <div>
            <label for={id} className="block md:text-sm text-xs font-medium text-gray-900 dark:text-white">
                {title}
            </label>
            
            <select defaultValue="" value={value}
                className="bg-white overflow-x-auto border-x-transparent border-t-transparent border-b-blue-700 border-2 text-gray-900 md:text-sm text-xs rounded-lg w-full  focus:bg-white focus:border-b-primary focus:border-x-transparent focus:border-t-transparent focus:ring-transparent"
                onChange={onChange} name={name}
                id={id}
                >
                {children}
            </select>
        </div>
    )
}


export default Dropdown