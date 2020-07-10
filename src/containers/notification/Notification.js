import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNotification } from '../../actions';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends Component {

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(newProps) {
    const { message, level } = newProps.notification;
    this.notificationSystem.addNotification({
      message,
      level,
      autoDismiss: 7
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" style={style} />
    );
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);

const style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      padding: '20px'
    }
  }
}
