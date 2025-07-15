import {getVendorEndpoints} from "../../apis.js";
import { apiConnector } from "../../apiconnect.js";
import toast from "react-hot-toast";

const {
    GET_FILTERED_VENDORS ,
    GET_FILTERED_VENDORS_WITH_MINIMUM_DETAILS,
    GET_VENDOR_REQUESTS
} = getVendorEndpoints


//Fetch vendors of a particular college with only very few details : vendorId , shopName , shopLandMark
export async function getFilteredVendorsWithMinimumDetails(setLoading,
                                                     setFilteredVendorsData , 
                                                     token 
                                                    )
{
    setLoading(true);
    try{
        const response = await apiConnector( "GET", 
                                                GET_FILTERED_VENDORS_WITH_MINIMUM_DETAILS , 
                                                null ,
                                                {'Authorization': `Bearer ${token}`} 
                                            );

        setFilteredVendorsData(response?.data?.filteredVendors);
        setLoading(false);

    }catch(error){
        setLoading(false);
        console.log(error);
        toast.error(error?.response?.data?.message || "Unable to fetch vendors. Please reload the page or try again later.");
    }
}

