import React, { Component } from "react";
// import { Segment, Input, Table, Header, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllMovies } from '../../../actions/movieActions';
import DateTimePicker from './DateTimePicker';
import MoviePicker from './MoviePicker';
import PreviewSubmitMonMovie from './PreviewSubmitMonMovie';

class CreateMonMovie extends Component {
    constructor(){
        super();
        this.state = {
            search: '',
            date: '',
            time: '',
            movieId: '',
            eventObject: {},
            previewPage: false 
        }
    }

    componentDidMount(){
        this.props.getAllMovies();
    }
    
    onSearch = (value) => {
        this.setState({ search: value})
    } 
    
    handleTimeChange = (e, { name, value }) => this.setState({ [name]: value });

    selectMovie = (id, movies) => {
        let movId;
        if(id){
            if (this.state.movieId === id) {
                movId = '';
                this.setState({movieId: movId, eventObject: {}});
            }else{
                movId = id;
                let objArray = movies.filter(obj => obj._id === movId)
                this.setState({movieId: movId, eventObject: objArray[0] || {}});
            } 
        }  
    }

    goToOrLeavePreviewPage = (bol) => {this.setState({previewPage: bol})}

    render(){
        console.log(this.state);
        
        let movies = this.props.movies || [];

        let movieList = (this.state.search.length <= 0) ? [] : movies.filter(
            (movie) => {
                return movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        ); 

        const createPage = (
        <React.Fragment>
            <MoviePicker 
                movieId={this.state.movieId} 
                onSearch={this.onSearch} 
                selectMovie={this.selectMovie} 
                movieList={movieList} 
                movies={movies}
                eventObject={this.state.eventObject} 
            />
            <DateTimePicker 
                eventObject={this.state.eventObject} 
                handleTimeChange={this.handleTimeChange} 
                movieId={this.state.movieId} 
                date={this.state.date} 
                time={this.state.time}
                goToOrLeavePreviewPage={this.goToOrLeavePreviewPage} 
            />
        </React.Fragment>
        );

        const previewSubmitPage = (
        <React.Fragment>
            <PreviewSubmitMonMovie 
                eventObject={this.state.eventObject} 
                movies={movies} 
                date={this.state.date} 
                time={this.state.time} 
                goToOrLeavePreviewPage={this.goToOrLeavePreviewPage}
            />
        </React.Fragment>
        )
       
        return (
        <React.Fragment>
            {this.state.previewPage ? previewSubmitPage : createPage }       
        </React.Fragment>
        );
    }
        
} 

const mapStateToProps = state => ({
    movies: state.movies.movies
});

export default connect(mapStateToProps, {getAllMovies})(CreateMonMovie);
