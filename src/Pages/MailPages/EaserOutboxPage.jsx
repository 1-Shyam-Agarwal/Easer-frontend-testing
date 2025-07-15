import React from 'react';
import ComposeModal from './components/ComposeModal';
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getFilteredVendorsWithMinimumDetails } from '../../Services/operations/GetInformaitonOperations/VendorRelatedOps';
import { fetchCustomerMails } from '../../Services/operations/OutboxOps';
import infoToast from '../../components/Core/Auth/InfoToast';
import { createOutboxMail } from '../../Services/operations/OutboxOps';
import CustomerMailCards from './components/CustomerMailCards';

const EaserOutboxPage = () => {


  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [filteredVendorsData, setFilteredVendorsData] = useState([]);
  const [mails , setMails] = useState([]);

  useEffect(()=>
  {   
      getFilteredVendorsWithMinimumDetails(setLoading,
                                           setFilteredVendorsData,
                                           token
                                          )

      fetchCustomerMails(token , setMails);
  },[])

  const[composeModelVisibility , setComposeModelVisibility] = useState(false);

  function toggleComposeModelVisibility()
  {
      setComposeModelVisibility(!composeModelVisibility);
  }

  function sendMail(uploadedDocs , vendor)
  {
        let mailDocs = []; 

        for(let file of uploadedDocs)
        {
            if(!file.url)
            {
                infoToast("Please wait until all the documents are fully uploaded.");
                return;
            }

            console.log(file);

            let doc = {
              fileName : file.name,
              fileUrl : file.url,
              fileRef : file.file_ref,
              fileType : file.file.type,
              fileSize : file.file.size
            }

            mailDocs.push(doc);
        }

        createOutboxMail(mailDocs , vendor  , token);
  }

  return (
    <div>
      <button 
      onClick={toggleComposeModelVisibility}
      class="flex items-center gap-2 px-6 py-2 bg-white text-black border border-gray-300 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition">
        Compose
      </button>
      {
          mails?.length == 0 ?
          <div>No mails</div> :
          <div>
            <CustomerMailCards mails={mails}/>
          </div>
      }
      
      {
          composeModelVisibility && <ComposeModal toggleComposeModelVisibility={toggleComposeModelVisibility} 
                                                  filteredVendorsData = {filteredVendorsData} 
                                                  sendMail={sendMail}/>
      }
    </div>
  )
}

export default EaserOutboxPage