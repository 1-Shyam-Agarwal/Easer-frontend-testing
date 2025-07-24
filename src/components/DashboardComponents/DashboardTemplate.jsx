import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import Navbar from '../../Pages/Public_pages/HomePage/Components/Navbar.js'
import { useSelector } from 'react-redux'
// import PlaceOrderModel from '../FuturesScope/OrderDashboardComponents'

const DashboardTemplate = ({children , setShowInkletInfo}) => { 

    // const showOrderModel = useSelector((state) => { return state.placeOrder.showOrderModel});
    
  return (
    <div className='grid  relative grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen overflow-hidden'>

        <div className='col-span-2'>
            <Navbar setShowInkletInfo={setShowInkletInfo}/>
        </div>

        <div className='h-full overflow-hidden'>
            <DashboardSidebar className="col-start-1"/>
        </div>

        <div className='h-full overflow-x-hidden overflow-y-auto'>
            {children}
        </div>

        {/* <div>
            <PlaceOrderModel/>
        </div> */}
        <div>

        </div>
        
    </div>
  )
}

export default DashboardTemplate