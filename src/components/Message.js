import React from 'react';

const Message = ({
  message,
  toggleSelect,
  toggleStar
}) => {
  const readClass = message.read ? 'read' : 'unread'
  const selectClass = message.selected ? 'selected' : ''
  const starClass = message.starred ? 'fa-star' : 'fa-star-o'

  const labels = message.labels.map((label, i) => (
    <span key={i} className="label label-warning">{label}</span>
  ))


return (
  <div className={`row message ${readClass} ${selectClass}`} onClick = { () => toggleSelect(message)}>
  <div className="col-xs-1">
    <div className="row">
      <div className="col-xs-2">
        <input type="checkbox" checked = {message.selected}/>
      </div>
      <div onClick = { () => toggleStar(message) } className="col-xs-2">
        <i className={`star fa ${starClass}`}></i>
      </div>
    </div>
  </div>
  <div className="col-xs-11">
      {labels}
      {message.subject}
    </div>
    </div>
)
}

export default Message;
