import React from 'react'
import DashboardSidebar from './DashboardSidebar'
import Navbar from '../../Pages/Public_pages/HomePage/Components/Navbar'
import { useSelector } from 'react-redux'
import PlaceOrderModel from '../OrderDashboardComponents/PlaceOrderModel'

const DashboardTemplate = ({children}) => { 

    const showOrderModel = useSelector((state) => { return state.placeOrder.showOrderModel});
    
  return (
    <div className='grid  relative grid-cols-[auto_1fr] grid-rows-[auto_1fr] h-screen overflow-hidden'>
        <div className='row-span-2 '>
            <DashboardSidebar/>
        </div>

        <div>
            <Navbar/>
        </div>

        <div className='self-stretch overflow-y-auto overflow-x-hidden'>
            {children}
        </div>

        <div>
            <PlaceOrderModel/>
        </div>
        
    </div>
  )
}

export default DashboardTemplate