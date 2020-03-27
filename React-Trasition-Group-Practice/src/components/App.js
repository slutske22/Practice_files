import React, { Component } from 'react';
import './App.css';
// VERSION 2.x of React Animation Add-on

//import { Transition } from 'react-transition-group';     //the lifecycle events for appear, enter, leave
import { CSSTransition } from 'react-transition-group';  //the css animations extends Transition
import { TransitionGroup } from 'react-transition-group';   //manage a group of transitions

export default class App extends Component {
    
    constructor(){
        super();
        this.state = {
            things: ['what','is','going','on']
        }
    }
    clickHandler = (ev) => {
        //remove the p from the page
        let txt = ev.target.textContent;
        console.log('remove', txt);
        let things = this.state.things;
        things = things.filter( thing => thing !== txt);
        console.log(things);
        this.setState({ things });
    }
    render() {
        return (
            <div>
                
            <CSSTransition in={true} appear={true} timeout={2000}
                classNames="hhh">
                <h1>TransitionGroup & CSSTransition</h1>
            </CSSTransition>
            
                <TransitionGroup>
                    { this.state.things.map( (thing, index) => (
                     <CSSTransition 
                           key={'csst' + index} 
                           in={true}
                           appear={true}
                           timeout={2500} 

                             onEnter = { ()=>console.log('onEnter') }
                             onEntering = {  ()=>console.log('onEntering') }
                             onEntered = {  ()=>console.log('onEntered') }

                             onExit = {  ()=>console.log('onExit') }
                             onExiting = {  ()=>console.log('onExiting') }
                             onExited = {  ()=>console.log('onExited') }
                             
                           classNames="example" 
                           // writing classNames="example" the same as writing all this:
                           classNames={{
                              appear: 'example-appear',
                              appearActive: 'example-appear-active',

                              enter: 'example-enter',
                              enterActive: 'example-enter-active',
                              enterDone: 'example-enter-done',

                              exit: 'example-exit',
                              exitActive: 'example-exit-active',
                              exitDone: 'example-exit-done'
                           }}
                        >

                           <p key={ index } onClick={this.clickHandler}>
                              {thing}
                           </p>

                        </CSSTransition>
                    ))}

                </TransitionGroup>
            </div>
        );
    }
}





/*
Events for Transition / CSSTransition
onEnter = { function }
onEntering = { function }
onEntered = { function }
onExit = { function }
onExiting = { function }
onExited = { function }
*/