import React, {useEffect, useState} from 'react';
import Modal from '../Modal/Modal';
import MapComponent from '../Map/Map';
import LocationsList from '../LocationsList/LocationsList';

const MainPage = () => {
  const [isModalLocations, setIsModalLocations] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [ip, setIp] = useState()

  useEffect(()=>{
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        setIp(data.ip)
      }).catch(err=>console.log(err))
  },[])

  return (
    <div className='App'>
      <button className='btn btn-map' onClick={() => setShowModal(true)}>OPEN MAP</button>
      <button className='btn btn-locations' onClick={() => setIsModalLocations(true)}>SHOW LOCATIONS</button>
      <Modal active={showModal} setActive={setShowModal} className='modal-container'>
        <MapComponent ip={ip} setActive={setShowModal}/>
      </Modal>
      <Modal active={isModalLocations} setActive={setIsModalLocations} className='modal-small'>
        <LocationsList ip={ip} setActive={setIsModalLocations}/>
      </Modal>
    </div>
  );
};

export default MainPage;