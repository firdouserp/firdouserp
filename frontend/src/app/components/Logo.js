import React, { Component } from 'react';
import image from './ds_circle_logo.png';
class Logo extends Component {
  render() {
    return (
      <div className="logo-main">
        <img width="40px" alt="daily smarty ui image logo big" src={image} />
      </div>
    )
  }
}

export default Logo;