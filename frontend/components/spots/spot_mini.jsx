import React from 'react';
import {Link} from 'react-router';

export default (props) => {

  return (

    <div className='spot-mini-main-container'>

      <Link to={`/spots/profile/${props.spot.id}`}>
        <img className='spot-img' src={props.spot.main_photo_url}>
        </img>

        <div className='spot-mini-price-and-title'>
          <span>{props.spot.base_price} &middot; {props.spot.title}</span>
        </div>

        <div className='spot-mini-privacylevel-and-numbeds'>
          <span>{props.spot.privacy_level} &middot; {props.spot.num_beds} beds </span>
        </div>

      </Link>

    </div>

  );

}
