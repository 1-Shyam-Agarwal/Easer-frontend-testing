// import { useState ,useEffect} from 'react';
// import { useSelector } from 'react-redux';
// import { fetchVendorMails } from '../../Services/operations/OutboxOps';
// import VendorMailCards from './components/VendorMailCards';

// const VendorInboxboxPage = () => {


//   const token = useSelector((state) => state.auth.token);
//   const [loading, setLoading] = useState(true);
//   const [mails , setMails] = useState([]);

//   useEffect(()=>
//   {   
//       fetchVendorMails(token , setMails);
//   },[])


//   return (
//     <div>
//       {
//           mails?.length == 0 ?
//           <div>No mails</div> :
//           <div>
//             <VendorMailCards mails={mails}/>
//           </div>
//       }
//     </div>
//   )
// }

// export default VendorInboxboxPage

import { fetchVendorMails } from '../../Services/operations/OutboxOps';
import VendorMailCards from './components/VendorMailCards';
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import MailSearchBar from './components/MailSearchBar';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { fetchFilteredMailsByCustomerName } from '../../Services/operations/OutboxOps';
import { PollingVendorMails } from '../../Services/operations/OutboxOps';

const VendorInboxboxPage = () => {


  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMails, setTotalMails] = useState(1); //1 is set so that no mail found will not be shown unnecessarily
  const [totalPages, setTotalPages] = useState(0);
  const [currentFilteredPage, setCurrentFilteredPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [currentSelectedMail, setCurrentSelectedMail] = useState({});

  // State to hold the mails fetched from the backend
  const [mails , setMails] = useState([]);

  useEffect(()=>
  {   
    // Fetching mails for the customer
    if(!keyword)
    {
        fetchVendorMails(token , currentPage , setMails ,setLoading, setCurrentPage , setTotalMails, setTotalPages);
        setCurrentFilteredPage(1); 
        
        const interval = setInterval(() => {
        PollingVendorMails(token , currentPage , setMails , setCurrentPage , setTotalMails, setTotalPages);// poll every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // cleanup on unmount


    }

  },[currentPage,token,keyword]);

  useEffect(()=>{
    if(keyword)
    {
        handleSearchByFilename(keyword);
        setCurrentPage(1);
    }
  },[keyword, token, currentFilteredPage]);

  function handleSearchByFilename(searchTerm) {
    // Function to handle search logic  
    if (searchTerm && searchTerm?.trim()) {
      // If search term is empty, reset the mails to the original state
      fetchFilteredMailsByCustomerName(token, currentFilteredPage, searchTerm, setMails, setLoading , setCurrentFilteredPage, setTotalMails, setTotalPages)
    }
  }

  return (
    <div className='p-4 h-full overflow-y-auto bg-gray-100'>

      {
          loading ?
          <div>
            <div className='flex justify-between mb-[0.7rem] items-center'>
              <MailSearchBar handleSearchByFilename={handleSearchByFilename} searchElement="by name" setKeyword={setKeyword} keyword={keyword}/>
            </div>
            <div className='flex justify-center items-center h-[50vh]'>
              <span className="loader"></span>
            </div>
          </div>
          
          :
          <div>
            <div className='flex justify-between mb-[0.7rem] items-center'>
              <MailSearchBar handleSearchByFilename={handleSearchByFilename} searchElement="by name" setKeyword={setKeyword} keyword={keyword}/>
            </div>
          <div>

        {
            totalMails === 0 ?
            <div className="text-center mt-16 text-gray-600 text-sm font-normal">
              No mails found
            </div>
 :
            (
              <div>
                {/* Pagination Controls */}
        <div className="flex flex-row justify-between mb-1 items-center mt-6 px-2 py-[2px] md:px-4 md:py-[4px] bg-gray-100">
          
          {/* Total Mails Info */}
          <div className="text-[8px] md:text-[12px] text-gray-600">
            Showing page <span className="font-medium text-gray-800">{keyword ? currentFilteredPage : currentPage}</span> of <span className="font-medium text-gray-800">{totalPages}</span> — Total <span className="font-semibold text-gray-900">{totalMails}</span> mails
          </div>

          {/* Buttons */}
          <div className="flex gap-2 items-center p-2 ">

            <button
              onClick={() => 
                {
                  if(keyword)
                  {
                    setCurrentFilteredPage(p => Math.max(p - 1, 1));
                    return;
                  }
                  setCurrentPage(p => Math.max(p - 1, 1));
                  setCurrentFilteredPage(1);
                }
              }
              disabled={
                keyword ? 
                currentFilteredPage === 1 :
                currentPage === 1
              }
              className="rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              <IoIosArrowBack/>
            </button>

            <button
              onClick={() =>{
                if(keyword)
                {
                  setCurrentFilteredPage(p => Math.min(p + 1, totalPages));
                  return;
                }
                setCurrentPage(p => Math.min(p + 1, totalPages));
               }
              }
              disabled={
                keyword ? currentFilteredPage === totalPages : currentPage === totalPages}
              className="rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              <IoIosArrowForward/>
            </button>

          </div>
        </div>

        <div>
          {
            mails?.length == 0 ?
            <div>No mails</div> :
            <div className=' rounded-md overflow-hidden'>
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                    {/* Receiver */}
                    <div className="flex items-center gap-2 w-1/4 min-w-[150px]">Sender</div>

                    {/* Documents */}
                    <div className="w-1/3">Documents</div>

                    {/* Time */}
                    <div className="w-1/6 text-right">Time</div>

                    {/* Options (icon space) */}
                    <div className="w-5"></div>
                </div>

                <div className="bg-white ">
                <VendorMailCards mails={mails} />
                </div>
            </div>
          } 
        </div>
        
        
      </div>
              
            )
        }
        
      </div>
          </div>


      }
      

    </div>
  )
}

export default VendorInboxboxPage