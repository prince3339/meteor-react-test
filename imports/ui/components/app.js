import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts';
import { ReactiveVar } from 'meteor/reactive-var'; 

import Post from './post';
import Header from './header';
import CreatePost from './create-post';

const sortBy = new ReactiveVar('createdAt');
const perPage = new ReactiveVar(5);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { reset: false };
    }

    //lifeCycle method of react
    componentWillMount() {
        this.page = 5;
        this.reset = false;
    }

    sortPost() {
        if(!this.state.reset) {
            sortBy.set('score');
            this.setState({ reset: true });
        }else {
            sortBy.set('createdAt');
            this.setState({ reset: false });
        }
    }

    loadMore() {
        perPage.set(perPage.get() + this.page);
    }

    renderPosts() {
        return this.props.posts.map((postItem) => (
            <Post key={postItem._id} post={postItem} />
        ));
    }

    render() {
        return(
            <div>
                <Header />
                { this.props.userInfo && this.props.userInfo._id && 
                    <CreatePost />
                }

                <button type="button" 
                        className="btn btn-small btn-primary btn-default margin-top-32"
                        onClick={ this.sortPost.bind(this) }>
                        { !this.state.reset &&
                            <span>
                                Most Voted
                            </span>
                        }
                        { this.state.reset &&
                            <span>
                                Reset
                            </span>
                        }
                </button>

                { this.renderPosts() }

                { this.props.totalCount > this.props.posts.length &&
                    <div className="text-center margin-bottom-16">
                        <button type="button"
                                className="btn btn-small btn-primary btn-default margin-top-32"
                                onClick={ this.loadMore.bind(this) }>
                                Load More...
                        </button>
                    </div>
                }
            </div>
        )
    }
}

export default withTracker((props) => {
    
    let handler = Meteor.subscribe('posts', perPage.get(), sortBy.get());
    Meteor.subscribe('userInfo');
    //handler.stop();
    const sortedBy = {};
    sortedBy[sortBy.get()] = -1;
    return {
        posts: Posts.find({}, {sort: sortedBy, limit: perPage.get()}).fetch(),
        totalCount: Posts.find({}).count(),
        userInfo: Meteor.user()
    }
})(App);