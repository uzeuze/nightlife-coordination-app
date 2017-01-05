import React from 'react';

const BusinessItem = ({ business }) => {
  return (
    <div className="BusinessItem well container">
      <div>
        <img src={business.image_url} />
      </div>
      <div>
        {business.name}
      </div>
      <div><img src={business.rating_img_url} /></div>
      <p>{business.snippet_text}</p>
      <div>
        <span>Want to go?</span>
        <button className="btn btn-danger">JOIN</button>
      </div>
    </div>
  );
};

export default BusinessItem;
