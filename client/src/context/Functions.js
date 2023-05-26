import { ChatContext } from './ChatContext'
import react ,{ useContext } from 'react';


export function UseChangeUser() {
    const { dispatch } = useContext(ChatContext);
  
    function changeUser() {
      dispatch({ type: 'CHANGE_USER', payload: null });
      console.log(dispatch)
    }
   
  
    return changeUser;
  }

