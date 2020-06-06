 import React from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {addlikes,dellikes,delpost} from "../../action/post";

const PostItem = ({addlikes,dellikes,delpost,auth,post:{_id,user,text,name,avatar,likes,comments,date,showAction}}) => {
    return (
        <div>
           <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
               {text}
            </p>
             <p className="post-date">Posted on
                <Moment format="YYYY/MM/DD" >{date}</Moment>
                
            </p>
            {showAction && (<div><button onClick={(e)=>addlikes(_id)} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              {likes.length  >0 && (<span>{likes.length}</span>)}
            </button>
            <button type="button" className="btn btn-light" onClick={(e)=>dellikes(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion {comments.length>0 && (<span className='comment-count'>{comments.length}</span>)} 
            </Link>
               
                {!auth.loading && user ===auth.user._id &&
                <button type="button" 
                onClick={()=>delpost(_id)} 
                className="btn btn-danger">
                <i className="fas fa-times"></i>
          </button>}
          
        
          </div>)}     
            
          </div>
          </div>
        </div>
    )
}

PostItem.propsTypes = {
    post:PropsTypes.object.isRequired,
    auth:PropsTypes.object.isRequired,
    addlikes:PropsTypes.func.isRequired,
    dellikes:PropsTypes.func.isRequired,
    delpost:PropsTypes.func.isRequired
}

const mapStateToProps = state =>({
    auth:state.auth,
})

export default connect(mapStateToProps,{addlikes,dellikes,delpost})(PostItem);
