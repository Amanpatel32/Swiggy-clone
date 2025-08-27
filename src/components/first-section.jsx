/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";

function Section({ data }) {
  const [value, setValue] = useState(0);

  function HandlePrev() {
    value >= 145 ? "" : setValue((prev) => prev + 29);
  }

  function HandleNext() {
    value <= 0 ? "" : setValue((prev) => prev - 29);
  }

  return (
    <div>
      <div>
        <div className='flex justify-between mt-5'>
          <div className='font-bold text-2xl ml-4 mt-3'>
            <h1>what's on your mind?</h1>
          </div>
          <div className='flex gap-3 mt-3'>
            <div onClick={HandleNext} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")}>
              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-600")}></i>
            </div>
            <div onClick={HandlePrev} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value >= 145 ? "bg-gray-200" : "bg-gray-400")}>
              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 124 ? "text-gray-400" : "text-gray-600")}></i>
            </div>
          </div>
        </div>
        <div style={{ translate: `-${value}%` }} className={`flex duration-500`}>
          {data.map((item, index) => (
            <img key={index} className='w-[140px] h-[180px]'
              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              alt={item.alt || 'Restaurant'}
            />
          ))}
        </div>
        <hr className='mt-2 border-b-gray-500'></hr>
      </div>
    </div>
  );
}

export default Section;
