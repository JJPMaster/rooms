import * as React from 'react'

import * as ReactDOM from "react-dom"

import jQuery from "jquery"
//@ts-ignore
import Sidebar from "./Sidebar.tsx"

import dynamic from "@next-tools/dynamic"

const bootstrap = dynamic( () => import('bootstrap'), { ssr: false } )

const Window = require("window")

const window = new Window();
 
const jsdom = require('jsdom')

const $ = require('jquery')(new jsdom.JSDOM().window)

const roomStyle = `
  body {
      color: white;
      font-family: Helvetica;
      background-color: #202020;
      text-align: center;
  }
  #video-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 300px);
      grid-auto-rows: 300px;
      display: flex;
      flex-direction: row;
      align-items: center;
  }
  video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      
  }
  .button {
      box-shadow: inset 0px 1px 0px 0px #ffffff;
      background: linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);
      background-color: #f9f9f9;
      border-radius: 6px;
      border: 1px solid #dcdcdc;
      display: inline-block;
      cursor: pointer;
      color: #666666;
      font-family: Arial;
      font-size: 15px;
      font-weight: bold;
      padding: 6px 24px;
      text-decoration: none;
      text-shadow: 0px 1px 0px #ffffff;
  }
  h1, h2 {
      color: white;
      font-family: Helvetica;
      background-color: #202020;
      text-align: center;
  }
`
function makeCallIdWork() {
  return {__html: "<script>$('#callID').text(ROOM_ID)</script>"}
}



export default function room() {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script defer src="https://unpkg.com/peerjs@1.2.0/dist/peerjs.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="/socket.io/socket.io.js" defer></script>
        <script type="module" src="../script.js" defer></script>
        <script>
        /* 
        @licstart  The following is the entire license notice for the 
        JavaScript code in this page.

        Copyright (C) 2021 Onach Labs

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.

        @licend  The above is the entire license notice
        for the JavaScript code in this page.
        */
        const ROOM_ID = window.location.pathname.substring(6)
        
        </script>
        <style>
          {roomStyle}
        </style>
        <title>Call - Onach Rooms</title>
      </head>
      <body id="theBody" className="main">
        <h1>Call</h1>
        <h2>Call ID: <span dangerouslySetInnerHTML={makeCallIdWork()} id="callID"></span></h2>
        <div id="video-grid"></div><br />
        <form>
          <label htmlFor="uuid">Join call:&nbsp;</label>
          <input type="text" id="uuid" name="uuid" placeholder="Enter the call UUID here" /> 
          <p className="button" id="submit">Submit</p><br />
          <p className="button" id="leaveCall">Leave call</p><br />
          <p className="button" id="start-screenshare">Start screenshare (beta)</p>
        </form>
        
      </body>
      <Sidebar />
    </>
  )
}
