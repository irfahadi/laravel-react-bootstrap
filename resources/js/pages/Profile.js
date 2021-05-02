import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Http from "../Http";

class Profile extends Component {
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
    this.api = "/api/v1/todo";
  }

  componentDidMount() {
    Http.get(`${this.api}/${this.props.user.id}`)
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
              <div className="row">
                <div className="col-md-6">
                  <p className="proile-rating">
                    Nilai Tingkat Dasar :{" "}
                    <span>{this.state.data.nilai_dasar}</span>
                  </p>
                  <p className="proile-rating">
                    Nilai Tingkat 1 : <span>{this.state.data.nilai_1}</span>
                  </p>
                  <p className="proile-rating">
                    Nilai Tingkat 2 : <span>{this.state.data.nilai_2}</span>
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="proile-rating">
                    Nilai Tingkat 3 : <span>{this.state.data.nilai_3}</span>
                  </p>
                  <p className="proile-rating">
                    Nilai Tingkat 4 : <span>{this.state.data.nilai_4}</span>
                  </p>
                </div>
              </div>
              {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul> */}
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
              className="profile-edit-btn"
              name="btnAddMore"
              value="Edit Profile"
            />
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

export default connect(mapStateToProps)(Profile);
