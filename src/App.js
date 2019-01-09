import React from "react";
import pf from "petfinder-client";
import { render } from "react-dom";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
class App extends React.Component {
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
      .find({ output: "full", location: "Seattle, WA" })
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

  handleTitleClick() {
    alert("You clicked!");
  }
  // render() {
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
  // }
  render() {
    return (
      <div>
        <h1>"Adopt Me!"</h1>
        <div>
          {this.state.pets.map(pet => {
            let breed;

            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(". ");
            } else {
              breed = pet.breeds.breed;
            }
            return <Pet animal={pet.animal} name={pet.name} breed={breed} />;
          })}
        </div>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
