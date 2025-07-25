import { apiConnector } from "../apiconnect";
import {printOrderVendorEndpoints} from "../apis.js";
import toast from "react-hot-toast";
import { clearRole, clearRoomcode, clearToken } from '../../Slices/authSlice';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from "../../Slices/LogoutSlice";


const{GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT} = printOrderVendorEndpoints;



export function priceCalculator(fileConfigs , setInvoice , setLoading , vendorId ,token , dispatch , navigate , socket , setSocket)
{
    setLoading(true);
    return async()=>{
        if(socket)
        {
            try{
                const response = await apiConnector("POST" , GET_VENDOR_PRICE_DETAILS_AND_FINAL_AMOUNT , {
                    vendorId , fileConfigs
                } , {'Authorization': `Bearer ${token}`} );
    
                
                setInvoice(response?.data?.invoice);
                setLoading(false);
            }catch(error)
            {
                if((error?.response?.data?.message === "You are logged in on another device.") || (error?.response?.data?.message ==="Session is expired."))
                {
                    dispatch(clearToken());
                    dispatch(clearUser());
                    dispatch(clearRole());
                    dispatch(clearRoomcode());
                    socket.disconnect();
                    setSocket(null);
                    dispatch(setShowModel(false));
                    navigate("/login" , {new : true});
                    toast.error(error?.response?.data?.message);
                }
                else{
                    toast.error("Error occured in calculating the price.");
                }
                
                setLoading(false);
            }
        }
        
    }
}