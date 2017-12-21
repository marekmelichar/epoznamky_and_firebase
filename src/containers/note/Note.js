import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from '../header/Header';

import { fetchNotes } from '../../actions';
import _ from 'lodash'

class Note extends Component {

  componentWillMount() {
    this.props.fetchNotes()
  }

  // onDeleteClick() {
  //   const { id } = this.props.match.params;
  //
  //   this.props.deletePost(id, () => {
  //     this.props.history.push("/");
  //   });
  // }

  render() {
    const { notes } = this.props;
    const { id } = this.props.match.params;

    const note = _.find(notes, itm => itm.uid === id)

    if (!note) {
      return (
        <div>
          <Header />
          Loading...
        </div>
      )
    }

    return (
      <div>
        <Header />
        <Link to="/">Back To Index</Link>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
      </div>
    );

    // return <div>Note Full</div>
  }
}

function mapStateToProps(state, ownProps) {

  // get Array from Firebase response object
  const notes = _.map(state.notes, (val, uid) => {
    return { ...val, uid } // { title: '', content: '', tags: [], id: 'a564dsa654d6as' }
  })

  return {
    // note: state.notes[ownProps.match.params.id]
    notes
  };
}

export default connect(mapStateToProps, { fetchNotes })(Note);
