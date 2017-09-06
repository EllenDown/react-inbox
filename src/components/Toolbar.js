import React from 'react';

const Toolbar =
({
  messages,
  clickSelectDeselectAll,
  markAsRead,
  markAsUnread,
  addLabel,
  removeLabel,
  deleteMessage
}) => {
  const unReadMessages = messages.filter(message => message.read === false).length
  const messagesSelected = messages.filter(message => message.selected === false).length
  const disableButtons = () => { return messagesSelected === 0 ? true : false }

let buttonSelect
if (messagesSelected === messages.length) {
  buttonSelect = 'face-check-square-o'
 } else if (messagesSelected  === 0 ) {
   buttonSelect = 'fa-square-o'
 } else {
   buttonSelect = 'fa-minus-square-o'
 }

  return (

    <div className="row toolbar">
    <div className="col-md-12">
    <p className="pull-right">
      <span className="badge badge">{ unReadMessages }</span>
      unread messages
    </p>

    <a className="btn btn-danger">
      <i className="fa fa-plus"></i>
    </a>

    <button className="btn btn-default" onClick ={ () => clickSelectDeselectAll(messagesSelected) }>
      <i className={`fa ${ buttonSelect }`}></i>
    </button>

    <button className="btn btn-default" onClick = { markAsRead }>Mark As Read</button>

    <button className="btn btn-default" onClick = { markAsUnread }>Mark As Unread</button>

    <select className="form-control label-select"
      // disabled = { disableButtons () }
      onChange = { (e) => addLabel(e.target.value) }>

      <option>Apply label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <select className="form-control label-select"
      // disabled = { disableButtons () }
      onChange = { (e) => removeLabel(e.target.value) }>
      <option>Remove label</option>
      <option value="dev">dev</option>
      <option value="personal">personal</option>
      <option value="gschool">gschool</option>
    </select>

    <button className="btn btn-default"
      // disabled = { disableButtons() }
      onClick = { () => deleteMessage(messages) }>
      <i className="fa fa-trash-o"></i>
    </button>
  </div>
</div>
  )
}

export default Toolbar;
