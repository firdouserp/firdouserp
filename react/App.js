import React, { Component } from 'react';
import Person from './Person/Person';
class App extends Component{
    render() {
        return (
            <div className='App'>
                <h1>Hi, I am a react app</h1>
                <p> This is really Working</p>
                <Person/>
            </div>
        )
    }
}