import { useNavigate } from 'react-router-dom';
const OrderModeToggle = ({ active }) => {
  const navigate = useNavigate();

  const options = [
    {
      label: 'Mails',
      path: '/dashboard/easer-inbox',
    },
    {
      label: 'Online Orders',
      path: '/dashboard/vendor/ongoing-orders',
    },
  ];

  return (
    <div className="flex justify-center pb-4">
      <div className="flex border border-gray-300 rounded-[5px] overflow-hidden bg-white shadow-sm">
        {options.map((item) => {
          const isActive = item.label === active;

          return (
            <button
              onClick={() => {
                navigate(item.path);
              }}
              key={item.label}
              className={`px-6 py-2 text-sm font-normal focus:outline-none transition-colors duration-300
                        ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                        `}
              style={{ minWidth: '100px' }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderModeToggle;
