import React, { useEffect, useState } from 'react'
import Section from './first-section';
import TopResturant from './TopResturant';
import OnlineFoodDelivery from './OnlineFoodDelivery';
import { useContext } from 'react';
import { coordinates } from '../context/contextApi';
function Body() {

  const [apiData, setApiData] = useState([]);
  const [topResturantData, setTopResturantData] = useState([]);
  const{cord:{lat,lng}}=useContext(coordinates);
  const[title, setTitle]=useState("");
  const[onlinetitle, setOnlineTitle]=useState("");
 // console.log(lat,lng);
  
  async function fetchData() {
    try {
      const response = await fetch(`/api/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
      const result = await response.json();
      //console.log(result.data.cards[1].card.card.header.title);
      // console.log("Cards structure:", result?.data?.cards);
      console.log(result.data.cards[2].card.card.title);
      

      const apiDataResult = result?.data?.cards[0]?.card?.card?.imageGridCards?.info;
      const topResturantDataResult = result?.data?.cards[1]?.card?.card?.
        gridElements?.infoWithStyle?.restaurants;

     

      setApiData(apiDataResult);
      setTopResturantData(topResturantDataResult);
      setTitle(result.data.cards[1].card.card.header.title);
      setOnlineTitle(result.data.cards[2].card.card.title);
     // console.log(topResturantData);
      console.log(title);
     
      
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    fetchData()
  }, [lat, lng])
  return (
    <div className='w-full  '>
      <div className='w-[80%] mx-auto  mt-3 overflow-hidden '>
        <Section data={apiData} />
        <TopResturant data={topResturantData} title={title}  />
        <OnlineFoodDelivery data={topResturantData} onlinetitle={onlinetitle} />
       
       
        
      </div>

    </div >
    // </div>
  );
}
export default Body;
