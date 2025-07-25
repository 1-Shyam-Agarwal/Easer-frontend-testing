import { outboxOrdersEndpoints } from "../apis.js";
import { apiConnector } from "../apiconnect.js";
import toast from "react-hot-toast";

const { 
        CREATE_OUTBOX_MAIL,
        FETCH_OUTBOX_MAIL_FOR_CUSTOMER,
        FETCH_INBOX_MAIL_FOR_VENDOR
 } = outboxOrdersEndpoints;

 // Creating outbox mail
 // It will be used in the EaserOutboxPage.jsx
export async function createOutboxMail(mailDoc , vendor , token , setLoading ,toggleComposeModelVisibility)
{

    const mailInformation = {
        documents : mailDoc,
        vendor : vendor
    }

    if(mailDoc.length === 0)
    {
        toast.error("Please upload atleast 1 file.")
        return;
    }
    setLoading(true);

    try
    {
        const response = await apiConnector("POST" , CREATE_OUTBOX_MAIL , mailInformation , {'Authorization': `Bearer ${token}`});
        toast.success("Mail sent");
        toggleComposeModelVisibility();

    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
    finally{
        setLoading(false);
    }
}

// Fetching mails for the customer
// It will be used in the EaserOutboxPage.jsx
export async function fetchCustomerMails(authToken , currentPage , setMails,setLoading, setPage , setTotalMails, setTotalPages)
{
    setLoading(true);
    try
    {
        const url = `${FETCH_OUTBOX_MAIL_FOR_CUSTOMER}?page=${currentPage}`;

        // Fetching mails for the customer
        const response = await apiConnector("GET" , url , null , {'Authorization': `Bearer ${authToken}`});

        // contains an array of mails
        console.log("Executing");
        setMails(response?.data?.data);
        setPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);
        setTotalPages(response?.data?.totalPages);

    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
    finally
    {
        setLoading(false);
    }
}

// Fetching mails for the vendor
// It will be used in the EaserInboxPage.jsx
export async function fetchVendorMails(authToken , currentPage , setMails , setLoading , setCurrentPage , setTotalMails, setTotalPages )
{
    setLoading(true)
    try
    {
        const url = `${FETCH_INBOX_MAIL_FOR_VENDOR}?page=${currentPage}`;
        const response = await apiConnector("GET" , url , null , {'Authorization': `Bearer ${authToken}`});
        
        // contains an array of mails
        setMails(response?.data?.data);
        setCurrentPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);
        setTotalPages(response?.data?.totalPages);
        
    }catch(error)
    {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
    finally
    {
        setLoading(false);
    }
}

export async function fetchFilteredMailsByFileName(authToken, FilteredCurrentPage,  fileName, setMails, setLoading , setFilteredCurrentPage, setTotalMails, setTotalPages) {
    
    setLoading(true);
    try {
        const url = `${outboxOrdersEndpoints.FETCH_FILTERED_MAILS_BY_FILE_NAME}?fileName=${fileName}&page=${FilteredCurrentPage}`;
        const response = await apiConnector("GET", url, null, { 'Authorization': `Bearer ${authToken}` });
        // Set the filtered mails
        setMails(response?.data?.data);
        setFilteredCurrentPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);  
        setTotalPages(response?.data?.totalPages);
    } catch (error) {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    } finally {
        setLoading(false);
    }

}

// Fetching specific mail details
// It will be used in the Specific_mail_details.jsx
export async function fetchSpecificMailDetails(mailId, authToken, setMailDetails, setLoading) {

    // Function to fetch specific mail details
    setLoading(true);
    try {
        // Construct the URL with the mailId
        const url = `${outboxOrdersEndpoints.FETCH_SPECIFIC_MAIL_DETAILS}/${mailId}`;

        // Make the API call to fetch specific mail details
        const response = await apiConnector("GET", url, null, { 'Authorization': `Bearer ${authToken}` });

        // Log the response and set the mail details
        setMailDetails(response?.data?.data);

    } catch (error) {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    } finally {
        setLoading(false);
    }
}

export async function fetchFilteredMailsByCustomerName(authToken, FilteredCurrentPage, customerName, setMails, setLoading , setFilteredCurrentPage, setTotalMails, setTotalPages) {
    setLoading(true);
    try {
        const url = `${outboxOrdersEndpoints.FETCH_FILTERED_MAILS_BY_CUSTOMER_NAME}?customerName=${customerName}&page=${FilteredCurrentPage}`;
        const response = await apiConnector("GET", url, null, { 'Authorization': `Bearer ${authToken}` });
        
        // Set the filtered mails
        setMails(response?.data?.data);
        setFilteredCurrentPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);  
        setTotalPages(response?.data?.totalPages);
    } catch (error) {
        toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    } finally {
        setLoading(false);
    }
}

export async function PollingVendorMails(authToken , currentPage , setMails  , setCurrentPage , setTotalMails, setTotalPages )
{
    try
    {
        const url = `${FETCH_INBOX_MAIL_FOR_VENDOR}?page=${currentPage}`;
        const response = await apiConnector("GET" , url , null , {'Authorization': `Bearer ${authToken}`});
        
        // contains an array of mails
        setMails(response?.data?.data);
        setCurrentPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);
        setTotalPages(response?.data?.totalPages);
        
    }catch(error)
    {
        // toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
}

export async function PollingCustomerMails(authToken , currentPage , setMails  , setCurrentPage , setTotalMails, setTotalPages )
{
    try
    {
        const url = `${FETCH_OUTBOX_MAIL_FOR_CUSTOMER}?page=${currentPage}`;

        // Fetching mails for the customer
        const response = await apiConnector("GET" , url , null , {'Authorization': `Bearer ${authToken}`});

        // contains an array of mails
        setMails(response?.data?.data);
        setCurrentPage(response?.data?.page);
        setTotalMails(response?.data?.totalMails);
        setTotalPages(response?.data?.totalPages);

    }catch(error)
    {
        // toast.error(error?.response?.data?.message || "There is some technical issue. Please try again later.");
    }
}