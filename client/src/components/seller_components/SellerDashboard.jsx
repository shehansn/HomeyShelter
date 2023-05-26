import React from 'react'
import TotalCustomers from './TotalCustomers'
import TotalProfit from './TotalProfit'
import TotalWorkItems from './TotalWorkItems'
import LatestWorkItems from './LatestWorkItems'
import LatestOrders from './LatestOrders'
import { useStateValue } from '../../context/StateProvider'
import SellerNotificationContainer from './SellerNotificationContainer'


const SellerDashboard = () => {
  const [{ workItems, cartShow, favSectionShow ,notificationShow,user,seller}, dispatch] = useStateValue();
  return (
    <div className='flex flex-col'>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-4 lg:mt-5">
        <div><TotalCustomers/> </div>
        <div><TotalWorkItems  /></div>
        <div><TotalProfit/></div>
        <div>111</div>
      </div>
      {/* <div  className="grid lg:grid-cols-2 grid-cols-1  gap-4 lg:mt-5">
        <div><LatestSales/></div>
        <div> <TrafficByDevice/></div>
      </div> */}
      <div  className="grid lg:grid-cols-2 grid-cols-1  gap-4 lg:mt-5">
        <div><LatestWorkItems/></div>
        <div> <LatestOrders/></div>
      </div>
      {seller && notificationShow &&  <SellerNotificationContainer/> }

    </div>
  )
}

export default SellerDashboard
