import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import MapComponent from '../Map/Map';
import {fetchMainData} from '../../api';
import LocationsList from '../LocationsList/LocationsList';

const resource = fetchMainData()

const MainPage = () => {
  const [isModalLocations, setIsModalLocations] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const ip = resource.id.read()

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