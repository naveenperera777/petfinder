import React from "react";
import { Link } from "@reach/router";

// const Pet = props => {
// return React.createElement("div", {}, [
//   React.createElement("h1", {}, props.name),
//   React.createElement("h2", {}, props.animal),
//   React.createElement("h1", {}, props.breed)
// ]);

//   return (
//     <div>
//       <h1>{props.key}</h1>
//       <h1>{props.name}</h1>
//       <h1>{props.animal}</h1>
//       <h3>{props.breed}</h3>
//     </div>
//   );
// };

class Pet extends React.Component {
  render() {
    const { name, animal, breed, media, location, id } = this.props;

    let photos = [];

    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={photos[0].value} alt="name" />
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {location}
          </h2>
        </div>
      </Link>
    );
  }
}
export default Pet;
