import { outboxOrdersEndpoints } from "../apis.js";
import { apiConnector } from "../apiconnect.js";
import toast from "react-hot-toast";

const { 
        CREATE_OUTBOX_MAIL,
        FETCH_OUTBOX_MAIL_FOR_CUSTOMER,
        FETCH_INBOX_MAIL_FOR_VENDOR
 } = outboxOrdersEndpoints;

export async function createOutboxMail(mailDoc , vendor , token)
{
    const mailInformation = {
        documents : mailDoc,
        vendor : vendor
    }

    try
    {
        const response = await apiConnector("POST" , CREATE_OUTBOX_MAIL , mailInformation , {'Authorization': `Bearer ${token}`});
    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
}

export async function fetchCustomerMails(authToken , setMails)
{
    try
    {
        const response = await apiConnector("GET" , FETCH_OUTBOX_MAIL_FOR_CUSTOMER , null , {'Authorization': `Bearer ${authToken}`});
        setMails(response?.data?.data?.mails);

    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
}

export async function fetchVendorMails(authToken , setMails)
{
    try
    {
        const response = await apiConnector("GET" , FETCH_INBOX_MAIL_FOR_VENDOR , null , {'Authorization': `Bearer ${authToken}`});
        setMails(response?.data?.data);
        
    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
}