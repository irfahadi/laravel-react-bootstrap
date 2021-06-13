import React, { Component } from "react";
import { connect } from "react-redux";
import Http from "../Http";
import Profile from "./Profile";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      error: false,
      nama: "",
      ttl: "",
      sekolah: "",
      telepon: "",
      alamat: "",
      unit: "",
      status: "Tingkat Dasar",
      profil: "",
      akte: ""
    };

    // API endpoint.
    this.api = "/api/v1/todo";
  }

  handleSubmit = e => {
    console.log(this.state);
    e.preventDefault();
    Http.post(this.api, this.state)
      .then(() => {
        window.location.href = "/";
        // const allTodos = [newItem, ...this.state.data];
        // this.setState({ data: allTodos, todo: null });
        // this.todoForm.reset();
      })
      .catch(() => {
        this.setState({
          error: "Sorry, there was an error saving your to do."
        });
      });
  };

  componentDidMount() {
    Http.get(`${this.api}/${this.props.user.id}`)
      .then(response => {
        const { data } = response.data;
        // const apiMore = response.data.links.next;
        this.setState({
          data
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

    this.setState({ [name]: value });
    // console.log(this.state);
  };

  handleChangeFile = e => {
    const { name } = e.target;
    // Update the state
    this.setState({ [name]: event.target.files[0].name });
  };

  render() {
    if (this.props.user.id !== "VolejRejNm") {
      if (this.state.data) {
        return <Profile />;
      } else {
        return (
          <div className="container py-5">
            <div className="add-todos mb-5">
              <h1 className="text-center mb-4">Form Peserta UKT Tapak Suci</h1>
              <form
                method="post"
                onSubmit={this.handleSubmit}
                ref={el => {
                  this.todoForm = el;
                }}
                enctype="multipart/form-data"
              >
                <div class="mb-3">
                  <label class="form-label">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    name="nama"
                    placeholder="Masukan Nama Anda"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Tempat, Tanggal Lahir</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    name="ttl"
                    placeholder="Masukan Tempat, Tanggal Lahir Anda"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Asal Sekolah</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    name="sekolah"
                    placeholder="Masukan Asal Sekolah Anda"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Nomor Telepon</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    name="telepon"
                    placeholder="Masukan Nomor Telepon Anda"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label">Alamat</label>
                  <textarea
                    className="form-control"
                    onChange={this.handleChange}
                    name="alamat"
                    rows="3"
                    placeholder="Masukan Alamat Anda"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label class="form-label">Unit Latihan</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleChange}
                    name="unit"
                    placeholder="Masukan Unit Latihan Anda"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Foto Profil
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    name="profil"
                    onChange={this.handleChangeFile}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Foto Akte Kelahiran
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    name="akte"
                    onChange={this.handleChangeFile}
                    required
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="container py-5">
          <div className="container">
            <h2 className="text-center mb-4">Dashboard Admin</h2>
            <div className="row row-cols-2 ">
              <div
                className="col p-2 d-flex justify-content-center "
                onClick={() => (window.location.href = "/siswa")}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-primary text-white p-5"
                >
                  <h4>Daftar Siswa Tapak Suci</h4>
                </div>
              </div>
              <div
                className="col p-2 d-flex justify-content-center"
                onClick={() => (window.location.href = "/peserta")}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-success text-white p-5"
                >
                  <h4>Peserta UKT Tapak Suci</h4>
                </div>
              </div>
              <div
                className="col p-2 d-flex justify-content-center"
                onClick={() => (window.location.href = "/jadwal")}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-warning text-dark p-5"
                >
                  <h4>Jadwal UKT Tapak Suci</h4>
                </div>
              </div>
              <div
                className="col p-2 d-flex justify-content-center"
                onClick={() => (window.location.href = "/nilaiall")}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-info text-dark p-5"
                >
                  <h4>Nilai UKT Tapak Suci</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(Dashboard);
