import React, {Component} from 'react';
import * as firebase from 'firebase';
import Header from '../header/Header';
import { fetchNotes, noteDelete } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import IconTag from '../../components/icons/IconTag';
import Modal from 'react-modal';
import IconTrash from '../../components/icons/IconTrash'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const PER_PAGE = 5;

class NotesList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      openDeleteModal: false,
    }
  }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.props.fetchNotes(currentUser.uid)
    Modal.setAppElement('body');
  }

  onNoteRemove = (note) => {

    this.props.noteDelete(note._id, note.title)

    this.setState({ openDeleteModal: false })
  }

  openDeleteModal = (note) => {

    this.setState({
      openDeleteModal: true,
      note
    })
  }

  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <Link className="tag" to={ `/tags/${tag}` } key={tag}><span className="icon-wrapper"><IconTag fill="#2DB5CF" /></span><span className="tag-wrapper">{tag}</span></Link>;
        })}
      </div>;
    }
  }

  renderNotes = () => {
    const {notes} = this.props

    const { currentUser } = firebase.auth()

    let ownedItems = []
    let sharedItems = []

    notes.forEach(item => {

      if (item.ownerId === currentUser.uid) {
        ownedItems.push(item)
      }

      if (item.sharedWith) {
        item.sharedWith.forEach(email => {

          if (email === currentUser.email) {
            return sharedItems.push(item)
          } else {
            return
          }

        })
      }
    })

    let arrayToRender = [...ownedItems, ...sharedItems]

    if (notes) {

      return arrayToRender.map((note, i) => {
        console.log('NOTE', note);
        return (
          <Draggable draggableId={note._id} index={i} key={note._id}>
            {(provided) => (
              <li
                className="item"
                // key={note._id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Link to={`/notes/${note._id}`}><h3 className="head">{note.title}</h3></Link>
                { this.renderTags(note.tags) }

                <span className="float-right cursor-pointer">
                  <span onClick={() => this.openDeleteModal(note)} className="icon-wrapper"><IconTrash fill="#2DB5CF" /></span>
                </span>
              </li>
            )}
          </Draggable>
        );
      });
    }
  }

  onDragEnd = result => {
    // console.log('AAA', this.props.notes)
    // console.log('result', result)

    const { destination, source, draggableId } = result

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  }

  render() {
    // console.log('AAA', this.props)
    return (
      <div>
        {/* {content} */}
        {/* {this.renderDeleteModal} */}
        <Header />
        <div className="row">
          <div className="column size_75 float-none centered">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId={'column-1-unique-id'}>
                {(provided) => (
                  <ul
                    className="list-of-posts"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {this.renderNotes()}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
        {this.state.openDeleteModal && <Modal
          isOpen={this.state.openDeleteModal}
          contentLabel="Delete Modal"
          style={customStyles}
        >
          <span className="close-modal cursor-pointer" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>X</span>
          <div className="confirm-text"><h3>{`Opravdu vymazat poznamku ${this.state.note.title}?`}</h3></div>
          <div className="confirm-buttons">
            <button className="confirm-button danger" onClick={() => this.onNoteRemove(this.state.note)}>Ano</button>
            <button className="confirm-button bare" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>Ne</button>
          </div>
        </Modal>}
      </div>
    );
  }
}



const mapStateToProps = state => {
  console.log('state', state)

  const notes = _.map(state.notes, (val, uid) => {
    return { ...val, uid } // { title: '', content: '', tags: [], id: 'a564dsa654d6as' }
  })

  return {
    notes
  };
}

export default connect(mapStateToProps, { fetchNotes, noteDelete })(NotesList)


const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20%',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '20%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}
