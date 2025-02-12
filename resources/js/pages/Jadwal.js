import React, { Component } from "react";
import { connect } from "react-redux";
import Http from "../Http";

class Jadwal extends Component {
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      searchString: "",
      data: [],
      jadwal: null
    };

    // API endpoint.
    this.api = "/api/v1/jadwal";
  }

  componentDidMount() {
    this.getTodo();
  }

  handleChangeSearch = e => {
    this.setState({
      searchString: e.target.value
    });
  };
  // componentDidMount() {
  //   Http.get(`${this.api}`)
  //     .then(response => {
  //       const { data } = response.data;
  //       this.setState({
  //         Jadwal: data,
  //         error: false
  //       });
  //     })
  //     .catch(() => {
  //       this.setState({
  //         error: "Unable to fetch data."
  //       });
  //     });
  // }

  getTodo = async () => {
    await Http.get(`${this.api}`)
      .then(response => {
        const { data } = response.data;
        // const apiMore = response.data.links.next;
        this.setState({
          data: data,
          error: false
        });
      })
      .catch(() => {
        this.setState({
          error: "Unable to fetch data."
        });
      });
  };

  deleteJadwal = async e => {
    const { key } = e.target.dataset;
    await Http.delete(`${this.api}/${key}`)
      .then(() => {
        this.getTodo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  handleSubmit = async e => {
    e.preventDefault();
    await Http.post(this.api, {
      jadwal: this.state.jadwal
    })
      .then(async () => {
        await Http.get(`${this.api}`)
          .then(response => {
            const { data } = response.data;
            this.setState({
              Jadwal: data,
              error: false
            });
          })
          .catch(() => {
            this.setState({
              error: "Unable to fetch data."
            });
          });
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
  render() {
    const { data, error } = this.state;

    let _data = Array.from(this.state.data);
    let search = this.state.searchString.trim();
    // console.log(search);
    if (search.length > 0) {
      _data = Array.from(
        _data.filter(function(data) {
          return data.jadwal.match(search);
        })
      );
      // console.log(_data);
    }
    return (
      <div className="container py-5">
        <div className="add-todos mb-5">
          <h1 className="text-center mb-4">Jadwal Peserta UKT Tapak Suci</h1>
          <form
            method="post"
            onSubmit={this.handleSubmit}
            ref={el => {
              this.todoForm = el;
            }}
          >
            <div class="mb-3">
              <label class="form-label">Jadwal</label>
              <input
                type="date"
                className="form-control"
                onChange={this.handleChange}
                name="jadwal"
                required
              />
            </div>
            <button className="btn btn-primary" type="submit">
              SUBMIT
            </button>
          </form>
          <br></br>
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChangeSearch}
            placeholder="type name here"
          />
        </div>
        {error && (
          <div className="text-center">
            <p>{error}</p>
          </div>
        )}

        <table className="table">
          <tbody>
            <tr>
              {/* <th>Time</th> */}
              <th>ID</th>
              <th>Jadwal</th>
              <th>Action</th>
            </tr>
            {_data.map(el => (
              <tr key={el.id}>
                {/*                  */}
                <td>{el.id}</td>
                <td>{el.jadwal}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-key={el.id}
                    onClick={this.deleteJadwal}
                  >
                    Delete
                  </button>
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

export default connect(mapStateToProps)(Jadwal);
