import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from '@mui/material/styles';
import { useStateValue } from './context/StateProvider';
import { getAllWorkItems,getAllTaskers,getAllUsers,getAllOrders,getAllFeedbacks } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
import { registerChartJs } from './utils/register-chart-js';
import { theme } from './theme';

import SellerFooter from './components/seller_components/SellerFooter';
import Footer from './components/buyer_components/Footer';
import MainContainer from './components/buyer_components/MainContainer';
import SellerDashboard from './components/seller_components/SellerDashboard';
import Header from './components/buyer_components/Header';
import SellerHeader from './components/seller_components/SellerHeader';
import ServicesPage from './pages/buyer_pages/ServicesPage';
import ViewWorkItemBuyer from './pages/buyer_pages/ViewWorkItemBuyer';
import AboutUs from './pages/buyer_pages/AboutUs';
import ErrorContainer from './pages/buyer_pages/ErrorPage';
import CreateContainer from './pages/seller_pages/CreateContainer';
import WorkItemsContainer from './pages/seller_pages/WorkItemsContainer';
import OrdersPage from './pages/seller_pages/OrdersPage';
import ChatPage from './components/buyer_components/ChatPage';
import SellerChat from './components/seller_components/SellerChat';
import OrderPage from './pages/buyer_pages/orderPage';
import SumbitDetails from './pages/buyer_pages/SumbitDetails';
import PaymentPage from './pages/buyer_pages/PaymentPage';
import CheckoutSuccess from './components/buyer_components/CheckoutSuccess';
import TaskerProfile from './components/buyer_components/taskerProfile';
import FeedBackContainer from './components/buyer_components/FeedBackContainer';
import ContactUs from './components/buyer_components/ContactUs';

registerChartJs();

const App = () => {
  const [{ workItems, taskerInfo,seller, user ,feedbacks}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllWorkItems().then((data) => {
      dispatch({
        type: actionType.SET_WORK_ITEMS,
        workItems: data,
      });
    });
  };

  const getTaskers = async () => {
    await getAllTaskers().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_TASKERS,
        taskerInfo: data,
      });
    });
  };

  
  const getUsers = async () => {
    await getAllUsers().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_USERS,
        users: data,
      });
    });
  };
 
  const getOrders = async () => {
    await getAllOrders().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };
 
  const getFeedbacks = async () => {
    await getAllFeedbacks().then((data) => {
      console.log(data);
      dispatch({
        type: actionType.SET_FEEDBACKS,
        feedbacks: data,
      });
    });
  };
  useEffect(() => {
    fetchData();
    getTaskers();
    getUsers();
    getOrders();
    getFeedbacks();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!seller) {
      return <Navigate to="/" />;
    }
    return children
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-[#FAF9F6]">
        {!seller ? (
           <Header />
        ) : (
          <SellerHeader />
        )}

        <ThemeProvider theme={theme}>
          {seller ? (

            <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
              {user ? (
                <Routes>

                  <Route path="/*" element={<WorkItemsContainer />} />
                  <Route path="/createItem" element={<CreateContainer />} />
                  <Route path="/workItems" element={<WorkItemsContainer />} />
                  <Route path="/orders" element={<OrdersPage />} /> 
                  <Route path="/chatBuyer" element={<SellerChat />} />
                </Routes>
              ) : (<div>need to login to become seller</div>)}
            </main>

          ) : (
            <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
              <Routes>

                <Route path="/*" element={<MainContainer />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path='/viewWorkItem/:id' element={<ViewWorkItemBuyer />} />
                <Route path="/orders/:id" element={<OrderPage />} /> 
                <Route path='/chat/:id' element={<ChatPage />} />  
                <Route path='/submitDetails' element={<SumbitDetails />} /> 
                <Route path='/payment' element={<PaymentPage />} /> 
                <Route path='/checkoutSuccess' element={<CheckoutSuccess />} /> 
                <Route path='/profile' element={<TaskerProfile />} /> 
                <Route path='/addFeedback/:id' element={<FeedBackContainer />} /> 
                <Route path='/contactUs' element={<ContactUs />} /> 
                <Route path="/createItem" element={<ErrorContainer />} /> 
                
              </Routes>
            </main>
          )}
        </ThemeProvider>
        {!seller ? (
          <Footer/>
        ) : (
           <SellerFooter />
    
        )}
      </div>
    </AnimatePresence>
  )
}

export default App
