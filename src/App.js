import React, { Component } from 'react';
import './App.css';
import messages from './Data/messages';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

class App extends Component {
 constructor(props) {
   super(props)
   this.state = {
     messages
   }
 }

  toggleStar(message) {
     this.setState(prevState => {
       let present = prevState.messages.indexOf(message)
          prevState.messages[present].starred ?
          prevState.messages[present].starred = false :
          prevState.messages[present].starred = true
  })
  }

  toggleSelect(message) {
    this.setState(prevState => {
      let present = prevState.messages.indexOf(message)
         prevState.messages[present].selected ?
         prevState.messages[present].selected = false :
         prevState.messages[present].selected = true
    })
  }

  clickSelectDeselectAll(messagesSelected) {
    messagesSelected < this.state.messages.length ?
    this.state.messages.forEach((message, i) => {
      this.setState(prevState => {
        prevState.messages[i].selected = true
      })
    }) :
    this.state.messages.forEach((message, i) => {
      this.setState(prevState => {
        prevState.messages[i].selected = false
      })
    })
  }

  markAsRead(messages) {
    this.state.messages.forEach((message, i) =>
      message.selected ?
        this.setState(prevState =>  prevState.messages[i].read = true) : null
    )
  }

  markAsUnread(messages) {
    this.state.messages.forEach((message, i) =>
      message.selected ?
        this.setState(prevState => prevState.messages[i].read = false) : null
    )
  }

  addLabel(label) {
    this.setState(prevState => {
      return prevState.messages.map(message => {
        return message.selected && !message.selected.includes(label) && label !== 'Apply label' ?
            message.labels.push(label) :
          message
        })
    })
  }

  deleteMessage(messages) {
    this.setState(prevState => {
      prevState.messages.forEach((message, i) => {
        return message.selected ?
        messages.splice(i, 1) :
        message
      })
    })
  }

  render() {
    return (
      <body className='container'>
          <Toolbar messages = {this.state.messages}
                  clickSelectDeselectAll = { this.clickSelectDeselectAll.bind(this)}
                  markAsRead = { this.markAsRead.bind(this) }
                  markAsUnread = {this.markAsUnread.bind(this)}
                  addLabel = { this.addLabel.bind(this)}
                  deleteMessage = { this.deleteMessage.bind(this)}/>
          <MessageList  messages = { this.state.messages }
          toggleSelect = {this.toggleSelect.bind(this)}
          toggleStar = {this.toggleStar.bind(this)}
          />
      </body>
    );
  }
}



export default App;
