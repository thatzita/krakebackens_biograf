import React, { Component } from "react";
import { Segment, Input, Table, Header, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllMovies } from '../../../actions/movieActions';
import DateTimePicker from './DateTimePicker';

class CreateMonMovie extends Component {
    constructor(){
        super();
        this.state = {
            search: ''
        }
    }

    componentDidMount(){
        this.props.getAllMovies();
    }
    
    onSearch = (value) => {
        this.setState({ search: value})
    } 
    
    render(){
      
        let movies = this.props.movies || [];
        
        let movieList = movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        ); 
       
        return (<React.Fragment>
        <Segment>
            <Header as='h2' dividing>
                <Icon name='film' />
                <Header.Content>
                Välj en film
                </Header.Content>
            </Header>
            
            <Input fluid size='big' icon='search' placeholder='Sök och välj film...' onChange={(e)=> this.onSearch(e.target.value)}/>
            <Segment style={{overflow: 'auto', height:'70vh', maxHeight:'70vh', border: '0', boxShadow:'none', padding:'0'}}>
            <Table selectable basic>
                <Table.Body>
                    {movieList.map(item => (
                    <Table.Row key={item._id}>
                    <Table.Cell>
                        <Image size='tiny' src={item.poster} />
                    </Table.Cell>
                    <Table.Cell>
                        <Header>
                            <Header.Content>
                                {item.title} ( {(item.release).substring(0,4)} ) {item.id}
                                <p style={{fontSize:'0.9rem'}}>
                                    <Icon name='clock outline' color='grey'/> 
                                    <em>{Math.floor(item.runtime / 60)}h {item.runtime % 60}min</em>
                                </p>
                                <Header.Subheader style={{maxWidth:'50%', minWidth: '280px'}}>{item.description}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    </Table.Row>)
                    )}
                </Table.Body>
            </Table>
            </Segment>
        </Segment>
        <DateTimePicker/>
        </React.Fragment>
        );
    }
        
} 

const mapStateToProps = state => ({
    movies: state.movies.movies
});

export default connect(mapStateToProps, {getAllMovies})(CreateMonMovie);
