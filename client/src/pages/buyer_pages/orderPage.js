import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useStateValue } from '../../context/StateProvider';
import {
  collection, doc, getDocs, orderBy, query, setDoc, onSnapshot,
  updateDoc, serverTimestamp, where, getDoc
} from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { actionType } from '../../context/reducer';


const INITIAL_STATE = {
  plumbingItem: '',
  projectType: '',
  isEmergency: false,
  problemType: '',
  itemsNeeded: [],
  locationType: '',
  projectStatus: '',
  completionDate: '',
  projectDescription: '',
};

function OrderPage() {

  //const params = useParams()
  const { id } = useParams();
  console.log("id", id);

  const [{ workItems, users, orderInformation, BuyerInformation }, dispatch] = useStateValue();
  const [userInfo, setUserInfo] = useState('')
  const [taskerInfo, setTaskerInfo] = useState('')
  const [workItemData, setWorkItemData] = useState('')

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    console.log("userinfo", userInfo);
    setUserInfo(userInfo);
    //handleLoad();
  }, []);

  useEffect(() => {
    filterUserData();

  }, []);

  const filterUserData = async () => {
    const data = workItems?.filter(workItem => workItem.id === id);
    console.log("work item data", data);
    setWorkItemData(data)
    console.log("data useremail", data[0]?.userEmail);
    // getall taskers
    const taskers = await getDocs(
      query(collection(firestore, "taskerInfo"))
    );
    const taskersinfo = taskers.docs.map((doc) => doc.data());

    const taskerData = taskersinfo?.filter(userinfo => userinfo.email === data[0]?.userEmail);
    console.log("taskerinfo filterUserData", taskersinfo);
    console.log("taskerData filterUserData", taskerData);
    setTaskerInfo(taskerData)
    console.log("taskerData uid filterUserData", taskerData[0]?.uid);
  }

  const [formData, setFormData] = useState(INITIAL_STATE);


  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleItemChange = (event, name, value) => {

    console.log('name', name)
    console.log('value', value)
    console.log('event', event.target)
    // check if the checkbox is checked or unchecked
    if (event.target.checked) {
      // add the selected item to the array
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { Name: name, Price: value },
      ]);

      setTotalPrice(parseInt(totalPrice) + parseFloat(value));

    } else {
      // remove the selected item from the array
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.Name !== name)
      );
      setTotalPrice(parseInt(totalPrice) - parseFloat(value));
    }
    console.log("inner", selectedItems)
    console.log("inner", totalPrice)
  };

  console.log("outer selectedItems", selectedItems)
  console.log("outer", totalPrice)

  // useEffect(() => {
  //   dispatch({
  //     type: actionType.SET_ORDER_INFORMATION,
  //     orderInformation: selectedItems,
  //   });
  // }, []);

  const handleSubmit = () => {
    dispatch({
      type: actionType.SET_ORDER_INFORMATION,
      orderInformation: selectedItems, workItemID: id,
    });
    dispatch({
      type: actionType.SET_ITEM_ID,
      itemID: id,
    });
  }
  function scrollToTop() {
    window.scrollTo(0, 0);
  }
  return (
    <div>

      <form>
        <div className="space-y-12 ">

          <div className="border-b border-gray-900/10  lg:grid  lg:grid-cols-2 h-screen">

            <div className="flex flex-col items-center border-r border-gray-900/10 mt-32 ">
              <fieldset className='' >
                <legend className="text-sm font-semibold leading-6 text-gray-900">What plumbing item you looking for? </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">Select one or more of following plumbing item which you need </p>
                <div className="mt-6 space-y-5 ">
                  {workItemData &&
                    workItemData.map((item) => (
                      <div className="flex flex-col gap-x-3">
                        {item.works.map((item2) => (
                          <div className='flex items-center justify-start'>

                            <input

                              onChange={(e) => handleItemChange(e, item2.value2, item2.value3)}
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 text-teal-600 focus:teal-indigo-600"

                            />
                            <label htmlFor={item.uid} className="block text-sm font-medium ml-2 leading-6 text-gray-900">
                              {item2.value2} : {item2.value3} LKR
                            </label>
                          </div>


                        ))}

                      </div>
                    ))}
                </div>
              </fieldset>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link to={'/'} onClick={scrollToTop}>
                  <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                </Link>

                <Link to={'/submitDetails'} onClick={scrollToTop}>
                  <button
                    type="button"
                    className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    Next
                  </button>

                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center mt-32 ">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4 border border-teal-300 p-5 rounded-xl">
                <dt className="text-base leading-7 text-gray-600">Total Cost</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {totalPrice} <span className='text-xl font-normal'>LKR</span>
                </dd>

              </div>
            </div>

          </div>

        </div>
      </form>
    </div>
  )
}

export default OrderPage
