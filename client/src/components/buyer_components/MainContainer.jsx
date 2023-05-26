import React, { useEffect, useState } from 'react'

import HomeContainer from './HomeContainer';
import { useStateValue } from '../../context/StateProvider';
import NotificationsContainer from './NotificationsContainer';

const MainContainer = () => {
  const [{ workItems, cartShow, favSectionShow ,notificationShow,user}, dispatch] = useStateValue();

  const [scrollValue, setScrollValue] = useState(0);
  useEffect(() => { }, [scrollValue]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />
     
      {user && notificationShow &&  <NotificationsContainer/> }
      
    </div>
  )
}

export default MainContainer
