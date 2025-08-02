import React from 'react'

const ShowInkletInfo = ({setShowModal}) => {
  return (
     <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
        <div className='bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center'>
        <h2 className='text-lg font-semibold mb-2'>Inklets Info</h2>
        <p className='text-sm text-gray-700 mb-4'>
            Inklets are Easer’s currency—earned through remote prints and used in the Easer Store. Stay tuned!
        </p>
        <button
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
            onClick={() => setShowModal(false)}
        >
            Got it!
        </button>
        </div>
    </div>
  )
}

export default ShowInkletInfo