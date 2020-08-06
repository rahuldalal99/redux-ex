import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/postActions";

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost); //will add newPost to beggining of list
    }
  }

  render() {
    const postItems = this.props.posts.map((post) => (
      <div key={post.id}>
        <h3> {post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>POSTS</h1>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object,
};

const mapStateToProps = (state) => ({
  posts: state.posts.items, // because root reducer export is 'posts'
  newPost: state.post.item,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
