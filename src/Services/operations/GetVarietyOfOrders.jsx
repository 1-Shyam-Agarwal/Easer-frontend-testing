import { getOrdersEndpoints , getUserInformationEndpoints } from "../apis";
import { apiConnector } from "../apiconnect";
import toast from "react-hot-toast";
import { clearRole, clearRoomcode, clearToken } from '../../Slices/authSlice';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from "../../Slices/LogoutSlice";

const {GET_ALL_CANCELLED_ORDERS , GET_ALL_SPECIFIC_USER_ONGOING_ORDERS , GET_SPECIFIC_ORDER_HISTORY , GET_ALL_SPECIFIC_UNRECEIVED_ORDERS} = getOrdersEndpoints;



export function fetchAllCancelledOrders( token ,setCancelledOrders , setLoading ,dispatch,navigate,socket,setSocket)
{
    return async()=>
    {
        if(socket)
        {
            setLoading(true);
            try
            {
                const response = await apiConnector("POST" , GET_ALL_CANCELLED_ORDERS , undefined , {'Authorization': `Bearer ${token}`});
                setLoading(false);
                setCancelledOrders(response?.data?.response?.cancelledOrders);

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
                toast.error(error?.response?.data?.message || "Unable to fetch cancelled orders. Please reload the page or try again later.");

            }  
        }
    }
}


export function fetchAllSpecificOnGoingOrders(token , setOngoingOrders ,setLoading ,dispatch,navigate,socket,setSocket)
{
    return async()=>
    {
        if(socket)
        {
            setLoading(true);
            try
            {
                const response = await apiConnector("POST" , GET_ALL_SPECIFIC_USER_ONGOING_ORDERS , undefined ,{'Authorization': `Bearer ${token}`});
                setLoading(false);
                setOngoingOrders(response?.data?.data);

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
                toast.error(error?.response?.data?.message|| "Unable to fetch ongoing orders. Please reload the page or try again later.");
            }
        }
    }

}


export function fetchAllSpecificUnreceivedOrders(token , setUnreceivedOrders ,setLoading ,dispatch,navigate,socket,setSocket)
{
    return async()=>
    {
        if(socket)
        {
            setLoading(true);
            try
            {
                const response = await apiConnector("POST" , GET_ALL_SPECIFIC_UNRECEIVED_ORDERS ,
                undefined,
                {'Authorization': `Bearer ${token}`}
                )
                setUnreceivedOrders(response?.data?.data?.unreceivedOrders);

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
                }
                toast.error(error?.response?.data?.message || "Unable to fetch unreceived orders. Please reload the page or try again later.");
            }
            setLoading(false);
        }
    }

}

export function fetchSpecificOrderHistory(token ,setOrderHistory,setLoading,dispatch ,navigate,socket,setSocket)
{
    return async()=>
    {
        if(socket)
        {
            setLoading(true);
            try
            {
                const response = await apiConnector("POST" , GET_SPECIFIC_ORDER_HISTORY , undefined , {'Authorization': `Bearer ${token}`})
                setOrderHistory(response?.data?.data?.orderHistory)

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
                }
                toast.error(error?.response?.data?.message||"Unable to fetch order history");
            }
            setLoading(false);
        }
    }
}


