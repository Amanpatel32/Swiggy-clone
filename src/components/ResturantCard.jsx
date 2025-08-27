import React from 'react';
import { Link } from 'react-router-dom';

function ResturantCard(info) {
  // console.log(info.link.split("/")[5]); // Log the info object structure

  return (
    <Link to={`/ResturantMenu/${info.link.split("/")[5]}`}>
      <div className='hover:scale-95 duration-300'>
        <div className='min-w-[295px] h-[180px] relative'>
          <img className='w-[273px] h-[180px] rounded-2xl object-cover' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + info.cloudinaryImageId} alt="" />
          <div className='bg-gradient-to-t from-black from-5% to-transparent to-30% absolute w-[273px] h-[180px] rounded-2xl top-0'></div>
          <p className='absolute bottom-0 text-xl font-weight: 100 text-white font-bold ml-5 mb-2 font-family: <Gilroy>'>
            {
              info?.aggregatedDiscountInfoV3?.header && info?.aggregatedDiscountInfoV3?.subHeader ?
                info.aggregatedDiscountInfoV3.header + " " + info.aggregatedDiscountInfoV3.subHeader : ""
            }
          </p>
        </div>
        <div className='mt-3'>
          <h2 className='font-semibold text-lg'>{info.name}</h2>
          <p className='flex items-center gap-2 font-semibold text-base'>
            <i className="fi fi-sr-circle-star text-xl text-green-700"></i>
            {info.avgRating}.<span>{info.sla.slaString}</span>
          </p>
          <p className='line-clamp-1 text-black/70 font-medium'>{info.cuisines.join(", ")}</p>
          <p className='line-clamp-1 text-black/70 font-medium'>{info.locality}</p>
        </div>
      </div>
    </Link>
  );
}

export default ResturantCard;
