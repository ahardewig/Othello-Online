import React, { Component } from 'react'
import { auth, google } from "./rebase.js"

//import amoraLogo from "./images/amora_logo.png"
import googlepic from "./btn_google_signin_light_normal_web@2x.png"
import "./Login.css"


class Login extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    signin = () => {
        auth.signInWithPopup(google).then((data) => {
            const token = data.credential.accessToken
            const user = data.user
            console.log(user)
            console.log(token)
        }).catch((error) => {

        })
    }

    render = () => {
        return (

          <div className="container">

            <div>
                <center><img alt={"Othello-Online"} className="othello" /></center>
                <div className="subtitle">Teamwork Makes the Dream Work</div>

                <img alt={"Login"} onClick={this.signin} className="googleLogin" src={googlepic} ></img>
            </div>

          </div>
        )
    }

}

export default Login;
