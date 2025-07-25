import { Search } from "lucide-react";


const MailSearchBar = ({handleSearchByFilename , setKeyword , keyword , searchElement}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-full px-3 py-3 w-full max-w-3xl shadow-sm">
      {/* Search Icon + Input */}
      <div className="flex items-center space-x-2 text-gray-600 w-full">
        <Search className="w-5 h-5" />
        <input
          type="text"
          placeholder={`Search mail ${searchElement}`}
          className="bg-transparent focus:outline-none text-[1rem] w-[100%] block p-[1px] placeholder-gray-500"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
               // Your function to handle search or filter
            }
          }}
        />
      </div>
    </div>
  );
};

export default MailSearchBar;
