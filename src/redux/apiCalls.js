import axios from "axios";
import { loginError, loginStart, loginSuccess } from "./userRedux";

export const login = async(dispatch, user)=>{
    dispatch(loginStart());
    try{
        // const res = publicRequest("/login", user);
        const res = await axios.post("api/auth/login", user);
        // console.log(res.data);
        dispatch(loginSuccess(res.data));
        return "success";
    }catch(err){
        dispatch(loginError());
        console.log(err);
        return "error";
    }
}
