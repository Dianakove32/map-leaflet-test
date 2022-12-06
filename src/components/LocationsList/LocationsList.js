import React, {useEffect, useRef, useState} from 'react';
import './LocationsList.css'

const LocationsList = ({setActive,ip}) => {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState(false)
  const isMount = useRef(true)

  useEffect(()=>{
   if (isMount.current ) {
     isMount.current = false
     fetch('https://dev-sso.transparenterra.com/api/location-list')
       .then((response) => {
         if (response.status === 404) {
           setError(true)
         } else if (response.status === 200) {
         }
         return response.json();
       })
       .then((data) => {
         let myDataIp = data.data.filter(el => el.ip === ip.ip)
         setData(myDataIp);
       })
       .catch(err => console.log(err))
   }
  },[])

  return (
    <div>
      {(!error && !data) && <h2>Loading...</h2>}
      {error &&<> <div className="header-modal">
        <h3 className="title">Error</h3>
        <span className="cross" onClick={()=>setActive(false)}>&#10006;</span>
      </div>
      <p>Something went wrong try again</p>
      </>
      }
      { (!error && data) && <>
        <div className='header-modal'>
          <h2 className='title'>List of locations</h2>
          <span className='cross' onClick={()=>setActive(false)}>&#10006;</span>
        </div>
      <table>
        <thead>
        <tr>
          <th>
            Ip
          </th>
          <th>
            Coord_x
          </th>
          <th>
            Coord_y
          </th>
        </tr>
        </thead>
        <tbody>
        {data?.length === 0 && <p>There is no data</p>}
        {data?.length > 0 && data?.map(el=>{
          return <tr key={el.id}>
            <th>
              {el.ip}
            </th>
            <th>
              { Number(el.coord_x).toFixed(1)}
            </th>
            <th>
              {Number(el.coord_y).toFixed(1)}
            </th>
          </tr>
        })}
        </tbody>
      </table></> }
    </div>
  );
};

export default LocationsList;