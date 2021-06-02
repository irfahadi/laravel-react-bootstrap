import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Http from "../Http";
import PropTypes from "prop-types";

class NilaiDetail extends Component {
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      nilai_dasar: null,
      nilai_1: null,
      nilai_2: null,
      nilai_3: null,
      nilai_4: null
    };

    // API endpoint.
    this.api = "/api/v1/todo";
  }
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  onFileChange = event => {
    const { name } = event.target;
    // Update the state
    this.setState({ [name]: event.target.files[0].name });
  };

  // On file upload (click the upload button)
  onFileUpload = async e => {
    const id = this.props.location.pathname.replace("/nilai/", "");
    e.preventDefault();
    const { name } = e.target;

    await Http.put(`${this.api}/${id}`, { [name]: this.state[name] })
      .then(() => {
        this.todoForm.reset();
      })
      .catch(() => {
        this.setState({
          error: "Sorry, there was an error saving your to do."
        });
      });
  };

  render() {
    // const { Nilai, error } = this.state;
    return (
      <div className="container py-5">
        <div className="add-todos mb-5">
          <h1 className="text-center mb-4">Nilai Peserta UKT Tapak Suci</h1>
          <form
            method="post"
            encType="multipart/form-data"
            ref={el => {
              this.todoForm = el;
            }}
          >
            <div class="mb-3">
              <label class="form-label">Nilai Dasar</label>
              <input
                type="file"
                className="form-control"
                onChange={this.onFileChange}
                name="nilai_dasar"
              />
            </div>
            <button
              className="btn btn-primary mb-4"
              type="button"
              name="nilai_dasar"
              onClick={this.onFileUpload}
            >
              UPLOAD
            </button>
            <div class="mb-3">
              <label class="form-label">Nilai Tingkat 1</label>
              <input
                type="file"
                className="form-control"
                onChange={this.onFileChange}
                name="nilai_1"
              />
            </div>
            <button
              className="btn btn-primary mb-4"
              type="button"
              name="nilai_1"
              onClick={this.onFileUpload}
            >
              UPLOAD
            </button>
            <div class="mb-3">
              <label class="form-label">Nilai Tingkat 2</label>
              <input
                type="file"
                className="form-control"
                onChange={this.onFileChange}
                name="nilai_2"
              />
            </div>
            <button
              className="btn btn-primary mb-4"
              type="button"
              name="nilai_2"
              onClick={this.onFileUpload}
            >
              UPLOAD
            </button>
            <div class="mb-3">
              <label class="form-label">Nilai Tingkat 3</label>
              <input
                type="file"
                className="form-control"
                onChange={this.onFileChange}
                name="nilai_3"
              />
            </div>
            <button
              className="btn btn-primary mb-4"
              type="button"
              name="nilai_3"
              onClick={this.onFileUpload}
            >
              UPLOAD
            </button>
            <div class="mb-3">
              <label class="form-label">Nilai Tingkat 4</label>
              <input
                type="file"
                className="form-control"
                onChange={this.onFileChange}
                name="nilai_4"
              />
            </div>
            <button
              className="btn btn-primary mb-4"
              type="button"
              name="nilai_4"
              onClick={this.onFileUpload}
            >
              UPLOAD
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

export default connect(mapStateToProps)(withRouter(NilaiDetail));
