import React from 'react';
import { getPosts } from '../actions/posts';
import PostList from './PostsList';

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    //console.log(store.dispatch);
    store.dispatch(getPosts());
  }
  render() {
    const { store } = this.props;
    store.subscribe(() => {
      this.forceUpdate();
    });

    const { posts } = this.props.store.getState();

    return (
      <div className="App">
        <header className="App-header"></header>
        <PostList posts={posts.state} />
      </div>
    );
  }
}

export default App;
