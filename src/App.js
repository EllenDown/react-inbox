import React, { Component } from 'react';
import './App.css';
// import messages from './Data/messages';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ComposeForm from './components/ComposeForm';

const baseURL = "http://localhost:8082/api"

class App extends Component {

 state = { messages: [],
   composeForm: false,
   subject: '',
   body: ''
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
       messagesRead.push(message.id)
       return messagesRead && message
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
        messagesUnread.push(message.id)
          return messagesUnread && message
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
        messageNeedsLabel.push(message.id)
        } return messageNeedsLabel
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
       loseMessageLabel.push(message.id)
      } return loseMessageLabel
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

  toggleComposeForm() {
    console.log('click')
    this.setState(prevState => {
      prevState.composeForm ?
      prevState.composeForm = false :
      prevState.composeForm = true
    })
  }

  handleSubjectChange(e) {
    this.setState({
      subject: e.target.value
    })
  }

  handleBodyChange(e) {
    this.setState({
      body: e.target.value
    })
  }

async handleSubmit(e) {
        e.preventDefault();
        const newMessage = {
          subject: e.target.subject.value,
          body: e.target.body.value
        }
  const data = await fetch(`${baseURL}/messages`, {
      method: 'POST',
      headers: {
        'content-type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify(newMessage)
    })
      const response= await data.json()
      this.setState({
        messages: [...this.state.messages, response],
        composeForm: false,
        subject: '',
        body: ''
      })
    }

  render() {
    return (
      <body className='container'>
          <Toolbar messages = {this.state.messages}
                  toggleComposeForm = { this.toggleComposeForm.bind(this)}
                  clickSelectDeselectAll = { this.clickSelectDeselectAll.bind(this)}
                  markAsRead = { this.markAsRead.bind(this) }
                  markAsUnread = {this.markAsUnread.bind(this)}
                  addLabel = { this.addLabel.bind(this)}
                  removeLabel = { this.removeLabel.bind(this)}
                  deleteMessage = { this.deleteMessage.bind(this)}/>
            {this.state.composeForm ? <ComposeForm
              handleSubjectChange = {this.handleSubjectChange.bind(this)}
              handleBodyChange = { this.handleBodyChange.bind(this)}
              handleSubmit = {this.handleSubmit.bind(this)} /> : null}
          <MessageList  messages = { this.state.messages }
          toggleSelect = {this.toggleSelect.bind(this)}
          toggleStar = {this.toggleStar.bind(this)}
          />
      </body>
    );
  }
}



export default App;
