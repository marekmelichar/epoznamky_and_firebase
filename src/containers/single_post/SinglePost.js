import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPost, deletePost } from "../../actions";

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  // onDeleteClick() {
  //   const { id } = this.props.match.params;
  //
  //   this.props.deletePost(id, () => {
  //     this.props.history.push("/");
  //   });
  // }

  render() {
    const { post } = this.props;

    console.log(post);

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <h3>{post.title.rendered}</h3>
        <p>{post.content.plaintext}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
