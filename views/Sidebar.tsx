import * as React from 'react'

const jsdom = require('jsdom')
const Window = require("window")

const window = new Window();

export default function Sidebar() {
    const style = `
    .sidenav {
        height: 100%;
        width: 180px; 
        position: fixed; 
        z-index: 1;
        top: 0; 
        left: 0;
        background-color: #111; 
        overflow-x: hidden; 
    }
    .main {
        margin-left: 190px; 
        padding: 10px;
    }
    .keep_pressing_on {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    `

    let numberOfCall = 1
    
    function changeUserSettings() {
        return {__html: `
        <script>
            const theme = localStorage.getItem("theme")

            function changeThemeToLight() { 
                $("body").css({"color": "#202020"})
                document.getElementById("theBody").style.background = "#F8F8FF"
                $("h1").css({"background-color": "#F8F8FF", "color": "#202020"})
                $("h2").css({"background-color": "#F8F8FF", "color": "#202020"})
                document.getElementById("sidebar").style.background = "#D3D3D3"
            }
            function changeThemeToDark() {
                $("body").css({"color": "white"})
                document.getElementById("theBody").style.background = "#202020"
                $("h1").css({"background-color": "#202020", "color": "white"})
                $("h2").css({"background-color": "#202020", "color": "white"})
                document.getElementById("sidebar").style.background = "#111"
            }
            function Pride() {
                $("body").css({"background-image": 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Nonbinary_flag.svg/1920px-Nonbinary_flag.svg.png")'})
                $("h1").css({"background-color": "#FCF434", "color": "white"})
                $("h2").css({"background-color": "#FCF434", "color": "white"})
            }
            document.getElementById("button").addEventListener("click", function() {
                var dark = document.getElementById("dark")
                var light = document.getElementById("light")
                var enby = document.getElementById("enby")
                if(dark.checked == true) {
                    changeThemeToDark()
                    localStorage.setItem("theme", "Proper")
                }
                if(light.checked == true) {
                    changeThemeToLight()
                    localStorage.setItem("theme", "AAAAAAA MY EYES")
                }
                if(enby.checked == true) {
                    Pride()
                    localStorage.setItem("theme", "hello fellow enby")
                }
            })
            if(theme == "AAAAAAA MY EYES") {
                changeThemeToLight()
            }
            if(theme == "Proper") {
                changeThemeToDark()
            }
            if(theme == "hello fellow enby") {
                Pride()
                document.getElementById("I_see_that_you_found_my_poorly_hidden_Easter_egg_so_congrats").removeAttribute("hidden")
            }
            document.getElementById("hidebar").addEventListener("click", function() {
                document.getElementById("sidebar").style.width = "0px"
                $("body").css({"margin-left": "10px"})
                localStorage.setItem("Sidebar status", "Hidden")
                
            })
            document.getElementById("unhidebar").addEventListener("click", function() {
                document.getElementById("sidebar").style.width = "180px"
                $("body").css({"margin-left": "190px"})
                localStorage.removeItem("Sidebar status")
                
            })
            if(localStorage.getItem("Sidebar status") == "Hidden") {
                document.getElementById("sidebar").style.width = "0px"
                $("body").css({"margin-left": "10px"})
            }
        </script>
        `
        }
    }
    
    return (
        <>
        <style>
          {style}
        </style>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <span id="sidebar" className="sidenav">
            <h3>Settings</h3>
            <h4>Theme</h4>
            <form>
                <input type="radio" name="theme" id="dark" />
                    <label htmlFor="dark">Dark</label><br/>
                <input type="radio" name="theme" id="light" />
                    <label htmlFor="light">Light</label><br/>
                <span id="I_see_that_you_found_my_poorly_hidden_Easter_egg_so_congrats" hidden>
                    <input type="radio" name="theme" id="enby" />
                        <label htmlFor="enby"><abbr title="Non-binary">Hexadecimal</abbr></label>
                </span>
            </form><br/>
            <button className="button" id="button">Select</button>
            <h4>Miscellaneous</h4>
            <button className="button" id="hidebar">Hide sidebar</button>
        </span>
        <span id="unhidebar" className="keep_pressing_on button">Show sidebar</span>
        <p dangerouslySetInnerHTML={changeUserSettings()}></p>
        </>
    ) 
}
