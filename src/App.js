import React, { Component } from 'react';
import './App.css';
// import messages from './Data/messages';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

const baseURL = "http://localhost:8082/api"

class App extends Component {

 state = { messages: []
 };

 async componentDidMount() {
   try {
     const data = await fetch(`${baseURL}/messages`)
     const response= await data.json()
     this.setState({ messages: response._embedded.messages})
   } catch(err) {

   }
 }

 toggleStar(message) {
   const body = {
     "messageIds" : [ message.id ],
     "command": "star",
     "star": !message.starred
   }
   const settings = {
     method: 'PATCH',
     headers: {
       'content-type' : 'application/json'
     },
     body: JSON.stringify(body)
   }
   fetch(`${baseURL}/messages`, settings)
    .then(response => {
      if (response.ok) {
        this.setState(prevState => {
          let present = prevState.messages.indexOf(message)
             prevState.messages[present].starred ?
             prevState.messages[present].starred = false :
             prevState.messages[present].starred = true
           })
      }
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

  markAsRead(messages, message) {
    let messagesRead = []
    this.state.messages.forEach(message => {
      if (message.selected && !message.read) {
      return messagesRead.push(message.id)
      return message
      }
    })
    const body = {
        "messageIds" :  messagesRead ,
        "command": "read",
        "read": !message.read
    }
    const settings = {
        method: 'PATCH',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(`${baseURL}/messages`, settings)
       .then(response => {
         if (response.ok) {
           this.state.messages.forEach((message, i) =>
             message.selected ?
               this.setState(prevState =>  prevState.messages[i].read = true) : null
           )
         }
       })
    }


  markAsUnread(messages, message) {
    let messagesUnread = []
    this.state.messages.forEach(message => {
      if (message.selected && !message.read) {
      return messagesUnread.push(message.id)
      return message
      }
    })
    const body = {
        "messageIds" :  messagesUnread ,
        "command": "read",
        "read": message.read
    }
    const settings = {
        method: 'PATCH',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(`${baseURL}/messages`, settings)
       .then(response => {
         if (response.ok) {
           this.state.messages.forEach((message, i) =>
             message.selected ?
               this.setState(prevState =>  prevState.messages[i].read = false) : null
           )
         }
       })
    }


  addLabel(label) {
    let messageNeedsLabel = []
    this.state.messages.map(message => {
      if (message.selected && !message.labels.includes(label)) {
      return messageNeedsLabel.push(message.id)
      return message
    }
    })

    const body = {
        "messageIds" :  messageNeedsLabel ,
        "command": "addLabel",
        "labels": label
        }
    const settings = {
        method: 'PATCH',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(`${baseURL}/messages`, settings)
       .then(response => {
         if (response.ok) {
           this.setState(prevState => {
            return prevState.messages.map(message => {
              return message.selected && !message.labels.includes(label) && label !== 'Apply label' ?
                message.labels.push(label) :
                  message
                })
              })
            }
          })
        }

  removeLabel(label) {
    let loseMessageLabel = []
    this.state.messages.map(message => {
      if (message.selected && !message.labels.includes(label)) {
      return loseMessageLabel.push(message.id)
      return message
    }
    })

    const body = {
        "messageIds" :  loseMessageLabel ,
        "command": "removeLabel",
        "labels": label
        }
    const settings = {
        method: 'PATCH',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(`${baseURL}/messages`, settings)
       .then(response => {
         if (response.ok) {
           this.setState(prevState => {
              return prevState.messages.map(message =>  {
                 return message.selected && message.labels.includes(label) ?
                 message.labels.splice(message.labels.indexOf(label), 1) :
                  message
                })
              })
            }
          })
        }

  deleteMessage(messages) {
    let deleteId = []
    this.state.messages.forEach(message => {
      if (message.selected) {
      return deleteId.push(message.id)
    }
    })

    const body = {
        "messageIds" :  deleteId ,
        "command": "deleteMessage",
        }
    const settings = {
        method: 'PATCH',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      }
      fetch(`${baseURL}/messages`, settings)

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
                  removeLabel = { this.removeLabel.bind(this)}
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
