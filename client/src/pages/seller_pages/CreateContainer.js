import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import {
  Box, Card, Grid, TextField, makeStyles, Container, Button, CardContent, Divider, InputLabel, Switch, CardHeader, MenuItem, setRef, TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
  Hidden,
  Input,
} from '@material-ui/core';
import { MdDescription, MdTitle } from 'react-icons/md';
import { BiCloudUpload } from 'react-icons/bi';
import { AiTwotoneDelete } from 'react-icons/ai';
import { TbSubtask } from 'react-icons/tb';
import { IoIosPricetags } from 'react-icons/io';
import { categories } from "../../utils/data";
import Loader from '../../components/seller_components/Loader';

import { deleteObject, getDownloadURL, ref, uploadBytesResumable, } from "firebase/storage";
import { storage } from "../../firebase.config";
import { getAllWorkItems, saveItem } from "../../utils/firebaseFunctions";

import { useStateValue } from '../../context/StateProvider';
import { actionType } from "../../context/reducer";

import Autocomplete from '@material-ui/lab/Autocomplete';

import { plumbingWorks } from "../../utils/data";
import { electricWorks } from "../../utils/data";


import { plumbingWorks2 } from "../../utils/data";
import { electricWorks2 } from "../../utils/data";

import { useNavigate  } from 'react-router-dom';

