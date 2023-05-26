import { collection, doc, getDocs, orderBy, query, setDoc,onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { fetchUser } from "./fetchLocalStorageData";
import { getAuth } from "firebase/auth";

// // Saving new Item
// export const saveItem = async (data) => {
//     await setDoc(doc(firestore, "workItems", `${Date.now()}`), data, {
//         merge: true,
//     });
// };


// Function to save new work item
export const saveItem = async (data) => {

  // const userExists = await checkUserInfoExists(); // Check if user info exists
  // if (!userExists) {
  //   // If user info doesn't exist, save it first
  //   const userInfo = JSON.parse(localStorage.getItem("user")); // Retrieve user info from localStorage
  //   //   const userInfo = {
  //   //     name: "John Doe", // Replace with actual user information
  //   //     email: "johndoe@example.com",
  //   //     // Add any other user information you want to save
  //   //   };
  //   await saveUserInfo(userInfo);
  // }
  const userInfo = JSON.parse(localStorage.getItem("user"));

  await saveUserInfo(userInfo);
  // Saving new item
  await setDoc(doc(firestore, "workItems", `${Date.now()}`), data, {
    merge: true,
  });
};


export const saveUsers = async () => {
  // Saving new item
  const userInfo = JSON.parse(localStorage.getItem("user"));
  console.log('userInfo inside saveUsers', userInfo);

  // Get the current user ID
  const userId = userInfo.uid;
  // Query the userChats collection for a document with the same ID as the current user ID
  //const userChatsRef = doc(collection(firestore, 'userChats'), userId);
  const userChatsRef = doc(firestore, 'userChats', userId);
  const userRef = doc(firestore, 'users', userId);

  //const userRef = firestore.collection('users').doc(userId);
  // console.log('userChatsRef', userChatsRef);
  // console.log('userRef', userRef);
  // console.log('userRef.id', userRef.id); //102171858640509229863
  // console.log('user.id', userId);

  const unSub = onSnapshot(doc(firestore, "userChats", userId), (doc) => {
    if (doc.exists()) {
      console.log("doc available");
    } else {
      console.log("doc not available");
      saveData(userInfo)
      console.log("doc  written");
    }
  });
  //saveData(userInfo)

  // userRef.get().then((doc) => {
  //   console.log('doc', doc);
  //   if (doc.exists) {
  //     // The user has already logged in before, do not update the collection
  //     console.log('User already exists');
  //   } else {
  //     // This is a new user, create a new document in the userChats collection
  //     userChatsRef.set(
  //       // Add your fields here
  //       saveData(userInfo)
  //     ).then(() => {
  //       console.log('New user created');
  //     }).catch((error) => {
  //       console.error('Error creating new user:', error);
  //     });
  //   }
  // }).catch((error) => {
  //   console.error('Error querying user:', error);
  // });
 




};

const saveData = async (userInfo) => {
  try {

    // Saving new item
    await setDoc(doc(firestore, "users", userInfo.uid), userInfo, {
      merge: true,
    });
    console.log("user created successfully!");
    //create empty user chats on firestore
    await setDoc(doc(firestore, "userChats", userInfo.uid), {});
    console.log("userChats created successfully!");

    // const docRef = doc(firestore, "userInfo",`${Date.now()}`); // Use "user" as the document ID for user info
    // await setDoc(docRef, userInfo,{merge:true,}); // Set user info document with the provided userInfo object
    console.log("user info saved successfully!");
  } catch (error) {
    console.error("Error saving user infomation:", error);
  }
}

// getall work items
export const getAllUsers = async () => {
  const items = await getDocs(
    query(collection(firestore, "users"))
  );

  return items.docs.map((doc) => doc.data());
};


// getall work items
export const getAllWorkItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "workItems"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};

// getall orders
export const getAllOrders = async () => {
  const items = await getDocs(
    query(collection(firestore, "orders"))
  );

  return items.docs.map((doc) => doc.data());
};

// Function to save user information in Firestore
export const saveUserInfo = async (taskerInfo) => {

  const unSub = onSnapshot(doc(firestore, "taskerInfo", taskerInfo.uid), (doc) => {
    if (doc.exists()) {
      console.log("tasker doc available");
    } else {
      console.log("tasker doc not available");
      savetaskerfo(taskerInfo)
      console.log("tasker doc  written");
    }
  });
  
};
export const savetaskerfo = async (taskerInfo) => {
  try {
    // Saving new item
    await setDoc(doc(firestore, "taskerInfo", taskerInfo.uid), taskerInfo, {
      merge: true,
    });
    // const docRef = doc(firestore, "userInfo",`${Date.now()}`); // Use "user" as the document ID for user info
    // await setDoc(docRef, userInfo,{merge:true,}); // Set user info document with the provided userInfo object
    console.log("tasker info saved successfully!");
  } catch (error) {
    console.error("tasker saving user info:", error);
  }
}
// Function to check if user info already exists in Firestore
export const checkUserInfoExists = async () => {
  try {
    const docRef = doc(firestore, "userInfo");
    const docSnapshot = await getDocs(docRef); // Get user info document snapshot
    return docSnapshot.exists(); // Return true if user info document exists, false otherwise
  } catch (error) {
    console.error("Error checking user info existence:", error);
    return false; // Return false in case of error
  }
};

// getall taskers
export const getAllTaskers = async () => {
  const useritems = await getDocs(
    query(collection(firestore, "taskerInfo"))
  );

  return useritems.docs.map((doc) => doc.data());
};


