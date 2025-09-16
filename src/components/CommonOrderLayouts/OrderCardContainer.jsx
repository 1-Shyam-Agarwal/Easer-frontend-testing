const OrderCardContainer = ({ children }) => {
  return (
    <div className="px-2 py-1 pb-4 sm:p-4 h-full overflow-y-auto bg-gray-100 cursor-default">
      {children}
    </div>
  );
};

export default OrderCardContainer;
