import React from 'react';
import ListView from './ListView.jsx'
import Search from './Search.jsx';
import ListingForm from './ListingForm';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';


const popover = (
  <Popover id="popover-basic">
      Must be logged in to create a listing!
  </Popover>
)
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      showSearch: false,
      city: '',
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch() {
    const currentState = this.state.showSearch;
    this.setState({
      showSearch: !currentState,
    })
  }

  toggleForm() {
    const currentState = this.state.showForm;
    this.setState({
      showForm: !currentState,
    });
  }

  render() {
    const { listings, artists, isLoggedIn, handleNewListing, changeProfile } = this.props;
    const { showForm, showSearch } = this.state;
    return (
      <div className="jumbotron">
        <div className='row justify-content-center'>
          <img  src='https://i.imgur.com/VvaYR3a.png'/>
        </div>
        <div className="row">
          <div className="col-md-12" style={{marginBottom: "20px"}}>
            {!showSearch && <button className="btn btn-dark btn-lg btn-block" type="button" onClick={this.toggleSearch}>Search Settings</button>}
            {showSearch && <Search toggleSearch={this.toggleSearch} setFilters={this.props.setFilters}/>}
            {!isLoggedIn && (
              <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                <button className="btn btn-dark btn-lg btn-block" type="button">Create a Listing</button>
              </OverlayTrigger>
            )}
            {isLoggedIn && 
              ((!showForm && <button className="btn btn-dark btn-lg btn-block" type="button" onClick={this.toggleForm}>Create a Listing</button>)
              ||
              (showForm && <ListingForm handleNewListing={handleNewListing} toggleForm={this.toggleForm} />))
            }
          </div>
        </div>
        <div className="row">
          <ListView changeProfile={changeProfile} isLoggedIn={isLoggedIn} listings={listings} artists={artists}/>
        </div>
      </div>
    )
  }
}


export default Home;
