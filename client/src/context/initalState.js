import { fetchUser,fetchCart,fetchFav } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();
const favInfo = fetchFav();

export const initialState = {
  user: userInfo,
  workItems: null,
  cartShow: false,
  favSectionShow :false,
  cartItems:cartInfo,
  favItems:favInfo,
  seller:false,
  taskerInfo:null,
  users:null,
  chatId:null,
  chatUser:{},
  orderInformation:null,
  buyerInformation:null,
  itemID:null,
  orders:null,
  notificationShow:false,
  notifications:null,
};
