import React, {Component} from 'react';
import Header from '../header/Header';
// import Modal from 'react-modal';
//
// import { createContainer } from 'meteor/react-meteor-data';
// import { Posts } from '../../api/Posts.js';
// import { User } from '../../api/User.js';
// import IconTag from '../components/IconTag.jsx';
// import IconTrash from '../components/IconTrash.jsx';
// import Unauthorized from './Unauthorized.jsx';
// // import Spinner from '../components/Spinner.jsx';
// import { browserHistory } from 'react-router';


// const PER_PAGE = 5;

export default class PostsList extends Component {

  // constructor () {
  //   super();
  //
  //   this.state = {
  //     openDelete: false,
  //     id: ''
  //   }
  //
  //   this.closeDeleteModal = this.closeDeleteModal.bind(this);
  //   this.renderTags = this.renderTags.bind(this);
  //   this.onPostRemove = this.onPostRemove.bind(this);
  // }

  // closeDeleteModal (id) {
  //   let modal = document.getElementById(id)
  //   modal.parentNode.removeChild(modal)
  // }
  //
  // onPostRemove(post) {
  //   Meteor.call('posts.remove', post);
  //   this.closeDeleteModal(post._id);
  // }
  //
  // renderTags( tags ) {
  //   if ( tags ) {
  //     return <div className="tags">
  //       {tags.map( ( tag ) => {
  //         return <a className="tag" href={ `/tags/${ tag }` } key={tag}><span className="icon-wrapper"><IconTag fill="#2DB5CF" /></span><span className="tag-wrapper">{ tag }</span></a>;
  //       })}
  //     </div>;
  //   }
  // }

  // renderList() {
  //   return this.props.posts.map(post => {
  //     const url = `/posts/${post._id}`;
  //
  //     return (
  //       <li className="item" key={post._id}>
  //         <a href={url}><h3 className="head">{post.title}</h3></a>
  //         { this.renderTags( post.tags ) }
  //
  //         <span className="float-right">
  //           {/* <a onClick={this.openDeleteModal(post)} className="icon-wrapper"><IconTrash fill="#2DB5CF" /></a> */}
  //           {/* <a onClick={() => this.onPostRemove(post)} className="icon-wrapper"><IconTrash fill="#2DB5CF" /></a> */}
  //           <a onClick={() => this.renderDeleteModal(post)} className="icon-wrapper"><IconTrash fill="#2DB5CF" /></a>
  //         </span>
  //
  //         {/* <Modal
  //           isOpen={this.state.openDelete}
  //           contentLabel="Delete Modal"
  //           style={customStyles}
  //         >
  //           <a className="close-modal" onClick={this.closeDeleteModal}>X</a>
  //           <div className="confirm-text"><h3>{post ? `Opravdu vymazat poznamku ${post.title}?` : ''}</h3></div>
  //           <div className="confirm-buttons">
  //             <button className="confirm-button danger" onClick={() => this.onPostRemove(post)}>Ano</button>
  //             <button className="confirm-button bare" onClick={this.closeDeleteModal}>Ne</button>
  //           </div>
  //         </Modal> */}
  //       </li>
  //     );
  //   });
  // }

  // renderDeleteModal(post) {
  //   let modal = this.modalTarget;
  //       modal = document.createElement('div')
  //       modal.id = `${post._id}`
  //       modal.className = 'modal'
  //
  //   let modalContent = document.createElement('div')
  //       modalContent.className = 'modal-content'
  //
  //   let anchorTag = document.createElement('a')
  //       anchorTag.text = 'X'
  //       anchorTag.className = 'close-modal'
  //       anchorTag.addEventListener('click', () => this.closeDeleteModal(post._id))
  //
  //   let modalHeading = document.createElement('div')
  //       modalHeading.className = 'confirm-text'
  //
  //   let modalHeadingChild = document.createElement('h3')
  //   let modalHeadingChildText = document.createTextNode(`Opravdu vymazat poznamku "${post.title}"?`)
  //       modalHeading.appendChild(modalHeadingChildText)
  //
  //   let buttonsWrapper = document.createElement('div')
  //       buttonsWrapper.className = 'confirm-buttons'
  //   let buttonDelete = document.createElement('button')
  //       buttonDeleteText = document.createTextNode('ANO')
  //       buttonDelete.className = 'confirm-button danger'
  //       buttonDelete.addEventListener('click', () => this.onPostRemove(post))
  //       buttonDelete.appendChild(buttonDeleteText)
  //   let buttonCancel = document.createElement('button')
  //       buttonCancelText = document.createTextNode('NE')
  //       buttonCancel.className = 'confirm-button bare'
  //       buttonCancel.addEventListener('click', () => this.closeDeleteModal(post._id))
  //       buttonCancel.appendChild(buttonCancelText)
  //
  //       buttonsWrapper.appendChild(buttonDelete)
  //       buttonsWrapper.appendChild(buttonCancel)
  //
  //
  //   modalContent.appendChild(anchorTag)
  //   modalContent.appendChild(modalHeading)
  //   modalContent.appendChild(buttonsWrapper)
  //   modal.appendChild(modalContent)
  //
  //   document.body.appendChild(modal)
  // }

  render() {
    // let content = [];
    // if (User.isLoggedIn()) {
    //   content.push(
    //     <div key="b">
    //       <Header />
    //       <div className="row">
    //         <div className="column size_75 float-none centered">
    //           <ul className="list-of-posts">
    //             {this.renderList()}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   )
    // } else {
    //   content.push(
    //     <div className="row" key="b">
    //       <div className="column size_100">
    //         <Unauthorized />
    //       </div>
    //     </div>
    //   )
    // }

    return (
      <div>
        {/* {content} */}
        {/* {this.renderDeleteModal} */}
        <Header />
        posts list
      </div>
    );
  }
}
