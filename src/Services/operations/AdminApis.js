import {getVendorEndpoints} from "../apis";
import { apiConnector } from "../apiconnect";
import toast from "react-hot-toast";

const { 
    GET_VENDOR_REQUESTS
    } = getVendorEndpoints;


export function getAllVendorRequests(setRequest,setLoading , token)
{
    return async()=>
    {
        try
        {
            const response = await apiConnector("GET" , GET_VENDOR_REQUESTS , undefined , {'Authorization': `Bearer ${token}`});
            setRequest(response?.data?.response);

        }catch(error)
        {
            toast.error("Error occured while fetching the vendor requests.Please try again later.");
        }
        finally{
            setLoading(false);
        }
    }
}