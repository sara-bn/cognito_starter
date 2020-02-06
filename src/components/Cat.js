import React from "react";
const API_INVOKE_URL =
  "https://8dlnsn46j9.execute-api.us-east-1.amazonaws.com/item";

class Cat extends React.Component {
  constructor() {
    super();
    this.state = { cats: [], loading: true };
    fetch(API_INVOKE_URL + "/cats")
      .then(response => response.json())
      .then(data => {
        this.setState({ cats: data, loading: false });
      });
  }

  renderStudentsTable(cats) {
    return (
      <table style={{ borderSpacing: "2em" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {this.state.cats.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                <img
                  src={cat.url}
                  style={{ height: "150px", width: "200px" }}
                  alt="cat"
                ></img>
              </td>
              <td>{cat.name}</td>
              <td>{cat.breed}</td>
              <td>{cat.age} Year</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderStudentsTable(this.state.cats)
    );
    return (
      <div>
        <h1>Cats</h1>
        {contents}
      </div>
    );
  }
}
export default Cat;
