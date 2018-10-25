import React, { Component } from "react";
import FontAwesome from "react-fontawesome";

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      options: {}
    };
  }
  //this function handle any clicks outside the dropdown box
  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }
  // along with opening and closing the list this function check for latest changes in filters from its parent class App
  toggleList() {
    let options = this.state.options;
    if (Object.keys(options).length) {
      this.props.filters.map(f => {
        if (options[f.id] === true && f.toFilter === this.props.toFilter) {
          options[f.id] = true;
        } else if (
          options[f.id] === false &&
          f.toFilter === this.props.toFilter
        ) {
          options[f.id] = false;
        }
      });
      this.setState(prevState => ({
        listOpen: !prevState.listOpen,
        options
      }));
    } else {
      this.setState(prevState => ({
        listOpen: !prevState.listOpen
      }));
    }
  }
  // this finction get's called whenever user click on any item in list and change its status accordingly
  itemClicked(toFilter, item) {
    let options = this.state.options;
    if (options && options[item.id]) {
      this.props.toggleItem(toFilter, item, true);
      options[item.id] = false;
    } else {
      this.props.toggleItem(toFilter, item, false);
      options[item.id] = true;
    }
    this.setState({ options });
    this.toggleList();
  }
  //this function chk if itm is already selected or not and change its class accordingly
  chkClass(item) {
    let className = "dropdown-item ygi-dropdown__option";
    return this.state.options && this.state.options[item.id]
      ? className + " ygi-dropdown__option--selected"
      : className;
  }
  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    let listClasses = "dropdown-menu ygi-dropdown__menu";
    listClasses = this.state.listOpen ? listClasses + " show" : listClasses;
    return (
      <div className="ygi-dropdown__wrapper yi-teacher-dropdown nopadding d-block yi-dropdown--beneath-modal">
        <div onClick={() => this.toggleList()}>
          <button className="btn dropdown-toggle ygi-dropdown__placeholder">
            {headerTitle}
          </button>
          {listOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {listOpen && (
          <ul className={listClasses}>
            {list.map(item => (
              <li
                className={this.chkClass(item)}
                key={item.id}
                onClick={() => this.itemClicked(this.props.toFilter, item)}
                style={{
                  padding: "10px 9px"
                }}
              >
                {item.name}
                {this.state.options[item.id] && <FontAwesome name="check" />}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default DropDown;
