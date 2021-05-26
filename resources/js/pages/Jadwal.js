import React, { Component } from "react";
import { connect } from "react-redux";
import Http from "../Http";

class Jadwal extends Component {
  constructor(props) {
    super(props);

    // Initial state.
    this.state = {
      Jadwal: [],
      jadwal: null
    };

    // API endpoint.
    this.api = "/api/v1/jadwal";
  }

  componentDidMount() {
    Http.get(`${this.api}`)
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
  }

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
    const { Jadwal, error } = this.state;
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
            </tr>
            {Jadwal.map(el => (
              <tr key={el.id}>
                {/*                  */}
                <td>{el.id}</td>
                <td>{el.jadwal}</td>
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
