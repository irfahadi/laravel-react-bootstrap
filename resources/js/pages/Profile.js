import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Http from "../Http";
import ModalDaftar from "../components/Modal";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: {},
      moreLoaded: false,
      error: false
    };

    // API Endpoint
    this.api = "/api/v1/todo";
  }
  static propTypes = {
    location: PropTypes.object.isRequired
  };

  componentDidMount() {
    const id =
      this.props.location.pathname.replace("/", "") || this.props.user.id;
    Http.get(`${this.api}/${id}`)
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
    return (
      <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src={this.state.data.profil} alt="" />
              {/* <div className="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div> */}
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-head">
              <h5>{this.state.data.nama}</h5>
              <h6>{this.state.data.status}</h6>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="tab-content profile-tab" id="myTabContent">
              <div
                className="tab-pane fade show active mt-4"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row">
                  <div className="col-md-6">
                    <label>Tempat, Tangal Lahir</label>
                  </div>
                  <div className="col-md-6">
                    <p>{this.state.data.ttl}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Asal Sekolah</label>
                  </div>
                  <div className="col-md-6">
                    <p>{this.state.data.sekolah}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nomor Telepon</label>
                  </div>
                  <div className="col-md-6">
                    <p>{this.state.data.telepon}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Unit</label>
                  </div>
                  <div className="col-md-6">
                    <p>{this.state.data.unit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="text-center">Foto Akte Kelahiran</h6>
            <div className="profile-img ">
              <img src={this.state.data.akte} alt="" />
            </div>
          </div>
          <div className="col-md-2 mt-2">
            <input
              type="submit"
              className="btn btn-primary"
              name="btnAddMore"
              value="EDIT PROFIL"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2">
            <ModalDaftar id={this.state.data.id} />
          </div>
          <div className="col-md-2">
            {this.state.data.nilai_dasar !== `` && (
              <a href={this.state.data.nilai_dasar} download>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="nilai_dasar"
                >
                  DOWNLOAD NILAI TINGKAT DASAR
                </button>
              </a>
            )}
          </div>
          <div className="col-md-2">
            {this.state.data.nilai_1 !== `` && (
              <a href={this.state.data.nilai_1} download>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="nilai_1"
                >
                  DOWNLOAD NILAI TINGKAT SATU
                </button>
              </a>
            )}
          </div>
          <div className="col-md-2">
            {this.state.data.nilai_2 !== `` && (
              <a href={this.state.data.nilai_2} download>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="nilai_2"
                >
                  DOWNLOAD NILAI TINGKAT DUA
                </button>
              </a>
            )}
          </div>
          <div className="col-md-2">
            {this.state.data.nilai_3 !== `` && (
              <a href={this.state.data.nilai_3} download>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="nilai_3"
                >
                  DOWNLOAD NILAI TINGKAT TIGA
                </button>
              </a>
            )}
          </div>
          <div className="col-md-2">
            {this.state.data.nilai_4 !== `` && (
              <a href={this.state.data.nilai_4} download>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="nilai_4"
                >
                  DOWNLOAD NILAI TINGKAT EMPAT
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(withRouter(Profile));
