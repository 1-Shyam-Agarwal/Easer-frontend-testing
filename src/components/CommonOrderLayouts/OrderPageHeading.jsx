import React from 'react';

const OrderCardHeading = ({ symbol, headingText }) => {
  return (
    <span className="font-montserrat text-xl sm:text-2xl font-medium flex items-center gap-2">
      <>{symbol}</>
      {headingText}
    </span>
  );
};

export default OrderCardHeading;
