import {useState} from 'react'
import {  useSelector } from 'react-redux';
import UserSettings from '../../components/Settings/UserSettings';
import VendorSettings from '../../components/Settings/VendorSettings';

const Settings = () => {

    const role = useSelector(state => state.auth.role);
    const [loading , setLoading] = useState(false);

  return (
    <div>
        {
            loading? 
            (
                <div className="max-h-screen flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )
            :
            (
                <div>
                {
                    role === "customer"?
                    (
                        <UserSettings/>
                    )
                    :
                    (
                        role=== "vendor" ? 
                        <VendorSettings/> :
                        (
                            <div>heLLO</div>
                        )
                    )
                }
                </div>
            )
        }
    </div>
   
  )
}

export default Settings