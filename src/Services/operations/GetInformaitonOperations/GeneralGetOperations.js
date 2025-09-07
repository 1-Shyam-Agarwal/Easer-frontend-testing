import { collegeDetailsEndpoints } from '../../apis';
import { apiConnector } from '../../apiconnect';
import toast from 'react-hot-toast';

const { GET_ALL_COLLEGE_DETAILS } = collegeDetailsEndpoints;

export async function getRegisteredCollegeList(setCollegeData, setLoading) {
  setLoading(true);
  try {
    const response = await apiConnector('GET', GET_ALL_COLLEGE_DETAILS);
    setCollegeData(response?.data?.response);
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        'There is some technical issue. Please try again later.'
    );
  }
  setLoading(false);
}
