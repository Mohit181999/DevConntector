import React, { useState } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux"
import {addpost}from "../../action/post";

const Postform = ({addpost}) =>{
    const [text,settext]=useState();
    return(<div>
         <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addpost({text});
            settext('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e)=>settext(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </div>)
}

Postform.propsTypes = {
    addpost:PropsTypes.func.isRequired
}

export default connect(null,{addpost})(Postform)