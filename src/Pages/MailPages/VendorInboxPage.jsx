import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchVendorMails } from '../../Services/operations/OutboxOps';
import VendorMailCards from './components/VendorMailCards';

const VendorInboxboxPage = () => {


  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(true);
  const [mails , setMails] = useState([]);

  useEffect(()=>
  {   
      fetchVendorMails(token , setMails);
  },[])


  return (
    <div>
      {
          mails?.length == 0 ?
          <div>No mails</div> :
          <div>
            <VendorMailCards mails={mails}/>
          </div>
      }
    </div>
  )
}

export default VendorInboxboxPage