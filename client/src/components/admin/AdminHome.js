import React, { Component } from 'react';
import Admin from './Admin';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import AdminMonMovie from './AdminMonMovie';
import { Link } from 'react-router-dom';

import { getCurrentProfile } from '../../actions/profileActions';
import './admin.css';

class AdminHome extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      profile: nextProps.profile.profile,
    });
  }

  render() {
    let adminName;
    if (this.state.profile) {
      const { profile } = this.props.profile;
      adminName = profile.username;
    }

    return (
      <div className='adminhome'>
        <div className='containerAdminHome'>
          <h1 className='title'>
            <Icon name='home' />
            {adminName ? `Välkommen ${adminName}` : ''}
          </h1>
          <hr />
          <Segment
            style={{
              paddingTop: '3rem',
              height: '45rem',
              boxShadow: '5px 5px 5px -6px rgba(0,0,0,0.75)',
            }}
          >
            <AdminMonMovie />
          </Segment>
          <Segment style={{ boxShadow: '5px 5px 5px -6px rgba(0,0,0,0.75)' }}>
            <Link to='/movies'>
              <div className='purpleBox'>
                <Icon className='iconPos' size='large' name='film' />
                <p>Filmer</p>
              </div>
            </Link>
            <Link to='/users'>
              <div className='purpleBox'>
                <Icon className='iconPos' size='large' name='users' />
                <p>Medlemmar</p>
              </div>
            </Link>
            <Link to='/bookings'>
              <div className='purpleBox'>
                <Icon className='iconPos' size='large' name='ticket' />
                <p>Bokningar</p>
              </div>
            </Link>
            <Link to='/statistic'>
              <div className='purpleBox'>
                <Icon className='iconPos' size='large' name='chart bar' />
                <p>Statistik</p>
              </div>
            </Link>
            <Link to='/moviearchive'>
              <div className='purpleBox'>
                <Icon className='iconPos' size='large' name='archive' />
                <p>Arkivet</p>
              </div>
            </Link>
          </Segment>
        </div>
        <Admin />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  //func goes here
  getCurrentProfile,
})(AdminHome);
