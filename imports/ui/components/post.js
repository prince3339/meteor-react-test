import React, { Component } from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../../api/posts';

class Post extends Component {
    
    doUpvote(event) {
        event.preventDefault();
        Meteor.call('posts.upVoted', this.props.post._id, ++this.props.post.score);
    }

    render() {
        const {_id, title, author, description, score, createdAt} = this.props.post;

        return(
            <div className="media border-bottom">
                <div className="media-left">
                    <a href="#">
                        <img className="media-object" 
                             src="http://via.placeholder.com/40x40"
                             alt="Profile Pic" />
                    </a>
                </div>
    
                <div className="media-body">
                    <div className="clearfix">
                        <a className="">
                            { author }
                        </a>
                        <span className="pull-right">
                            { moment(createdAt).fromNow() }
                        </span>
                    </div>
                    <h4 className="media-heading">{title}</h4>
                    <p> { description } </p>
                    
                    <div className="clearfix">
                        <button type="button" 
                                className="btn btn-small btn-default border-none"
                                onClick={this.doUpvote.bind(this)}>
                                <i className="fa fa-angle-up font-size-fixed-24" 
                                aria-hidden="true"></i> 
                            <span className="margin-left-5"></span>
                        </button>
    
                        <span className="margin-left-5 margin-bottom-5 display-inline-block pull-right">
                            Score: { score }
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


export default Post;