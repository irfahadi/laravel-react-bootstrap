import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Http from "../Http";

class Nilai extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      apiMore: "",
      searchString: "",

      moreLoaded: false,
      error: false
    };

    // API Endpoint
    this.api = "/api/v1/todo";
  }

  handleChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  componentDidMount() {
    Http.get(`${this.api}`)
      .then(response => {
        const { data } = response.data;
        // const apiMore = response.data.links.next;
        this.setState({
          data,
          // apiMore,
          loading: false,
          error: false
        });
      })
      .catch(() => {
        this.setState({
          error: "Unable to fetch data."
        });
      });
  }

  render() {
    const { error } = this.state;
    const todos = Array.from(this.state.data);
    let _data = Array.from(this.state.data);

    let search = this.state.searchString.trim().toLowerCase();
    // console.log(search);
    if (search.length > 0) {
      _data = Array.from(
        _data.filter(function(data) {
          return data.nama.toLowerCase().match(search);
        })
      );
      // console.log(_data);
    }

    return (
      <div className="container py-5">
        <input
          type="text"
          value={this.state.searchString}
          onChange={this.handleChange}
          placeholder="type name here"
        />
        <h1 className="text-center mb-4">Nilai Peserta UKT Tapak Suci</h1>

        {error && (
          <div className="text-center">
            <p>{error}</p>
          </div>
        )}

        <table className="table">
          <tbody>
            <tr>
              {/* <th>Time</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            {_data.map(user => {
              if (user.peserta_created_at !== null) {
                return (
                  <tr key={user.id}>
                    <td>{user.nama}</td>
                    <td>{user.email}</td>
                    <td>
                      <a href={`../nilai/${user.user}`}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-key={user.id}
                        >
                          Input Nilai
                        </button>
                      </a>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(Nilai);
