import React, { Component } from 'react'
import { Menu, Segment, Image } from 'semantic-ui-react'


const tempMenuStyle = {
  backgroundColor: '#470877',
  borderRadius: '0',
  position: 'fixed',
  width: '100%',
  zIndex: '1',
  top:'0',
  boxShadow: '0 10px 15px #00000'
}

export default class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <React.Fragment>
        <Segment style={tempMenuStyle}>
          <Menu inverted secondary>
          <Menu.Item style={{padding:'0'}} onClick={()=>console.log('hello home')}>
            <Image style={{width:'40px'}} src='krackebacken_temp_logo.png'/>
            <h2 style={{fontWeight:'lighter', padding:'0', margin:'0 1rem'}}>Kråkebackens biograf</h2>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item 
              name='Billjetter' 
              active={activeItem === 'Billjetter'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item 
              name='Profil' 
              active={activeItem === 'Profil'} 
              onClick={this.handleItemClick} 
            />
            <Menu.Item 
              name='Filmer & Trailers' 
              active={activeItem === 'Filmer & Trailers'} 
              onClick={this.handleItemClick} 
            />
             <Menu.Item 
              name='Om oss' 
              active={activeItem === 'Om oss'} 
              onClick={this.handleItemClick}
              content='Om oss' 
            />
            <Menu.Item 
              name='Kontakta oss' 
              active={activeItem === 'Kontakta oss'} 
              onClick={this.handleItemClick}
              content='Kontakta oss' 
            />
            <Menu.Item
              name='Admin'
              active={activeItem === 'Admin'}
              onClick={this.handleItemClick}
            />
            <Menu.Item/>
            <Menu.Item
              header
              name='Logga ut'
              active={activeItem === 'Logga ut'}
              onClick={this.handleItemClick}
              content='Logga ut'
            />
          </Menu.Menu>
          </Menu>
        </Segment>
        <Segment></Segment>
      </React.Fragment>
    )
  }
}

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

