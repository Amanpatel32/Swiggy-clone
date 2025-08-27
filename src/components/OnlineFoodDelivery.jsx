import React from 'react';
import ResturantCard from './ResturantCard';

function OnlineFoodDelivery({ data }) {
  // console.log(data); // Log the entire data array

  return (
    <div className='mt-12'>OnlineFoodDelivery
      <div className='grid grid-cols-4 gap-10'>
        {
          data.map(({ info, cta: { link } }) => {
            // console.log(link); // Log the full item to inspect its structure
            // After inspecting, update the property access as needed
            return <ResturantCard {...info} link={link} />;
          })
        }
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
