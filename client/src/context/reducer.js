export const actionType = {
  SET_USER: "SET_USER",
  SET_WORK_ITEMS: "SET_WORK_ITEMS",

  SET_ORDER_ITEMS: "SET_ORDER_ITEMS",

  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CART_ITEMS: "SET_CART_ITEMS",

  SET_FAV_ITEMS: "SET_FAV_ITEMS",
  SET_FAV_SECTION_SHOW: "SET_FAV_SECTION_SHOW",

  SET_SELLER: "SET_SELLER",

  SET_TASKERS: "SET_TASKERS",
  SET_USERS: "SET_USERS",
  CHANGE_USER: "CHANGE_USER",
  SET_ORDER_INFORMATION: "SET_ORDER_INFORMATION",
  SET_BUYER_INFORMATION: "SET_BUYER_INFORMATION",
  SET_ITEM_ID: "SET_ITEM_ID",
  SET_ORDERS: "SET_ORDERS",
  SET_NOTIFICATION_SHOW: "SET_NOTIFICATION_SHOW",
  SET_FEEDBACKS: "SET_FEEDBACKS",
};
const currentUser = JSON.parse(localStorage.getItem("user"));

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_WORK_ITEMS:
      return {
        ...state,
        workItems: action.workItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_FAV_SECTION_SHOW:
      return {
        ...state,
        favSectionShow: action.favSectionShow,
      };
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    case actionType.SET_FAV_ITEMS:
      return {
        ...state,
        favItems: action.favItems,
      };

    case actionType.SET_SELLER:
      return {
        ...state,
        seller: action.seller,
      };
    case actionType.SET_TASKERS:
      return {
        ...state,
        taskerInfo: action.taskerInfo,//taskers data
      };
    case actionType.SET_USERS:
      return {
        ...state,
        users: action.users,//all users data
      };
    case actionType.CHANGE_USER:
      return {
        ...state,
        chatUser: action.chatUser,//taskers data
        chatId:
          currentUser.uid > action.chatUser.uid
            ? currentUser.uid + action.chatUser.uid
            : action.chatUser.uid + currentUser.uid,
      };
    case actionType.SET_ORDER_INFORMATION:
      return {
        ...state,
        orderInformation: action.orderInformation,//order information
      };
    case actionType.SET_BUYER_INFORMATION:
      return {
        ...state,
        buyerInformation: action.buyerInformation,//buyer infdormation
      };
    case actionType.SET_ITEM_ID:
      return {
        ...state,
        itemID: action.itemID,//item id
      };
    case actionType.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,//orders
      };
    case actionType.SET_NOTIFICATION_SHOW:
      return {
        ...state,
        notificationShow: action.notificationShow,//orders
      };
    case actionType.SET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.feedbacks,//feedbacks
      };


    // case actionType.SET_ORDER_ITEMS:
    //   return {
    //     ...state,
    //     orderItems: action.orderItems,
    //   };

    // case actionType.SET_CART_SHOW:
    //   return {
    //     ...state,
    //     cartShow: action.cartShow,
    //   };

    // case actionType.SET_CARTITEMS:
    //   return {
    //     ...state,
    //     cartItems: action.cartItems,
    //   };

    default:
      return state;
  }
};

export default reducer;
