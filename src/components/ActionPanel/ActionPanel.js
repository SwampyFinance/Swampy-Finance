import React from 'react'
import { useDispatch } from 'react-redux';

import './ActionPanel.css'
import {headerActions} from '../../actions';
const ActionPanel = props => {
  const {title, actiontitle, actionType} = props;
  // const [value, setValue] = React.useState(placeholder);
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(headerActions.headerUpdateTrigger(actionType));
  }

  return (
    <section className="ActionPanel">
      <div className="Title">
        <div>{title}</div>
      </div>
      <div className="LeftWrapper">
        <button className="Button" onClick={onClick}>{actiontitle}</button>
      </div>
    </section>
  )
}

export default ActionPanel
