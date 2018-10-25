import React, { Component } from "react";

class ClassThumbnail extends Component {
  render() {
    let classData = this.props.classData;
    return (
      <div className="yi-card-small-centered-hover-wrapper yi-card-small">
        <div className="yi-card-small__image">
          <img src={classData.thumb} alt={classData.title} />
        </div>
        <div className="yi-card-small__content">
          <h4 className="yi-card-small__title yi-card-small__title--two-line">
            {classData.title}
          </h4>
          <div className="yi-card-small__author">
            {classData.teacher.map(teacherName => teacherName)}
          </div>
          <div className="yi-card-small__lower-left">
            {classData.level.map((level, i) => (
              <span className="yi-card-small__level" key={i}>
                {level}
              </span>
            ))}
          </div>
          <div className="yi-card-small__lower-right">
            {classData.duration.map((duration, i) => (
              <span className="yi-card-small__duration" key={i}>
                {duration}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default ClassThumbnail;
