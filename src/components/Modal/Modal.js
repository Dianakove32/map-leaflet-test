import React from 'react';
import cn from 'classnames'
import  './Modal.css'

const Modal = ({ setActive, active = false, className = false, children  }) => {

  return <div className={cn('modal-background', { 'active': active })} onMouseDown={() => setActive(false)} >
    <div className={cn('modal-content', { [className]: className } )}  onMouseDown={e => e.stopPropagation()}>
      {active && children}
    </div>
  </div>
}

export default Modal