import React, { Component } from "react";
import DropDown from "./components/dropDown";
import ClassThumbnail from "./components/classThumbnail";
import * as classes from "./classes.json";
import Filters from "./components/filters";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      classes: classes.classes,
      error: "",
      duration: [
        { id: "5-min", name: "5 Min" },
        { id: "10-min", name: "10 Min" },
        { id: "15-min", name: "15 Min" },
        { id: "30-min", name: "30 Min" },
        { id: "45-min", name: "45 Min" },
        { id: "60-min", name: "60 Min" },
        { id: "75-min", name: "75 Min" }
      ],
      search: null,
      filters: [],
      searchProducts: classes.classes,
      filtered: classes.classes,
      page: 1,
      perpage: 24
    };
    this.toggleSelected = this.toggleSelected.bind(this);
    this.search = this.search.bind(this);
    this.performFiltrationAndSearch = this.performFiltrationAndSearch.bind(
      this
    );
    this.loadMoreClicked = this.loadMoreClicked.bind(this);
    this.removeFromFilter = this.removeFromFilter.bind(this);
  }
  //this function gets called whenever ever user wants to remove any filter condition
  removeFromFilter(toRemove) {
    let filters = this.state.filters;
    filters.map((filter, i) => {
      if (filter.id == toRemove.id) {
        filters.splice(i, 1);
      }
    });
    this.setState({ filters }, this.performFiltrationAndSearch);
  }

  //this function gets called when ever user select anything in dropdowns
  toggleSelected(toFilter, filterItem, exist) {
    let filters = this.state.filters;
    filterItem.toFilter = toFilter;
    if (!exist) {
      filters = filters.concat(filterItem);
    } else {
      filters.map((filter, i) => {
        if (filter.id === filterItem.id) {
          filters.splice(i, 1);
        }
      });
    }
    this.setState({ filters }, this.performFiltrationAndSearch);
  }
  //i was unable to fetch data from the url you provided thats why this function is commented out
  // componentDidMount() {
  //   fetch("https://yogainternational.com/json/classes", { mode: "no-cors" })
  //     .then(res => res.json())
  //     .then(
  //       result => {
  //         console.log("Response" + result);
  //         this.setState({
  //           isLoaded: true,
  //           classes: result.items
  //         });
  //         console.log(result);
  //       },
  //       error => {
  //         console.log(error);
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     );
  // }

  // This function gets called whenever user search for anything
  search(search) {
    search = search.target.value.toLowerCase();
    this.setState({ search: search }, this.performFiltrationAndSearch);
  }
  // This function gets called when there is any change in search and filter and filtered the classes accordingly
  performFiltrationAndSearch() {
    let filters = this.state.filters;
    let search = this.state.search;
    let searchProducts = this.state.classes;
    let filtered = [];
    if (search) {
      searchProducts = searchProducts.filter(itm => {
        return itm.title.toLowerCase().indexOf(search) > -1;
      });
    }
    if (filters.length) {
      searchProducts.filter(function(itm) {
        filters.map(filter => {
          if (itm[filter.toFilter].includes(filter.id)) {
            filtered.push(itm);
          }
        });
      });
      this.setState({ page: 1, filtered: filtered });
    } else {
      this.setState({ page: 1, filtered: searchProducts });
    }
  }
  // this funtion gets called when the load more button is clicked and increment the page
  loadMoreClicked() {
    this.setState({ page: this.state.page + 1 });
  }
  render() {
    const overFlowHidden = {
      overflow: "hidden"
    };
    return (
      <div className="default-page-wrapper">
        <div className="container px-3">
          <h2 className="ygi-page-heading ygi-page-heading--dark">
            Online Yoga Classes
          </h2>
        </div>
        <div className="ygi-search">
          <div className="container px-3">
            <div className="ygi-search__wrapper">
              {/* Search Bar */}
              <div className="ygi-search-bar col col-12 col-lg-2">
                <input
                  type="search"
                  placeholder="Search"
                  className="ygi-search-bar__input"
                  onChange={this.search}
                />
              </div>
              {/* DropDown For Filters */}
              <div className="col col-sm-2">
                <DropDown
                  title="Duration"
                  toFilter="duration"
                  list={this.state.duration}
                  filters={this.state.filters}
                  toggleItem={this.toggleSelected}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Show User Their Selected Filters */}
        {this.state.filters.length ? (
          <Filters
            filters={this.state.filters}
            removeFromFilter={this.removeFromFilter}
          />
        ) : (
          ""
        )}

        <div className="ygi-divider__wrapper">
          <div className="container">
            <div className="ygi-divider" />
          </div>
        </div>
        <div className="ygi-profile-classes">
          <div className="container">
            <p className="ygi-profile-classes__heading mx-auto text-center">
              {this.state.filtered.length} Results
            </p>
            <div className="ygi-profile-classes__wrapper">
              {this.state.filtered
                .slice(0, this.state.page * this.state.perpage)
                .map((singleClass, i) => (
                  <div className="m-2 margin" style={overFlowHidden} key={i}>
                    <ClassThumbnail classData={singleClass} />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="ygi-profile-classes__button-wrapper">
          <button
            className="ygi-profile-classes__btn"
            onClick={this.loadMoreClicked}
          >
            Load More
          </button>
        </div>
      </div>
    );
  }
}

export default App;
