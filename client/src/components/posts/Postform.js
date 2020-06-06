 import React, { useState } from "react";
import PropsTypes from "prop-types";
import { connect } from "react-redux"
import {addpost}from "../../action/post";

const Postform = ({addpost}) =>{
    const [formdata,setformdata]=useState({
      text:'',
      showAction:true
    });
     const {text,showAction} = formdata;
    return(<div>
         <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e=>{
            e.preventDefault();
            addpost(formdata);
            setformdata({...formdata,text:''});
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={(e)=>setformdata({...formdata,text:e.target.value})}
            required></textarea><p>
             <input type="checkbox" 
               
              onClick={()=>
              setformdata({...formdata,showAction:!showAction}
              )}/> Disable action</p>
              <button type="submit" className="btn btn-dark my-1"  >submit</button>
          
        </form>
      </div>
    </div>)
}

Postform.propsTypes = {
    addpost:PropsTypes.func.isRequired,
}

export default connect(null,{addpost})(Postform)
