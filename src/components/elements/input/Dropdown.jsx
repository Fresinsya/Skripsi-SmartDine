import React from 'react'

const Dropdown = (props) => {
    const { children, id, title , onChange, name, value} = props
    // const { children, id, title , onChange, name, value} = props
    return (
        <div>
            <label for={id} className="block text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <select defaultValue="" value={value}
                className="bg-white border-x-transparent border-t-transparent border-b-blue-700 border-2 text-gray-900 text-sm rounded-lg w-full  focus:bg-white focus:border-b-primary focus:border-x-transparent focus:border-t-transparent focus:ring-transparent"
                onChange={onChange} name={name}
                id={id}
                >
                {children}
            </select>
        </div>
    )
}


export default Dropdown