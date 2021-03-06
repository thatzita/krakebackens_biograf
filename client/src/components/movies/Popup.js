import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  moviePopupClose,
  updateDb,
  deleteMovie,
  getAllMovies,
} from '../../actions/movieActions';
import {
  Card,
  Button,
  Divider,
  Image,
  Icon,
  Confirm,
  Form,
  Checkbox,
} from 'semantic-ui-react';
import './movies.css';

class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showOrHide: false,
      movieInfo: {},
      title: '',
      description: '',
      crowRating: '',
      show: false,
      movie: {},
      dvdOrBluRay: '',
    };
    this.editValues = this.editValues.bind(this);
  }

  handleChange = (e, { value }) => this.setState({ dvdOrBluRay: value });

  closePopup() {
    this.props.moviePopupClose();
  }

  deleteMovie(movie) {
    this.props.deleteMovie(movie);
    this.props.moviePopupClose();
  }

  updateMovieDb() {
    let { movieInfo } = this.state;
    let { title, description, crowRating, dvdOrBluRay } = this.state;
    let movieDb;

    if (movieInfo.crowRating === null) {
      this.setState({
        crowRating: 'Kråkan har inte tyckt till, än...',
      });
    }
    if (movieInfo.dvdOrBluRay === undefined) {
      this.setState({
        dvdOrBluRay: 'bluRay',
      });
    }

    if (title === '' && description === '' && crowRating === '') {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title !== '' && description !== '' && crowRating !== '') {
      movieDb = {
        title: title,
        description: description,
        crowRating: crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title !== '' && description === '' && crowRating === '') {
      movieDb = {
        title: title,
        description: movieInfo.description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title === '' && description !== '' && crowRating === '') {
      movieDb = {
        title: movieInfo.title,
        description: description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title === '' && description === '' && crowRating !== '') {
      movieDb = {
        title: movieInfo.title,
        description: movieInfo.description,
        crowRating: crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title !== '' && description !== '' && crowRating === '') {
      movieDb = {
        title: title,
        description: description,
        crowRating: movieInfo.crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title === '' && description !== '' && crowRating !== '') {
      movieDb = {
        title: movieInfo.title,
        description: description,
        crowRating: crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    } else if (title !== '' && description === '' && crowRating !== '') {
      movieDb = {
        title: title,
        description: movieInfo.description,
        crowRating: crowRating,
        id: movieInfo._id,
        dvdOrBluRay: dvdOrBluRay,
      };
    }

    this.props.updateDb(movieDb);
    this.setState({
      title: '',
      description: '',
      crowRating: '',
      // dvdOrBluRay: ""
    });
    this.closePopup();
    this.props.getAllMovies();
  }

  changeInput(event) {
    let nameOfClass = event.target.className;
    this.editValues(nameOfClass, event.target.textContent);
  }

  editValues(nameOfClass, data) {
    switch (nameOfClass) {
      case 'titlePopup':
        this.setState({
          title: data,
        });
        break;
      case 'description':
        this.setState({
          description: data,
        });
        break;
      case 'crowRating':
        this.setState({
          crowRating: data,
        });

        break;
      default:
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      movieInfo: nextProps.movies.movieInfo,
      showOrHide: nextProps.movies.showOrHide,
    });
    if (nextProps.movies.movieInfo) {
      this.setState({
        dvdOrBluRay: nextProps.movies.movieInfo.dvdOrBluRay,
      });
    }
  }

  show = (movie) => {
    this.setState({ open: true, movie: movie });
  };
  handleConfirm = () => {
    this.deleteMovie(this.state.movie);

    this.setState({ open: false });
    this.props.moviePopupClose();
  };

  handleCancel = () => this.setState({ open: false });

  render() {
    let { showOrHide, movieInfo, open } = this.state;
    let moviePopup;

    if (showOrHide) {
      moviePopup = (
        <div className='popup'>
          <Card className='containerInPopup'>
            <div className='imgPosition'>
              <Image
                className='imageBorder'
                size='large'
                src={movieInfo.background}
                alt='Bild saknas'
                onError={(e) => {
                  e.target.src = 'curtain.jpg';
                }}
              />
              <Image
                size='small'
                className='imageBorder'
                src={movieInfo.poster}
                alt='Bild saknas'
                onError={(e) => {
                  e.target.src = 'poster_not_available.jpg';
                }}
              />
            </div>
            <br />
            <div className='descriptionContainer'>
              <h1
                className='titlePopup'
                contentEditable={this.props.auth.user.admin ? true : false}
                suppressContentEditableWarning='true'
                onInput={(event) => this.changeInput(event)}
              >
                {movieInfo.title}
              </h1>
              <hr />

              <p>
                <strong>Genres:</strong> <br />
                {movieInfo.genres.map((genre, i) => {
                  return (
                    <span key={i} className='date'>
                      {genre}{' '}
                    </span>
                  );
                })}
              </p>
              <Icon name='time' />
              <span className='date boldSpan'>{movieInfo.runtime} min</span>
              <br />
              <br />
              <span className='date boldSpan'>Betyg: {movieInfo.rating} </span>
              <br />
              <br />
              <span className='date boldSpan'>
                Kråkan tycker till:
                <p
                  className='crowRating'
                  contentEditable={this.props.auth.user.admin ? true : false}
                  suppressContentEditableWarning='true'
                  onInput={(event) => this.changeInput(event)}
                >
                  {movieInfo.crowRating
                    ? movieInfo.crowRating
                    : 'Kråkan har inte tyckt till, än...'}
                </p>
              </span>
              <br />
              {this.props.auth.user.admin ? (
                <Form>
                  <Form.Field>
                    <Checkbox
                      radio
                      label='Blu-ray'
                      name='checkboxRadioGroup'
                      value='bluRay'
                      checked={this.state.dvdOrBluRay === 'bluRay'}
                      onChange={this.handleChange}
                    />
                    <Checkbox
                      style={{ marginLeft: '1rem' }}
                      radio
                      label='3D'
                      name='checkboxRadioGroup'
                      value='3D'
                      checked={this.state.dvdOrBluRay === '3D'}
                      onChange={this.handleChange}
                    />
                    <Checkbox
                      style={{ marginLeft: '1rem' }}
                      radio
                      label='DVD'
                      name='checkboxRadioGroup'
                      value='dvd'
                      checked={this.state.dvdOrBluRay === 'dvd'}
                      onChange={this.handleChange}
                    />

                    <Checkbox
                      style={{ marginLeft: '1rem' }}
                      radio
                      label='USB'
                      name='checkboxRadioGroup'
                      value='usb'
                      checked={this.state.dvdOrBluRay === 'usb'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
              ) : (
                ''
              )}
              <br />
              <span className='date boldSpan'>Beskrivning:</span>
              <p
                className='description'
                contentEditable={this.props.auth.user.admin ? true : false}
                suppressContentEditableWarning='true'
                onInput={(event) => this.changeInput(event)}
              >
                {movieInfo.description}
              </p>
              <Divider />
              {this.props.auth.user.admin ? (
                <Button.Group
                  fluid
                  style={{ marginTop: '-2rem' }}
                  className='btnGroupPopup'
                >
                  <Button
                    attached='bottom'
                    className='deleteButtonPopup'
                    onClick={(e) => this.show(movieInfo)}
                  >
                    Ta bort från databasen
                  </Button>
                  <Confirm
                    open={open}
                    className='confirmDeleteMovie'
                    header='Du är på väg att ta bort en film'
                    content='Är du säker att du vill ta bort filmen?'
                    cancelButton='Gå tillbaka'
                    confirmButton='Ta bort'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                  />
                  <Button
                    className='UpdateButton'
                    color='green'
                    attached='bottom'
                    onClick={(e) => this.updateMovieDb(movieInfo)}
                  >
                    Uppdatera databasen
                  </Button>

                  <Button
                    attached='bottom'
                    className='closeButton'
                    onClick={(e) => this.closePopup()}
                  >
                    <Icon name='left chevron' />
                    Stäng
                  </Button>
                </Button.Group>
              ) : (
                <Button
                  fluid
                  style={{ marginTop: '-0.5rem', marginLeft: '0rem' }}
                  attached='bottom'
                  // className="closeButton"
                  onClick={(e) => this.closePopup()}
                >
                  <Icon name='left chevron' />
                  Stäng
                </Button>
              )}
            </div>
          </Card>
        </div>
      );
    } else {
      moviePopup = '';
    }
    return <div>{moviePopup}</div>;
  }
}

Popup.propTypes = {
  moviePopupClose: PropTypes.func.isRequired,
  updateDb: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  movies: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movieInfo: state.movieInfo,
  movies: state.movies,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  //func goes here
  moviePopupClose,
  deleteMovie,
  updateDb,
  getAllMovies,
})(Popup);
