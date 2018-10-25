import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="ygi-search-filters">
        <div className="container px-3">
          <div className="ygi-search-filters__wrapper">
            <div className="ygi-search-filters__filters">
              <label className="ygi-search-filters__filters-label">
                Filters
              </label>
              <div className="row">
                {this.props.filters.map((filter, i) => (
                  <div className="col-xs-4 mt-2" key={i}>
                    <div
                      className="ygi-search-filters__filter"
                      onClick={() => this.props.removeFromFilter(filter)}
                    >
                      <label className="ygi-search-filters__filter-label">
                        {filter.name}
                      </label>
                      <FontAwesome
                        className="ygi-search-filters__filter-close"
                        name="times"
                        style={{ right: "10px", top: "12px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Filters;
