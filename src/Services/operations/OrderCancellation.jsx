import { apiConnector } from "../apiconnect";
import { cancellationEndpoints } from "../apis";
import toast from "react-hot-toast";
import { clearRole, clearRoomcode, clearToken } from '../../Slices/authSlice';
import { clearUser } from '../../Slices/profileSlice';
import { setShowModel } from "../../Slices/LogoutSlice";

const{SET_CANCELLATION_INDICATORS , DESET_CANCELLATION_INDICATORS , ORDER_CANCELLATION} = cancellationEndpoints ;

export function setOrderCancellationIndicators(token , orderId ,dispatch , navigate , socket , setSocket)
{
    return async(dispatch)=>
    {
        if(socket)
        {
            const toastId = toast.loading("Loading...");
            try
            {
                const response = await apiConnector("POST", SET_CANCELLATION_INDICATORS , {
                    orderId
                },
                {'Authorization': `Bearer ${token}`}
                )

                toast.dismiss(toastId);
                return 1;

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
                toast.dismiss(toastId);
                toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
                return 0;
            }

        }
    }
}

export function desetOrderCancellationIndicators(token , orderId ,dispatch , navigate , socket , setSocket)
{
    return async()=>
    {
        const toastId = toast.loading("Loading...");
        try
        {
            const response = await apiConnector("POST", DESET_CANCELLATION_INDICATORS , {
                orderId
            },
            {'Authorization': `Bearer ${token}`}
            )

            toast.dismiss(toastId);
            return 1;

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
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message ||"There is some technical issue. Please try again later.");
            return 0;
        }
           
    }
}

export function cancellationOfOrder(token ,orderId , reason ,dispatch , navigate , socket , setSocket)
{
    return async()=>
    {
        const toastId = toast.loading("Cancelling Order...");
        try
        {
            const response = await apiConnector("POST" , ORDER_CANCELLATION , {
                orderId,
                reason
            },
            {'Authorization': `Bearer ${token}`})
            toast.dismiss(toastId);
            toast.success("Successfully cancelled the order");
            return 1;

        }catch(error)
        {
            toast.dismiss(toastId);
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
            toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
            return 0;
        }

    }
}



