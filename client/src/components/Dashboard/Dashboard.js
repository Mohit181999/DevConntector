import React,{Fragment ,useEffect} from "react";
import {Link} from "react-router-dom";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentProfile, deleteAcc} from "../../action/profile"
import Dashboardactions from "./Dahboaractions"
import Spinner from "../layout/spinner"
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = ( {getCurrentProfile,deleteAcc,
    auth: { user },
    profile: { profile ,loading}})=>{
      useEffect(() => {
        getCurrentProfile();
      }, [getCurrentProfile]);
    return( loading && profile ===null ?<Spinner />:(
        <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile === null ? (        
        <Fragment>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">           
          Create Profile     
          </Link>    
      </Fragment>
      ) : (         
      <Fragment>
      <Dashboardactions />
      <Experience experience={profile.experience} />
      <Education education={profile.education} />
      <div className="my-2">
        <button onClick={()=>deleteAcc()} className="btn btn-danger" >Delete My Account</button>
      </div>
   </Fragment>
      )}
    </Fragment>    
    )
    )
}

Dashboard.propsTypes ={
    getCurrentProfile:PropsTypes.func.isRequired,
    auth:PropsTypes.object.isRequired,
    deleteAcc:PropsTypes.func.isRequired,
    profile:PropsTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    auth:state.auth,
    profile:state.profile
});
export default connect(mapStateToProps,{getCurrentProfile,deleteAcc})(Dashboard);