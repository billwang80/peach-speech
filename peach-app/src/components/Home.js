import React, { Component } from 'react'
import {Link} from "react-router-dom"
import logo from "../images/peach_logo.png"

import "../style.css"

export default class Home extends Component {
  render() {
    return (
      <div className="main">
        <div className="container">
          <Link to="/">
            <img src={logo} width="15%" alt="logo" />
          </Link>
          <div className="home-text">
            Developing Public Speech. 
          </div>
        </div>
        <div style={{padding: 10}}>
          <Link to="/speech">
            <button className="button">
              <h2 style={{cursor: "pointer"}}> Get Started </h2>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}