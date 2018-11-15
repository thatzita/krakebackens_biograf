import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getAllMonMovies } from '../../../actions/monMovieActions';


import { Button, Item, Segment, Header, Icon } from 'semantic-ui-react';



class MonMovieList extends Component {
    
componentWillMount(){
        this.props.getAllMonMovies();
        console.log(this.props);
}

  render() {
    return (
        <Segment>
        <Header as='h2' dividing>
            <Icon name='film' />
            <Header.Content>
            Välj en film
            </Header.Content>
        </Header>

        <Item.Group relaxed>

            <Item>

            <Item.Content verticalAlign='middle'>
                <Item.Header>Content A</Item.Header>
                <Item.Description>paragraph</Item.Description>
                <Item.Extra>
                <Button floated='right'>Action</Button>
                </Item.Extra>
            </Item.Content>
            </Item>

        </Item.Group>
    </Segment>    
    )
  }
}



// class MonMovieList extends Component {


//     // componentWillReceiveProps(nextProps){
//     //     console.log(nextProps)
//     // }
//     render(){
        
//         return (
//         <Segment>
//             <Header as='h2' dividing>
//                 <Icon name='film' />
//                 <Header.Content>
//                 Välj en film
//                 </Header.Content>
//             </Header>

//             <Item.Group relaxed>

//                 <Item>

//                 <Item.Content verticalAlign='middle'>
//                     <Item.Header>Content A</Item.Header>
//                     <Item.Description>paragraph</Item.Description>
//                     <Item.Extra>
//                     <Button floated='right'>Action</Button>
//                     </Item.Extra>
//                 </Item.Content>
//                 </Item>

//             </Item.Group>
//         </Segment>    
//         )
//     }
// }

const mapStateToProps = state => ({
    monMovies: state.monMovies   
});


export default connect(mapStateToProps, {getAllMonMovies})(MonMovieList);
