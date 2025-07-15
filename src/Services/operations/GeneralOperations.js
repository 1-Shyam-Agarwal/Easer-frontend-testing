import {toast} from "react-hot-toast";
import {apiConnector} from "../apiconnect.js";

//Apis used for handling the contact details submitted by user at contact us form.
import { getInTouchEndpoints } from "../apis";



//used for handling the contact details submitted by user at contact us form.
export async function handleContactDetails(setLoading , data)
{
    setLoading(true);

    try {
      await apiConnector("POST", getInTouchEndpoints.GET_IN_TOUCH_API, data);
      toast.success("Message sent successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
}  
