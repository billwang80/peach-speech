import React, { Component } from 'react'
import { Link } from "react-router-dom"

import logo from "../images/peach_logo.png"
import play from "../images/play.png"
import pause from "../images/pause.png"

import "../style.css"

const webkitSpeechRecognition = window.webkitSpeechRecognition
const SpeechRecognition = webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.autoStart = false
recognition.interimResults = true
recognition.lang = 'en-US'

export default class Speech extends Component {
  state = {
    transcript: '',
    playing: false,
    recognition,
    first: true,
  }

  constructor(props) {
    super(props)
    this.state.recognition.onresult = this.handleListen.bind(this)
  }

  handleListen = (event) => {
    if (event.results[0][0].confidence >= 0.60) {
      this.setState({transcript: event.results[0][0].transcript})
    }
  }

  toggleRecord = () => {
    if (this.state.playing) {
      recognition.stop()
    } else {
      recognition.start()
    }
    this.setState((prevState) => ({first: false, playing: !prevState.playing}))
  }

  render() {
    let recordButton = null
    if (this.state.transcript.length === 0 || this.state.playing) {
      recordButton = (
        <button className="button" onClick={this.toggleRecord}>
          <h2 style={{cursor: "pointer"}}> {this.state.playing === true ? "Stop Recording" : "Start Recording"} </h2>
        </button>
      )
    } else {
      recordButton = (
        <div className="record-container">
          <div className="button-container">
            <button className="button" onClick={this.toggleRecord}>
              <h2 style={{cursor: "pointer"}}> Retry </h2>
            </button>
          </div>
          <div className="button-container">
            <Link to={"/feedback"} state={{ data: this.state.transcript }}>
              <button className="feedback-button" >
                <h2 style={{cursor: "pointer"}}> Feedback </h2>
              </button>
            </Link>
          </div>
        </div>
      )
    }

    const errorMessage = this.state.transcript.length === 0 && !this.state.first && !this.state.playing ? "Can't hear you! Try speaking up." : "\t"

    return (
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} width="15%" alt="logo" />
          </Link>
        </div>
        <div className="record-button-container">
          <img src={this.state.playing ? pause : play} alt={this.state.playing ? "RECORDING" : "PAUSED"} onClick={this.toggleRecord} style={{cursor: "pointer", width: '5%'}} />
        </div>
        <div>
          {recordButton}
          <div className="error-message">
            {errorMessage}
          </div>
        </div>
      </div>
    )
  }
}
