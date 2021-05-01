import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Http from "../Http";

class Siswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      apiMore: "",
      moreLoaded: false,
      error: false
    };

    // API Endpoint
    this.api = "/api/v1/user";
  }

  componentDidMount() {
    Http.get(this.api)
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

  loadMore = () => {
    this.setState({ loading: true });
    Http.get(this.state.apiMore)
      .then(response => {
        const { data } = response.data;
        const apiMore = response.data.links.next;
        const dataMore = this.state.data.concat(data);
        this.setState({
          data: dataMore,
          apiMore,
          loading: false,
          moreLoaded: true,
          error: false
        });
      })
      .catch(() => {
        this.setState({
          error: "Unable to fetch data."
        });
      });
  };

  deleteuser = e => {
    const { key } = e.target.dataset;
    const { data: users } = this.state;

    Http.delete(`${this.api}/${key}`)
      .then(response => {
        if (response.status === 204) {
          const index = users.findIndex(
            user => parseInt(user.id, 10) === parseInt(key, 10)
          );
          const update = [...users.slice(0, index), ...users.slice(index + 1)];
          this.setState({ data: update });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { loading, error, apiMore } = this.state;
    const users = Array.from(this.state.data);

    return (
      <div className="container py-5">
        <h1 className="text-center mb-4">To Do Siswa</h1>
        {console.log(this.state.data)}
        {error && (
          <div className="text-center">
            <p>{error}</p>
          </div>
        )}

        <table className="table">
          <tbody>
            <tr>
              <th>Time</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.created_at}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.deleteuser}
                    data-key={user.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {apiMore && (
          <div className="text-center">
            <button
              className={classNames("btn btn-primary", {
                "btn-loading": loading
              })}
              onClick={this.loadMore}
            >
              Load More
            </button>
          </div>
        )}

        {apiMore === null && this.state.moreLoaded === true && (
          <div className="text-center">
            <p>Everything loaded.</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(Siswa);
