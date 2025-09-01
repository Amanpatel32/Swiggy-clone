import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ResturantMenu() {
  const { id } = useParams()

  //console.log(id);



  // console.log(id.split("-").at(-1).slice(4));
  const MainId = id.split("-").at(-1).slice(4);
  const [ResturantInfo, setResturantInfo] = useState([])
  const [MenuData, setMenuData] = useState([])
  const [discountData, setDiscountData] = useState([])
  const [value, setValue] = useState(0)
  // const [curIndex, setCurIndex] = useState(false)

  function HandleNext() { }


  function HandlePrev() { }


  async function fetchMenu() {

    try {

      let data = await fetch(`/api/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${MainId}&catalog_qa=undefined&submitAction=ENTER`);
      let res = await data.json()
      // console.log(res?.data?.cards[4]?.groupedCard?.
      //   cardGroupMap?.REGULAR);

      // eslint-disable-next-line no-unsafe-optional-chaining
      let actualMenu = (res?.data?.cards[4]?.groupedCard?.
        cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.itemCards)
      // console.log(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
      //console.log(actualMenu);




      setResturantInfo(res?.data?.cards[2]?.card?.card.info)
      setDiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
      setMenuData(actualMenu)

      //  setMenuData(res?.data?.cards[4]?.groupedCard?.
      //  cardGroupMap?.REGULAR?.cards[1]?.card?.card)
      //console.log(menuData);



    }
    catch (error) {
      console.error('Error fetching data:', error);
      setMenuData([]);
      setDiscountData([]);
    }

  }

  useEffect(() => {
    fetchMenu();

  }, [])


  // console.log(id);

  return (
    <div className='w-full '>
      <div className=' '>

        <div className='w-[800px] mx-auto pt-8'>
          {/* {console.log(ResturantInfo)
          } */}
          <p className='text-sm text-slate-950'>
            <Link to={"/"}> <span className=' hover:text-slate-950'>Home </span> </Link> <Link to={"/"}> / <span className='hover:text-slate-950 cursor-pointer'>{ResturantInfo.city}</span> </Link>/ <span className=' text-slate-950 cursor-pointer' >{ResturantInfo.name}</span>
          </p>
          <h1 className='font-bold text-3xl px-4 pb-4'>{ResturantInfo.name}</h1>

          <div className='w-full  bg-gradient-to-t from-slate-300/70 p-3  h-[162px] mt-4 rounded-[30px]'>
            <div className='w-full h-full border border-slate-300/70 rounded-[30px] p-4 bg-white'>

              <div className='font-bold flex items-center gap-1'>
                <i className="fi fi-sr-circle-star text-xl mt-1 text-green-700"></i>
                <span>{ResturantInfo.avgRatingString}</span>
                <span>({ResturantInfo.totalRatingsString})</span>
                <span>.</span>
                <span>{ResturantInfo.costForTwoMessage}</span>
              </div>
              <p className='underline font-semibold text-orange-500'>{ResturantInfo?.cuisines?.join(" , ")}</p>
              <div className='flex gap-2 mt-2'>
                <div className='flex flex-col justify-center items-center w-[7px'>
                  <div className='w-[7px] h-[7px] bg-gray-400 rounded-full'></div>
                  <div className='w-[2px] h-[30px] bg-gray-400'></div>
                  <div className='w-[7px] h-[7px] bg-gray-400 rounded-full'></div>
                </div>
                <div className='flex flex-col gap-4 text-sm font-semibold'>
                  <p className='font-semibold'>Outlet . <span className='text-gray-400'>{ResturantInfo.locality}</span></p>

                  <p>{ResturantInfo?.sla?.slaString}</p>
                </div>

              </div>



            </div>

          </div>

        </div>



        <div className='w-[800px] mx-auto mt-2 px-2 overflow-hidden'>

          <div className='flex justify-between mt-5'>
            <div className='font-bold text-2xl ml-4 mt-3'>
              <h1>Deals For You</h1>
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

          <div className='flex gap-3 mt-4'>
            {
              discountData.map((data) => (
                <Discount data={data} />

              ))
            }
          </div>

          <h2 className='text-center mt-5'>MENU</h2>

          <div className='w-[790px] mt-5 relative'>
            <div className='w-full font-semibold text-xl p-2 text-center rounded-4xl bg-slate-200'>Search for dishes</div>
            <i className="fi  top-3 right-4 absolute fi-bs-search"></i>
          </div>

          

             <div className='mt-5'>
            {
              MenuData.map(({ card: { card: { itemCards, title } } }) => (


                <Menucard title={title} itemCards={itemCards} />
              ))
            }
          </div>
          

         

        </div>






      </div>
    </div >
  )


  function Discount({ data: { info: { couponCode, offerLogo, header } } }) {
    //console.log(info);

    return (

      <div className='flex gap-3 min-w-[328px] h-[76px] border p-3 rounded-2xl'>
        <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" + offerLogo} alt="" />

        <div>
          <h1 className='font-extrabold text-md'>{header}</h1>
          <p className='text-gray-500 font-semibold'>{couponCode}</p>
        </div>

      </div>
    )

  }
  // dependent function
  // function togglefunction(i) {
  //   setCurIndex(curIndex === i ? null : i)



  // }

  function Menucard(card) {
    console.log(card);
    let hello = false;
    if (card["@type"]) {
      hello = true;
    }

    const [isopen, setIsopen] = useState(true)

    function toggleupdown() {
      setIsopen((curIndex) => !curIndex)


    }
    if (card.itemCards) {
      const { title, itemCards } = card;
      return (
        <>
          <div>
            <div className='flex mt-5 justify-between'>
              <h1 className='mt-3 font-bold text-lg'>{title}({itemCards.length})</h1>
              <i class={"fi text-2xl fi-br-angle-small-" + (isopen ? "up" : "down")} onClick={toggleupdown}></i>
            </div>
            {
              isopen && <Detailmenu itemCards={itemCards} />
            }

          </div >
          <hr className='my-2 border-[10px] text-gray-200'></hr>
        </>
      )
    }
    else {
      const { title, categories } = card;
      //console.log(title);



      return (
        <div>

          <h1> {title}</h1>
          {
            categories.map((data) => (
              <Menucard card={data} />
            ))
          }


        </div>
      )
    }
  }

  function Detailmenu({ itemCards }) {
    const[ismore,setIsmore]=useState(false);
   
    return (
      <div className='my-5'>
        {
          itemCards.map(({ card:
            { info:
              { name,
                defaultPrice,
                price,
                itemAttribute: { vegClassifier },
                ratings: { aggregatedRating: { rating, ratingCountV2 } },
                description,
              imageId, 
              } } }) =>{ 
            const [ismore, setIsmore] = useState(false);
                 let destrim = description.substring(0,120)
                return(

            <>
              <div className='flex justify-between min-h-[182px]'>
                <div className='w-[70%]'>

                  {
                    vegClassifier === "VEG" ? <img className='w-5 h-5 rounded-sm' src="https://imgs.search.brave.com/QeV3zw9-5SUPp-T6MLMYZ2toWALMcghytwXlj7EY4Sk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IyL1ZlZ19zeW1i/b2wuc3Zn" alt="" /> : <img className='w-4 h-4 rounded-sm' src="https://imgs.search.brave.com/6NmsHGBAkTf0RxRb3gFY7qml4-JDVM1ccmF5SnsINek/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC8w/MC80My9ub24tdmVn/ZXRhcmlhbi1zaWdu/LXZlZy1sb2dvLXN5/bWJvbC12ZWN0b3It/NTA4OTAwNDMuanBn" alt="" />
                  }


                  <h2 className='font-bold text-lg'>{name}</h2>
                  <i class="fi fi-br-indian-rupee-sign"></i>
                  <p className='font-bold text-lg'>{defaultPrice / 100 || price / 100}</p>
                  <div className='flex items-center gap-2'> { rating >0 && ratingCountV2>0 ? <i class="fi text-green-600 fi-ss-star"></i> :null}
                    <span>{ratingCountV2 > 0 ? ratingCountV2 : null}</span>  <span>{(rating > 0 ? rating:null)}</span>  </div>
                
                        {description.length > 140 ?   <div>
                          <span className=''>{ismore ? description:destrim}</span>
                                  {

                                   <button className='font-bold' onClick={()=>{setIsmore(!ismore)}}>{ ismore? "Less":"More"}</button>
                                  }
   
                 
                        </div> : <span className=''>{description}</span>}
                 


                </div>

                <div className='[20%] relative h-full '>
                  <img  className ='rounded-xl w-[156px] h-[144px] 'src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                  <button className='bg-white border px-10 absolute bottom-[-20px] left-5 text-green-600 py-2 drop-shadow-xl rounded-xl text-lg font-bold '>add</button>
                </div>



              </div>
              <hr className='my-5'></hr>

            </>

          )})
        }
      </div >
    )
  }
}



export default ResturantMenu;