import { useState, useEffect } from 'react';

const OrderHeader_5 = ({ field_1, field_2, field_3, field_4,field_5 }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler for resize
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Attach listener
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {windowWidth <= 640 ? (
        <div></div>
      ) : (
        <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          {/* Field_1 */}
          <div className="text-center">{field_1}</div>

          {/* Field_2 */}
          <div className="text-center">{field_2}</div>

          {/* Field_3 */}
          <div className="text-center">{field_3}</div>

          {/* Field_4 */}
          <div className="text-center">{field_4}</div>

          {/* Field_5 */}
          <div className="text-center">{field_5}</div>
        </div>
      )}
    </div>
  );
};

export default OrderHeader_5;
