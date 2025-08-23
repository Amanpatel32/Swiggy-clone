import React from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";


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
      icon: <i class="fi fi-rs-user"></i>
    },
    {
      name: "cart",
      icon: <i className="fi fi-rr-shopping-cart-add"></i>
    },
  ]



  return (
    <div className="w-full shadow md h-22 flex justify-center items-center">
      <div className=' w-[70%] flex justify-between h-18'>

        <div className='flex items-center'>
          <img className='w-18 h-16 filter: brightness(1.1) contrast(1.1);
               mix-blend-mode: multiply;' src="https://w7.pngwing.com/pngs/47/533/png-transparent-swiggy-office-business-online-food-ordering-delivery-bangalore-business-food-text-orange-thumbnail.png" alt="" />
          <div className='flex items-center gap-1'>

            <p className=' font-bold border-b-2'>Other</p>
            <IoIosArrowDown className='text-orange-500 size-5' />
          </div>


        </div>

        <div className='flex item-center gap-12 pd-2 justify-center h-full m-6'>

          {navitems.map((item) => (
            <div className='flex gap-3'>
              <p className='mt-1 text-xl text-gray-700'> {item.icon}</p>
              <p className='text-lg font-medium text-gray-500'>{item.name}</p>
            </div>

          ))}




        </div>



      </div>

    </div>



  );
}

export default Head;