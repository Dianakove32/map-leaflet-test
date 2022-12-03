import React, {useEffect, useMemo, useRef, useState} from 'react';
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet';
import L from "leaflet";
import icon from "./constants.js";

import   './Map.css'

export default function MapComponent({setActive, ip}) {
  const [pos, setPos] = useState(undefined);

  const handleOnSave = () => {
    const data = {
      ip:ip,
      coord_x: pos?.lat,
      coord_y: pos?.lng,
    }
        fetch('https://dev-sso.transparenterra.com/api/save-location',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body:JSON.stringify(data),
    })
      .then((response) =>console.log(response.json())).catch(err=>console.log(err))
    setActive(false)
  }

  return (
    <div className='map-container'>
      <div className='header-modal'>
        <h3 className='title'>Transparenterra community map</h3>
        <span className='cross' onClick={()=>setActive(false)}>&#10006;</span>
      </div>
    <MapContainer className= 'leaflet-container'
      center={[49.1951, 16.6068]}
      zoom={7}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <LocationMarker getPosition={setPos}  />
    </MapContainer>
      <button className='btn btn-map' onClick={handleOnSave}>SAVE</button>
    </div>
  );
}

function LocationMarker({getPosition= function (){}} ) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);
  const map = useMap();
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);
useEffect(()=>{
  position && getPosition(position)

},[position])

  return position === null ? null : (
    <Marker position={position}
            icon={icon}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}>
      >
    </Marker>
  );
}