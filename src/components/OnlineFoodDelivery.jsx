import React from 'react';
import ResturantCard from './ResturantCard';

function OnlineFoodDelivery({ data ,onlinetitle}) {
  // console.log(data); // Log the entire data array

  if (!data || !Array.isArray(data)) {
    return <div className='mt-12'>Loading...</div>;
  }

  return (
    <div className='mt-12'>  <h1 className='font-bold text-2xl ml-4 mt-3 mb-5'>{onlinetitle}</h1>
      <div className='grid grid-cols-4 gap-10'>
        {
          data.map(({ info, cta: { link } }) => {
            //console.log(link); // Log the full item to inspect its structure
            // After inspecting, update the property access as needed
            return <ResturantCard {...info} link={link} />;
          })
        }
      </div>
    </div>
  );
}

export default OnlineFoodDelivery;
