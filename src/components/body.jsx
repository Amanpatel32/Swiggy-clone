import React, { useEffect, useState } from 'react'
import Section from './first-section';
import TopResturant from './TopResturant';
import OnlineFoodDelivery from './OnlineFoodDelivery';
function Body() {

  const [apiData, setApiData] = useState([]);
  const [topResturantData, setTopResturantData] = useState([]);
  async function fetchData() {
    try {
      const response = await fetch("/api/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
      const result = await response.json();
      // console.log("API Response:", result);
      // console.log("Cards structure:", result?.data?.cards);

      const apiDataResult = result?.data?.cards[0]?.card?.card?.imageGridCards?.info;
      const topResturantDataResult = result?.data?.cards[1]?.card?.card?.
        gridElements?.infoWithStyle?.restaurants;

      // console.log("apiData:", apiDataResult);
      // console.log("topResturantData:", topResturantDataResult);

      setApiData(apiDataResult);
      setTopResturantData(topResturantDataResult);
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='w-full  '>
      <div className='w-[75%] mx-auto  mt-3 overflow-hidden '>
        <Section data={apiData} />
        <TopResturant data={topResturantData} />
        <OnlineFoodDelivery data={topResturantData} />
      </div>

    </div >
    // </div>
  );
}
export default Body;
