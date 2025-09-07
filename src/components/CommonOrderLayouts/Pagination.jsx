import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const Pagination = ({keyword , currentFilteredPage , currentPage , totalPages , totalMails , setCurrentFilteredPage , setCurrentPage , }) => {

  return (
    <div className="flex flex-row justify-between mb-1 items-center mt-4 px-2 py-[2px] md:px-4 md:py-[4px] bg-gray-100">
      {/* Total Mails Info */}
      <div className="text-[0.85rem] md:text-[12px] text-gray-600">
        Showing page{' '}
        <span className="font-medium text-gray-800">
          {keyword ? currentFilteredPage : currentPage}
        </span>{' '}
        of <span className="font-medium text-gray-800">{totalPages}</span> —
        Total <span className="font-semibold text-gray-900">{totalMails}</span>{' '}
        mails
      </div>

      {/* Buttons */}
      <div className="flex sm:gap-2 items-center p-2">
        <button
          onClick={() => {
            if (keyword) {
              setCurrentFilteredPage((p) => Math.max(p - 1, 1));
              return;
            }
            setCurrentPage((p) => Math.max(p - 1, 1));
            setCurrentFilteredPage(1);
          }}
          disabled={keyword ? currentFilteredPage === 1 : currentPage === 1}
          className="rounded-md pr-8 sm:pr-2 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          <IoIosArrowBack />
        </button>

        <button
          onClick={() => {
            if (keyword) {
              setCurrentFilteredPage((p) => Math.min(p + 1, totalPages));
              return;
            }
            setCurrentPage((p) => Math.min(p + 1, totalPages));
          }}
          disabled={
            keyword
              ? currentFilteredPage === totalPages
              : currentPage === totalPages
          }
          className="rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
