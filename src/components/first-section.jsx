import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";


function section() {

  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  async function fetchData() {
    try {
      const response = await fetch("/api/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
      const result = await response.json();
      console.log(result);
      setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  console.log(value);

  function HandlePrev() {


    value >= 87 ? "" : setValue((prev) => prev + 29)
  }
  function HandleNext() {

    value <= 0 ? "" : setValue((prev) => prev - 29)


  }
  return (
    <div>
      <div>
        <div className='flex justify-between mt-5'>

          <div className='font-bold text-2xl ml-4 mt-3'>
            <h1>what's on your mind?</h1>
          </div>
          <div className='flex gap-3'>
            <div onClick={HandleNext} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")}>


              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-600")}></i>

            </div>
            <div onClick={HandlePrev} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value >= 124 ? "bg-gray-200" : "bg-gray-400")} >

              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 124 ? "text-gray-400" : "text-gray-600")}></i>
            </div>
          </div>

        </div>
        <div

          style={{ translate: `-${value}%` }}
          className={`flex duration-500`}>
          {data.map((item) => (
            <img className='w-30'

              src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
              alt={item.alt || 'Restaurant'}

            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default section;