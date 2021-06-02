import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Http from "../Http";

class Update extends Component {
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      loading: true,
      error: false,
      newData: {}
    };

    // API endpoint.
    this.api = "/api/v1/todo";
    this.id =
      this.props.location.pathname.replace("/update/", "") ||
      this.props.user.id;
  }

  componentDidMount() {
    Http.get(`${this.api}/${this.id}`)
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

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ data: { [name]: value }, newData: { [name]: value } });
    console.log(this.state.newData);
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    Http.put(`${this.api}/${this.id}`, this.state.newData)
      .then(() => {
        // const allTodos = [newItem, ...this.state.data];
        // this.setState({ data: allTodos, todo: null });
        // this.todoForm.reset();
        window.location.href = "/" + this.id;
      })
      .catch(() => {
        this.setState({
          error: "Sorry, there was an error saving your to do."
        });
      });
  };

  render() {
    return (
      <div className="container py-5">
        <div className="add-todos mb-5">
          <h1 className="text-center mb-4">Update Peserta UKT Tapak Suci</h1>
          <form
            method="post"
            onSubmit={this.handleSubmit}
            ref={el => {
              this.todoForm = el;
            }}
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label className="form-label">Nama</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="nama"
                value={this.state.data?.nama || null}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tempat, Tanggal Lahir</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="ttl"
                value={this.state.data?.ttl || null}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Asal Sekolah</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="sekolah"
                value={this.state.data?.sekolah || null}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nomor Telepon</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="telepon"
                value={this.state.data?.telepon || null}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Alamat</label>
              <textarea
                className="form-control"
                onChange={this.handleChange}
                name="alamat"
                rows="3"
                value={this.state.data?.alamat || null}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Unit Latihan</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="unit"
                value={this.state.data?.unit || null}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Foto Profil
              </label>
              <input
                className="form-control"
                type="file"
                name="profil"
                onChange={this.handleChange}
                // value={this.state.data?.profil || null}
                // required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Foto Akte Kelahiran
              </label>
              <input
                className="form-control"
                type="file"
                name="akte"
                onChange={this.handleChange}
                // value={this.state.data?.akte || null}
                // required
              />
            </div>
            {this.props.user.id === "VolejRejNm" && (
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  value={this.state.data?.status}
                >
                  <option value="Tingkat Dasar">Tingkat Dasar</option>
                  <option value="Tingkat Satu">Tingkat Satu</option>
                  <option value="Tingkat Dua">Tingkat Dua</option>
                  <option value="Tingkat Tiga">Tingkat Tiga</option>
                  <option value="Tingkat Empat">Tingkat Empat</option>
                </select>
              </div>
            )}
            {/* <div className="mb-3">
              <label className="form-label">Status</label>
              <input
                type="text"
                className="form-control"
                onChange={this.handleChange}
                name="unit"
                value={this.state.data?.stat || null}
                required
              />
            </div> */}
            <button className="btn btn-primary" type="submit">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(withRouter(Update));
