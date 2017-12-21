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
      level
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
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





















// import React, { Component } from "react"
// import NotificationSystem from 'react-notification-system'
//
// class NotificationContainer extends Component {
//
//   // constructor(props) {
//   //   super(props);
//   // }
//
//   componentDidMount() {
//     this.notificationSystem = this.refs.notificationSystem;
//   }
//
//   // componentWillReceiveProps(newProps) {
//   //   const { message, level } = newProps.notification;
//   //   this.notificationSystem.addNotification({
//   //     message,
//   //     level
//   //   });
//   // }
//
//   componentWillReceiveProps(nextProps) {
//     const {message, level} = nextProps
//
//     console.log(message, level);
//
//
//     this.notificationSystem.addNotification({
//       message,
//       level
//     })
//   }
//
//   render() {
//     return (
//       <NotificationSystem ref="notificationSystem" />
//     );
//   }
// }
//
// export default NotificationContainer
