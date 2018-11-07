
// import React, { Component } from 'react'
// import { Menu, Segment, Image } from 'semantic-ui-react'


// const tempMenuStyle = {
//   backgroundColor: '#470877',
//   borderRadius: '0',
//   position: 'fixed',
//   width: '100%',
//   zIndex: '1',
//   top:'0',
//   boxShadow: '0 10px 15px #00000'
// }

// export default class Navbar extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <React.Fragment>
//         <Segment style={tempMenuStyle}>
//           <Menu inverted secondary>
//           <Menu.Item style={{padding:'0'}} onClick={()=>console.log('hello home')}>
//             <Image style={{width:'40px'}} src='krackebacken_temp_logo.png'/>
//             <h2 style={{fontWeight:'lighter', padding:'0', margin:'0 1rem'}}>Kråkebackens biograf</h2>
//           </Menu.Item>
//           <Menu.Menu position='right'>
//             <Menu.Item 
//               name='Billjetter' 
//               active={activeItem === 'Billjetter'} 
//               onClick={this.handleItemClick} 
//             />
//             <Menu.Item 
//               name='Profil' 
//               active={activeItem === 'Profil'} 
//               onClick={this.handleItemClick} 
//             />
//             <Menu.Item 
//               name='Filmer & Trailers' 
//               active={activeItem === 'Filmer & Trailers'} 
//               onClick={this.handleItemClick} 
//             />
//              <Menu.Item 
//               name='Om oss' 
//               active={activeItem === 'Om oss'} 
//               onClick={this.handleItemClick}
//               content='Om oss' 
//             />
//             <Menu.Item 
//               name='Kontakta oss' 
//               active={activeItem === 'Kontakta oss'} 
//               onClick={this.handleItemClick}
//               content='Kontakta oss' 
//             />
//             <Menu.Item
//               name='Admin'
//               active={activeItem === 'Admin'}
//               onClick={this.handleItemClick}
//             />
//             <Menu.Item/>
//             <Menu.Item
//               header
//               name='Logga ut'
//               active={activeItem === 'Logga ut'}
//               onClick={this.handleItemClick}
//               content='Logga ut'
//             />
//           </Menu.Menu>
//           </Menu>
//         </Segment>
//         <Segment></Segment>
//       </React.Fragment>
//     )
//   }
// }

// export default Navbar;

// import React, { Component } from "react";

// class Navbar extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
//           <div className="container">
//             <a className="navbar-brand" href="landing.html">
//               Kråkebackens biograf
//             </a>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }

// export default Navbar;

=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul>
        <li>
          <Link to="/mainpage">Biljetter</Link>
        </li>
        <li>
          <Link to="/mainpage">Profil</Link>
        </li>
        <li>
          <Link to="/mainpage">Filmer och trailers</Link>
        </li>
        <li>
          <Link to="/mainpage">Om oss</Link>
        </li>
        <li>
          <Link to="/mainpage">Kontakta oss</Link>
        </li>
        <li>
          <a href="#" onClick={this.onLogoutClick.bind(this)}>
            Logout
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul>
        <li>
          <Link to="/login">Logga in</Link>
        </li>
        <li>
          <Link to="/register">Bli medlem</Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Kråkebackens biograf
            </Link>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
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
  { logoutUser, clearCurrentProfile }
)(Navbar);

