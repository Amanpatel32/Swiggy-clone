import React from 'react'
import { TbPlayCardStar } from 'react-icons/tb';
import ResturantCard from './ResturantCard';

function TopResturant({ data }) {



  // const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(0);

  function HandlePrev() {

    value >= 450 ? "" : setValue((prev) => prev + 50)


  }
  function HandleNext() {
    value <= 0 ? "" : setValue((prev) => prev - 50)
  }

  // async function fetchData() {
  //   try {
  //     const response = await fetch("/api/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  //     const result = await response.json();
  //     // console.log(result?.data?.cards[1]?.card?.card?.
  //     //   gridElements?.infoWithStyle?.restaurants
  //     // );
  //     setData(result?.data?.cards[1]?.card?.card?.
  //       gridElements?.infoWithStyle?.restaurants);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // console.log(value);


  return (
    <div>
      <div className='mt-10'>
        <div className='flex justify-between mt-5'>

          <div className='font-bold text-2xl ml-4 mt-3'>
            <h1>Top restaurant chains Delhi</h1>
          </div>
          <div className='flex gap-3 mt-3'>
            <div onClick={HandleNext} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")}>


              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-left ` + (value <= 0 ? "text-gray-400" : "text-gray-600")}></i>

            </div>
            <div onClick={HandlePrev} className={`rounded-full cursor-pointer w-6 h-6 flex justify-center items-center ` + (value >= 450 ? "bg-gray-200" : "bg-gray-400")} >

              <i class={`fi text-2xl mt-1 fi-rr-arrow-small-right ` + (value >= 450 ? "text-gray-400" : "text-gray-600")}></i>
            </div>
          </div>

        </div>
        <div
          style={{ translate: `-${value}%` }}

          className={`flex mt-4 gap-4 duration-500`}>

          {
            data.map(({ info, cta: { link } }) => (

              <ResturantCard  {...info} link={link} />
            ))
          }

        </div>
        <hr className='mt-6'></hr>
      </div>

    </div>
  )
}

export default TopResturant;