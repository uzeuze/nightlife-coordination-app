import React from 'react';

const BusinessItem = ({ business }) => {
  return (
    <div className="BusinessItem well container">
      {business.name}
    </div>
  );
};

export default BusinessItem;
