import React, { useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

const Navbar = ({onLogout}) => {
  const [showLogout, setShowLogout] = useState(null);

  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <div className='profile-container' onClick={onLogout} onMouseEnter={()=>setShowLogout(true)} onMouseLeave={()=>setShowLogout(false)}>
          <img className='profile' src={assets.profile_image} alt="" />
          {showLogout && (
            <button className='logout-button'>Logout</button>
          )}
        </div>
    </div>
  )
}

export default Navbar