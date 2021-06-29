import React from "react";
import Modal from "react-modal";
import Http from "../Http";
import { connect } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

function ModalDaftar(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [Jadwal, setJadwal] = React.useState([]);
  const [JadwalId, setJadwalId] = React.useState(0);
  const [Tingkat, setTingkat] = React.useState(``);
  console.log(props);

  React.useEffect(() => {
    getJadwal();
  }, []);

  const getJadwal = async () => {
    await Http.get(`/api/v1/jadwal`)
      .then(response => {
        const { data } = response.data;
        setJadwal(data);
      })
      .catch(() => {
        this.setState({
          error: "Unable to fetch data."
        });
      });
  };

  const onDaftar = async () => {
    await Http.put(`/api/v1/todo/${props.user.id}`, {
      jadwal_id: JadwalId,
      ujian_tingkat: Tingkat
    })
      .then(response => {
        console.log(response);
        closeModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={openModal}>
        DAFTAR UJIAN KENAIKAN TINGKAT
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="mb-3">
          <label className="form-label">Jadwal</label>
          <select
            onChange={e => setJadwalId(e.target.value)}
            className="form-control"
          >
            <option>Pilih Jadwal Ujian</option>
            {Jadwal.map(x => (
              <option value={x.id}>{x.jadwal}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            onChange={e => setTingkat(e.target.value)}
          >
            <option>Pilih Tingkat Ujian</option>
            {/* <option value="Tingkat Dasar">Tingkat Dasar</option> */}
            <option value="Tingkat Satu">Tingkat Satu</option>
            <option value="Tingkat Dua">Tingkat Dua</option>
            <option value="Tingkat Tiga">Tingkat Tiga</option>
            <option value="Tingkat Empat">Tingkat Empat</option>
          </select>
        </div>
        <button onClick={onDaftar} className="btn btn-primary">
          DAFTAR
        </button>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(ModalDaftar);
