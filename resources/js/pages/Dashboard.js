import React, { Component } from "react";
import { connect } from "react-redux";
import Http from "../Http";

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

  componentDidMount() {
    // Http.get(`${this.api}?status=open`)
    //   .then(response => {
    //     const { data } = response.data;
    //     this.setState({
    //       data,
    //       error: false
    //     });
    //   })
    //   .catch(() => {
    //     this.setState({
    //       error: "Unable to fetch data."
    //     });
    //   });
  }

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    Http.post(this.api, {
      nama: this.state.nama,
      ttl: this.state.ttl,
      sekolah: this.state.sekolah,
      telepon: this.state.telepon,
      alamat: this.state.alamat,
      unit: this.state.unit,
      status: this.state.status,
      profil: this.state.profil,
      akte: this.state.akte
    })
      .then(() => {
        // const allTodos = [newItem, ...this.state.data];
        // this.setState({ data: allTodos, todo: null });
        this.todoForm.reset();
      })
      .catch(() => {
        this.setState({
          error: "Sorry, there was an error saving your to do."
        });
      });
  };

  // closeTodo = e => {
  //   const { key } = e.target.dataset;
  //   const { data: todos } = this.state;

  //   Http.patch(`${this.api}/${key}`, { status: "closed" })
  //     .then(() => {
  //       const updatedTodos = todos.filter(
  //         todo => todo.id !== parseInt(key, 10)
  //       );
  //       this.setState({ data: updatedTodos });
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: "Sorry, there was an error closing your to do."
  //       });
  //     });
  // };

  render() {
    const { data, error } = this.state;
    if (this.props.user.id !== "VolejRejNm") {
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
                  onChange={this.handleChange}
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
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button className="btn btn-primary" type="submit">
                SUBMIT
              </button>
              {/* <div className="form-group">
                <label htmlFor="addTodo">Add a New To Do</label>
                <div className="d-flex">
                  <input
                    id="addTodo"
                    name="todo"
                    className="form-control mr-3"
                    placeholder="Build a To Do app..."
                    onChange={this.handleChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container py-5">
          <div className="container">
            <h2 className="text-center mb-4">Dashboard Admin</h2>
            <div className="row row-cols-2 ">
              <div className="col p-2 d-flex justify-content-center ">
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-primary text-white p-5"
                >
                  <h4>Daftar Siswa Tapak Suci</h4>
                </div>
              </div>
              <div className="col p-2 d-flex justify-content-center">
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-success text-white p-5"
                >
                  <h4>Peserta UKT Tapak Suci</h4>
                </div>
              </div>
              <div className="col p-2 d-flex justify-content-center">
                <div
                  style={{ width: 300, textAlign: "center" }}
                  className="rounded bg-warning text-dark p-5"
                >
                  <h4>Jadwal UKT Tapak Suci</h4>
                </div>
              </div>
              <div className="col p-2 d-flex justify-content-center">
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