const CreateContainer = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setimageFile] = useState();
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [storedImage, setStoredImage] = useState(null);
  const [workItemData, setworkItemData] = useState(["data"]);

  const [plumbingWork, setplumbingWork] = useState();
  const [electricWork, setelectricWork] = useState();
  const [selectedPlumbingWork, setSelectedPlumbingWork] = useState();
  const [selectedPlumbingWork2, setSelectedPlumbingWork2] = useState();

  const [selectedElectricWork, setSelectedElectricWork] = useState();
  const [selectedElectricWork2, setSelectedElectricWork2] = useState();


  const [{ user, workItems }, dispatch] = useStateValue();

  //const history = useHistory(); // Get history object from react-router-dom
  const navigate = useNavigate();
  useEffect(() => {
    // Cleanup function
    return () => {
      // Cancel any asynchronous tasks or subscriptions here
      // to prevent memory leaks

    };
  }, []);
  // Get current timestamp
  const timestamp = new Date().getTime();
  // Format timestamp into time string
  const timeString = new Date(timestamp).toLocaleTimeString();
  const dateString = new Date(timestamp).toLocaleDateString();

  const setImageToUpload = (e) => {
    setIsLoading(false);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      const base64data = reader.result;
      //localStorage.setItem("BannerImage", base64data);
      setStoredImage(base64data);
    };

    setimageFile(e.target.files[0]);
    const imageUrl = `Images/${Date.now()}-${e.target.files[0].name}`;
    setImageFileUrl(imageUrl);
    console.log("imageUrl", imageUrl)
  }

  console.log("imageFileUrl", imageFileUrl)

  //  useEffect(() => {
  //    const StoredImage = localStorage.getItem("BannerImage");
  //    setStoredImage(StoredImage)
  //  }, [imageFileUrl]);


  const uploadImage = async () => {
    console.log("Uploading image");
    setIsLoading(true);
    const storageRef = ref(storage, imageFileUrl);
    console.log("storageRef", storageRef)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    console.log("uploadTask", uploadTask)

    uploadTask.on(
      "state_changed",
      (snapshot) => { const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading!! Please Try Again ");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 10000);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL);
          console.log("image uploaded success")
          console.log("imageAsset1", imageAsset);
          setStoredImage(downloadURL)
          saveTextBoxData(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Banner Image uploaded successfully ");
          setMsg("Work Item Added successfully ");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 10000);
          navigate('/');
        }
        );


      }
    );
    setIsLoading(false);

  }
  console.log("imageAsset outer", imageAsset);

  const deleteImage = (e) => {
    //localStorage.clearData("BannerImage");
    setStoredImage(false)
  }
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  console.log("date", date)

  const saveDetails = async (e) => {
    console.log("save clicked")
    await uploadImage();
    console.log("save clicked2")
    setIsLoading(true)
    navigate('/');
  }
  const saveTextBoxData = (downloadURL) => {
    setIsLoading(true);
    try {
      if (!title || !downloadURL || !tableData || !category || !description) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        console.log("imageAsset in save text error", imageAsset)
        console.log("save clicked validation error", title, downloadURL, category, description, subCategory)
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 10000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: downloadURL,
          category: category,
          description: description,
          works: tableData,
          userId: user.uid,
          userEmail: user.email,
          createdAt: `${Date.now()}`,
          createdTime: timeString,
          createdDate: dateString,

        };
        console.log("imageAsset in save text save data", imageAsset)
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully ");
        setAlertStatus("success");
        console.log("save clicked added")
        setTimeout(() => {
          setFields(false);
        }, 10000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading!! Please Try AGain ");
      console.log("save clicked  error")
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 10000);
    }

    fetchData();

  }

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setPrice("");
    setCategory(null);
    setIsLoading(false);
    setImageFileUrl(null);
    setStoredImage(null);
    setDescription("");
    setTableData("");

  };

  const fetchData = async () => {
    await getAllWorkItems().then((data) => {
      dispatch({
        type: actionType.SET_WORK_ITEMS,
        workItems: data,
      });
    });
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { name } = event.target;
    setCheckedItems({
      ...checkedItems,
      [name]: !checkedItems[name]
    });
  };


  // const [selectedOption, setSelectedOption] = useState('');

  // const handleChangeDropdown = (event) => {
  //   setSelectedOption(event.target.value);

  // };

  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tableData, setTableData] = useState([]);

  const handleValue1Change = (e) => {
    setSelectedValue1(e.target.value);
  };

  const handleValue2Change = (e) => {
    setSelectedValue2(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddRow = () => {
    const newRow = {
      id: new Date().getTime(), // unique ID for each row
      value1: selectedValue1,
      value2: selectedValue2,
      value3: inputValue
    };
    setTableData((prevState) => [...prevState, newRow]);
    setSelectedValue1("");
    setSelectedValue2("");
    setInputValue("");
  };


  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
    
      <div className="w-[90%] md:w-[80%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
              }`}
          >
            {msg}
          </motion.p>
        )}

        <div className='grid lg:grid-cols-2 gap-36 items-center '>
          <div className='text-xl'>Work Item Name</div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdTitle className="text-xl text-gray-700" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Your Work Item Title..."
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor focus:ring-2 focus:ring-inset focus:ring-indigo-100"
            />
          </div>
        </div>


        <div className='grid lg:grid-cols-2 gap-36 items-center '>
          <div className='text-xl mr-32'>Work Category</div>
          <div className="w-full items-center">
            <select
              onChange={(e) => setCategory(e.target.value)} value={category}
              className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-inset focus:ring-indigo-100"
            >
              <option value="other" className="bg-white">
                Select Category
              </option>
              {categories &&
                categories.map((item) => (
                  <option
                    key={item.id}
                    className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                    value={item.urlParamName}
                  >
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>


        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!storedImage ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <BiCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to Select Banner
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      className="w-0 h-0"
                      onChange={setImageToUpload}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img src={storedImage} alt="uploaded image" className="w-full h-full object-cover" />

                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <AiTwotoneDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <TbSubtask className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              placeholder="Sub Category"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <IoIosPricetags className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

        </div> */}

        {/* <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdDescription className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Your Work Item Description..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div> */}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">

          <textarea
            name="message"
            id="message"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
            placeholder="Enter Your Work Item Description..."

          />
        </div>

        {category === "plumbing" ? (
          <div className='plumbing-items'>
             <p className='text-xl mb-2'>Select Plumbing Working Areas</p>
             <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mb-4'>
             <div>
                <select
                  onChange={handleValue1Change} value={selectedValue1}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                >
                  <option value="other" className="bg-white">
                    Select Working Areas
                  </option>
                  {plumbingWorks2 &&
                    plumbingWorks2.map((item) => (
                      <option
                        key={item.id}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
                {/* <p>You selected: {selectedValue1}</p> */}
              </div>
              </div>
            <p className='text-xl mb-2' >Select Plumbing Works You Offer From Here</p>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 '>
              <div>
                <select
                  onChange={handleValue2Change} value={selectedValue2}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                >
                  <option value="other" className="bg-white">
                    Specify Work
                  </option>
                  {plumbingWorks &&
                    plumbingWorks.map((item) => (
                      <option
                        key={item.id}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>
                {/* <p>You selected: {selectedValue2}</p> */}
              </div>
              <div>
                <input type="text" placeholder="enter price"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                />
                {/* <p>You entered: {inputValue}</p> */}
              </div>
            </div>
          </div>
        ) : (
          <div className='electric-items'>
            <p className='text-xl mb-2'>Select Electrical Working Areas</p>
             <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mb-4'>
             <div>
                <select
                  onChange={handleValue1Change} value={selectedValue1}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                >
                  <option value="other" className="bg-white">
                    Select Working Areas
                  </option>
                  {electricWorks2 &&
                    electricWorks2.map((item) => (
                      <option
                        key={item.id}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>

                {/* <p>You selected: {selectedValue1}</p> */}
              </div>
             </div>
            <p className='text-xl mb-2'>Select Electrical Works You Offer From Here</p>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mb-4'>
        
              <div>
                <select
                  onChange={handleValue2Change} value={selectedValue2}
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                >
                  <option value="other" className="bg-white">
                    Specify Work
                  </option>
                  {electricWorks &&
                    electricWorks.map((item) => (
                      <option
                        key={item.id}
                        className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                </select>

                {/* <p>You selected: {selectedValue2}</p> */}

              </div>
              <div>
                <input type="text" placeholder="enter price"
                  className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-100"
                  value={inputValue}
                  onChange={handleInputChange} />

              </div>

            </div>
          </div>
        )}
        <button
          type="button" onClick={handleAddRow}
          className="mt-2 w-full md:w-auto border-none outline-none bg-teal-500 px-5 rounded-lg text-lg text-white font-semibold"
        >
          Add
        </button>
        <div className='w-full'>
          <TableContainer className="my-table" >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Work</TableCell>
                  <TableCell>Work Specification area</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow>
                    <TableCell>{row.value1}</TableCell>
                    <TableCell>{row.value2}</TableCell>
                    <TableCell>{row.value3}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </div>
      <div className="flex items-center w-full mr-64 mt-2">
        <button
          type="button"
          className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-teal-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
          onClick={saveDetails}
        >
          Add Work Item
        </button>
      </div>
        
    </div>
  )
}

export default CreateContainer
