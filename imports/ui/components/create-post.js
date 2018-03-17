import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';


import { Posts } from '../../api/posts';

class CreatePost extends Component {
    handleSubmit(event) {
        event.preventDefault();

        console.log(this.refs.title.value);
        const title = this.refs.title.value;
        const description = this.refs.description.value;

        Meteor.call('posts.insert', {
            title,
            description
        });

        ReactDOM.findDOMNode(this.refs.title).value = '';
        ReactDOM.findDOMNode(this.refs.description).value = '';
    }

    render() {
        return(
            <div>
                <form name="postCreate"
                      onSubmit={ this.handleSubmit.bind(this) }>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                         <input type="text" 
                                className="form-control" 
                                id="title" 
                                placeholder="Title" 
                                required
                                ref="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" 
                                  className="form-control" 
                                  rows="3"
                                  ref="description">
                        </textarea>
                    </div>
                    <button type="submit" 
                            className="btn btn-default"
                            >Submit Post</button>
                </form>
            </div>
        );
    }
}

export default CreatePost;