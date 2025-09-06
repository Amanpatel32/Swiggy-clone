import React, {useState}from 'react';
import { useContext } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Link, Outlet } from 'react-router-dom';
import { visibility } from '../context/contextApi';
import { coordinates } from '../context/contextApi';

function Head() {
  const navitems = [
    {
      name: "swiggy coporate",
      icon: <i className="fi fi-rr-briefcase"></i>
    },
    {
      name: "Search",
      icon: <i className="fi fi-br-search"></i>
    },
    {
      name: "offers",
      icon: <i className="fi fi-rr-badge-percent"></i>
    },
    {
      name: "help",
      icon: <i className="fi fi-ss-interrogation"></i>
    },
    {
      name: "sign in",
      icon: <i className="fi fi-rs-user"></i>
    },
    {
      name: "cart",
      icon: <i className="fi fi-rr-shopping-cart-add"></i>
    },
  ];

  const { visible, setVisible } = useContext(visibility);
  const[searchResult, setSearchResult] = useState([]);
   const{setCord}=useContext(coordinates);
    const[address, setAddress]=useState("Other");
    const[shortAddress, setShortAddress]=useState("");

  

    async function locationFinder(value) {
      if (value==="") return
       //console.log(value);
      const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${value}`)
      const data = await res.json();
      //console.log(data.data);
      setSearchResult(data.data)
    }

  async function latandlong(id) {
    if (id === "") return
    //console.log(id);
    const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
    const data = await res.json();
    setCord({
      lat: data.data[0].geometry.location.lat,
      lng: data.data[0].geometry.location.lng
    })
    setVisible(false);
    //
    // console.log(data.data[0].geometry.location.lat); 
    // console.log(data.data[0].geometry.location.lng); // Log the entire data array
    //console.log(data.data[0].formatted_address);
    setAddress(data.data[0].formatted_address);
   // console.log(data.data[0].address_components[1].long_name);
    setShortAddress(data.data[0].address_components[1].long_name);
    
    
  }
  
    
  

 

  // function handlesearchfunctionality() {
  //   // console.log("search functionality will be added soon");
  //   setVisible((prev)=>!prev);
  // }

  function handleVisibility() {
    
      setVisible((prev) => !prev);
    }
  

  return (

    <div className="relative w-full">

      <div className="w-full">
        <div onClick={handleVisibility} className={"w-full bg-black/50 z-30 h-full absolute " + (visible ? "visible " : " invisible")}></div>
        <div className={" bg-white w-[40%] h-full p-5 z-40 absolute duration-500 " + (visible ? "left-0" : "-left-[100%]")}>
          <p className=" bg-black text-white p-5 w-[10%]" onClick={handleVisibility}> cut</p>
          <input type="text" className="border p-5 focus:outline-none focus:shadow-lg" onChange={(e) => locationFinder(e.target.value)} />
          <div>
            <ul>
              {
                searchResult.map((data) => (
                  <li onClick={() => latandlong(data.place_id)}>
                    {data.structured_formatting.main_text}
                    <p className='text-sm opacity-50'>{data.structured_formatting.secondary_text}</p>
                 
                </li>
              )) }
            </ul>
          </div>
        </div>
      </div>

     
      
     
      
      

      <div className="w-full shadow z-30 md h-22 flex justify-center items-center">
        <div className=' w-[80%] flex justify-between h-18'>
          <div className='flex items-center'>
            <Link to={"/"}>
              <img className='w-20 h-22 filter: brightness(1.1) contrast(1.1) ' src="https://i.pinimg.com/736x/b3/8a/a1/b38aa1b21050b0e769a97eb751d12829.jpg" alt="" />
            </Link>
            <div className='flex items-center gap-1' onClick={handleVisibility}>
              <p className='flex items-center mr-20'>
                <span className=' font-bold border-b-2 text-wrap '>{shortAddress}</span>
             
             <span>  <IoIosArrowDown className='text-orange-500 size-5' /></span>
                <span className='ml-1 overflow-hidden w-[90px]
                       text-sm opacity-85 line-clamp-1 '>{address}</span>
               
                </p>
            </div>
          </div>

          <div className='flex item-center gap-12 pd-2 justify-center h-full m-4'>
            {navitems.map((item, index) => (
              <div>
              <div className='flex gap-3' key={index}>
                <p className='mt-1 text-xl text-gray-700'>{item.icon}</p>
                <p className='text-lg font-medium text-gray-500'>{item.name}</p>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}

export default Head;
