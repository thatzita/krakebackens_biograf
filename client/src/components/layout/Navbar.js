
import React, { Component } from 'react';
import { Menu, Segment, Image } from 'semantic-ui-react';

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

const tempMenuStyle = {
  backgroundColor: '#470877',
  borderRadius: '0',
  position: 'fixed',
  width: '100%',
  zIndex: '1',
  top:'0',
  boxShadow: '0 10px 15px #00000'
}

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  onLogoutClick = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  
  render() {
    const { activeItem } = this.state
    const { isAuthenticated, user } = this.props.auth;

    return (
      <React.Fragment>
        <Segment style={tempMenuStyle}>
          <Menu inverted secondary>

            <Menu.Item style={{padding:'0'}} as={Link} to={isAuthenticated ? '/mainpage' : '/'}>
              <Image style={{width:'40px'}} src='krakebackens_logo.png'/>
              <h2 style={{fontWeight:'lighter', padding:'0', margin:'0 1rem'}}>Kråkebackens biograf</h2>
            </Menu.Item>

            <Menu.Menu position='right'>
              { isAuthenticated ? (
                <Menu.Item 
                  as={Link}
                  to="/mainpage"
                  name='Billjetter' 
                  active={activeItem === 'Billjetter'} 
                  onClick={this.handleItemClick} 
                />) : null}

              {isAuthenticated ? (
                <Menu.Item
                  as={Link}
                  to="/profile" 
                  name='Profil' 
                  active={activeItem === 'Profil'} 
                  onClick={this.handleItemClick} 
                />) : null}

              {isAuthenticated ? (
                <Menu.Item 
                  as={Link}
                  to="/mainpage"
                  name='Filmer & Trailers' 
                  active={activeItem === 'Filmer & Trailers'} 
                  onClick={this.handleItemClick} 
                />) : null}

              {isAuthenticated ? (
                <Menu.Item
                  as={Link}
                  to="/" 
                  name='Om oss' 
                  active={activeItem === 'Om oss'} 
                  onClick={this.handleItemClick}
                  content='Om oss' 
                />): null}

              {isAuthenticated ?(
                <Menu.Item
                  as={Link}
                  to="/mainpage" 
                  name='Kontakta oss' 
                  active={activeItem === 'Kontakta oss'} 
                  onClick={this.handleItemClick}
                  content='Kontakta oss' 
                />): null}

              {isAuthenticated ? (
                <Menu.Item
                  as={Link}
                  to="/mainpage"
                  name='Admin'
                  active={activeItem === 'Admin'}
                  onClick={this.handleItemClick}
                />) : (
                <Menu.Item
                  as={Link}
                  to="/register"
                  name='register'
                  active={activeItem === 'register'}
                  onClick={this.handleItemClick}
                />  
                )}

              <Menu.Item/>

              <Menu.Item
                  as={Link}
                  to="/createMonMovie"
                  name='Monthly movies form'
                  active={activeItem === 'Monthly movies form'}
                  onClick={this.handleItemClick}
                />

              {isAuthenticated ? (
                <Menu.Item
                  as={Link}
                  to='/'
                  header
                  name='Logga ut'
                  active={activeItem === 'Logga ut'}
                  onClick={event => this.onLogoutClick(event)}
                  content='Logga ut'
                >
                </Menu.Item>
              ) : (
                <Menu.Item
                  as={Link}
                  to='/login'
                  header
                  name='Logga in'
                  active={activeItem === 'Logga in'}
                  onClick={this.handleItemClick}
                  content='Logga in'
                >
                </Menu.Item>
              )
            }

            </Menu.Menu>
          </Menu>
        </Segment>
        <Segment style={{height: '50px'}}></Segment>
      </React.Fragment>
    )
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile
  }
)(Navbar);

