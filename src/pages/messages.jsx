import React, { Component } from 'react';
import "../styles/messages.sass"
import { TextField, Fab } from '@material-ui/core';
import { Send } from '@material-ui/icons';

class Messages extends Component {
    render() {
        return (
            <div className="Messages">
                <div className="message">
                    <span>FROM: Lorem, ipsum dolor.</span>
                    no messages
                    <span>DATE: </span>
                </div>
                <form action="">
                    <TextField
                        id="messagee"
                        variant="outlined"
                        label="officer"
                        className="messageInput"
                    />
                    <TextField
                        multiline
                        id="message"
                        variant="outlined"
                        placeholder="message"
                        className="messageInput"
                    />
                    <Fab className="messageBtn"><Send/></Fab>
                </form>
            </div>
        )
    }
}

export default Messages