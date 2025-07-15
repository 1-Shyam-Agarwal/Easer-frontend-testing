import { getVendorEndpoints ,getOrdersEndpoints ,printOrderVendorEndpoints} from "../apis";
import { apiConnector } from "../apiconnect";
import toast from "react-hot-toast";
import { clearRole, clearRoomcode, clearToken } from '../../Slices/authSlice';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from "../../Slices/LogoutSlice";

const { GET_FILTERED_VENDORS , GET_FILTERED_VENDORS_WITH_MINIMUM_DETAILS  } = getVendorEndpoints;


export function getfilteredVendorsList(setFilteredVendorsData , token,setLoading,dispatch,navigate,socket,setSocket)
{
    return async()=>
    {
        if(socket)
        {
            setLoading(true);
        try
        {
            const response = await apiConnector("POST" , GET_FILTERED_VENDORS , undefined ,{'Authorization': `Bearer ${token}`} );
            setLoading(false);
            setFilteredVendorsData(response?.data?.filteredVendors);

        }catch(error)
        {
            setLoading(false);
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
            }
                
            toast.error(error?.response?.data?.message || "Unable to fetch vendor data. Please try again.");
        }
        }
    }
    
}



export function getOnGoingOrders(setOnGoingOrders ,token , setLoading ,vendorID,dispatch , navigate , socket , setSocket)
{
    return async(dispatch)=>
    {
        if(socket)
        {
            setLoading(true);
            try
            {
                const response = await apiConnector("POST" , getOrdersEndpoints.GET_VENDOR_ORDERS, {vendorID} ,{'Authorization': `Bearer ${token}`});
                setOnGoingOrders(response?.data?.data);
                setLoading(false);

            }catch(error)
            {
                setLoading(false);
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
                }
                toast.error(error?.response?.data?.message || "Unable to fetch ongoing orders. Please try again.");
            }
        }
    }
}

