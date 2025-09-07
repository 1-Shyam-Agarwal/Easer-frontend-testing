import React, { useState, useEffect } from 'react';

const FilenameTruncator = ({ fileName }) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncateFilename = (name, maxLength) => {
    if (!name) return '';
    return name?.length > maxLength ? `${name?.slice(0, maxLength)}...` : name;
  };

  const getMaxLength = () => {
    if (width > 800) return 30;
    if (width > 620) return 20;
    return 8;
  };

  return (
    <div className="truncate">{truncateFilename(fileName, getMaxLength())}</div>
  );
};

export default FilenameTruncator;
