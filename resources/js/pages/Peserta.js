import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Http from "../Http";

class Peserta extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      searchString: "",
      apiMore: "",
      moreLoaded: false,
      error: false
    };
    // API Endpoint
    this.api = "/api/v1/user";
    this.api2 = "/api/v1/todo";
  }

  componentDidMount() {
    this.getTodo();
  }

  handleChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  getTodo = async () => {
    await Http.get(`${this.api2}`)
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
  };

  deleteTodo = async e => {
    const { key } = e.target.dataset;
    await Http.delete(`${this.api2}/${key}`)
      .then(() => {
        this.getTodo();
      })
      .catch(error => {
        console.log(error);
      });
  };

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

        <h1 className="text-center mb-4">Peserta UKT Tapak Suci</h1>

        {error && (
          <div className="text-center">
            <p>{error}</p>
          </div>
        )}

        <table className="table" id="root">
          <thead>
            <tr>
              {/* <th>Time</th> */}
              <th>Nama</th>
              <th>Jadwal</th>
              <th>Ujian Tingkat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {_data.map(todo => {
              if (todo.peserta_created_at !== null) {
                return (
                  <tr key={todo.id}>
                    {/*                  */}
                    <td>{todo.nama}</td>
                    <td>{todo.jadwal}</td>
                    <td>{todo.ujian_tingkat}</td>
                    <td>
                      <a href={`../${todo.user}`}>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-key={todo.id}
                        >
                          Detail
                        </button>
                      </a>
                      <a href={`../generate/${todo.id}`}>
                        <button
                          type="button"
                          className="btn btn-warning"
                          data-key={todo.id}
                        >
                          PDF
                        </button>
                      </a>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-key={todo.id}
                        onClick={this.deleteTodo}
                      >
                        Delete
                      </button>
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

export default connect(mapStateToProps)(Peserta);
