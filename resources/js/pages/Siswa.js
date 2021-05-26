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

  verifikasiuser = e => {
    const { key } = e.target.dataset;
    this.setState({
      loading: true
    });
    Http.put(`${this.api}/${key}`)
      .then(async response => {
        if (response.status === 200) {
          await Http.get(this.api)
            .then(response => {
              const { data } = response.data;
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
        <h1 className="text-center mb-4">Daftar Siswa Tapak Suci</h1>
        {console.log(this.state.data)}
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
              <th>Status</th>
              <th>Action</th>
            </tr>
            {users.map(user => (
              <tr key={user.id}>
                {/*                  */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.email_verified_at === null
                    ? "Belum Verifikasi"
                    : "Sudah Verifikasi"}
                </td>
                <td>
                  {user.email_verified_at === null ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={this.verifikasiuser}
                      data-key={user.id}
                    >
                      Verifikasi
                    </button>
                  ) : (
                    <></>
                  )}
                </td>
              </tr>
            ))}
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

export default connect(mapStateToProps)(Siswa);
