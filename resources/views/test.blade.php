<!-- <html>
    <head>
        <title>Profil</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head> -->
    <!-- <body> -->
    <div className="container emp-profile">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src="profil/<?php echo $todo['profil']; ?>" alt="" width="200" height="250" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="profile-head">
              <h5><?php echo $todo['nama']; ?></h5>
              <h6><?php echo $todo['status']; ?></h6>
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
                    <p><?php echo $todo['ttl']; ?></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Asal Sekolah</label>
                  </div>
                  <div className="col-md-6">
                    <p><?php echo $todo['sekolah']; ?></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Nomor Telepon</label>
                  </div>
                  <div className="col-md-6">
                    <p><?php echo $todo['telepon']; ?></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Unit</label>
                  </div>
                  <div className="col-md-6">
                    <p><?php echo $todo['unit']; ?></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h6 className="text-center">Foto Akte Kelahiran</h6>
            <div className="profile-img ">
              <img src="akte/<?php echo $todo['akte']; ?>" alt="" width="200" height="250" />
            </div>
          </div>
        </div>
    </div>
<!-- </body> -->
<!-- </html> -->
    