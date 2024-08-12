import React from 'react'

const TableComponent = ({headers,data}) => {
  return (
    <div>

<table className='bg-white border-gray-200 shadow-md rounded-lg overflow-hidden'>
            <thead className='bg-gray-200 text-slate-900'>
              <tr>
                {
                    headers.map(header=><th className='py-2 md:px-4 px-1 text-[15px] md:text-base'>{header}</th>)
                }
              </tr>
            </thead>
          <tbody className='text-slate-900'>
            {
              data && data.map((item) => {
                return(
                <tr key={item._id} className="hover:bg-gray-100 border-b border-gray-200 py-4">
                    {
                        Object.keys(item).map(td=><td className={`py-2 md:px-4 px-1 text-[10px] md:text-[15px] text-slate-900`} key={td}>{item[td]}</td>)
                    }
                </tr>
              )})
              
            }
          </tbody>
        </table>

    </div>
  )
}

export default TableComponent