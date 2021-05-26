import React from "react";
import Modal from "react-modal";
import Http from "../Http";

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

export default function ModalDaftar(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [Jadwal, setJadwal] = React.useState([]);
  const [JadwalId, setJadwalId] = React.useState(0);

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
    await Http.put(`/api/v1/todo/${props.id}`, {
      jadwal_id: JadwalId
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
        <select onChange={e => setJadwalId(e.target.value)}>
          <option>Pilih Jadwal Ujian</option>
          {Jadwal.map(x => (
            <option value={x.id}>{x.jadwal}</option>
          ))}
        </select>
        <button onClick={onDaftar} className="btn btn-primary">
          DAFTAR
        </button>
      </Modal>
    </div>
  );
}
