import React from 'react'

const Dropdown = ({title , options, fun}) => {
  return (
    <div className='select mx-16'>
          <select defaultValue="0" onChange={fun} name='format' id='format'>
            <option value="0" disabled>
             {title}
            </option>
            {options.map((item, index)=>(
                 <option key={index} value={item}>
                    {item.toUpperCase()}
                 </option>
            ))}

          </select>
        </div>
  )
}

export default Dropdown