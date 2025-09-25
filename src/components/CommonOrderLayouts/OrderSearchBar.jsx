import { Search } from 'lucide-react';

const OrderSearchBar = ({ setKeyword, keyword, searchElement }) => (
  <div className="flex items-center bg-white rounded-full px-3 py-2 sm:py-3 my-2 sm:my-0 w-full max-w-md shadow">
    <Search className="w-4 h-4 text-gray-500" />
    <input
      type="text"
      placeholder={searchElement}
      className="ml-2 flex-1 bg-transparent focus:outline-none text-sm"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter'}
    />
  </div>
);

export default OrderSearchBar;
