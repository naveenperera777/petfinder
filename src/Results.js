import React from "react";
import pf from "petfinder-client";
import { render } from "react-dom";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }

  componentDidMount() {
    // const promise = petfinder.breed.list({ animal: "dog" });
    // promise.then(console.log, console.error);

    petfinder.pet
      .find({ output: "full", location: "New York, NY" })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets: pets
        });
      });
  }

  //   render() {
  //   // return React.createElement("div", {}, [
  //   //   React.createElement("h1", { onClick: this.handleTitleClick }, "Adopt Me"),
  //   //   React.createElement(Pet, {
  //   //     name: "Jake",
  //   //     animal: "Dog",
  //   //     breed: "GSD"
  //   //     // onClick: this.handleTitleClick
  //   //   }),
  //   //   React.createElement(Pet, {
  //   //     name: "Pepper",
  //   //     animal: "Bird",
  //   //     breed: "Cockatiel"
  //   //   }),
  //   //   React.createElement(Pet, {
  //   //     name: "Doink",
  //   //     animal: "Cat",
  //   //     breed: "Mixed"
  //   //   })
  //   // ]);
  //   }
  render() {
    return (
      <div className="search">
        {this.state.pets.map(pet => {
          let breed;

          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(". ");
          } else {
            breed = pet.breeds.breed;
          }

          const x = "My dog is" % { breed };

          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
