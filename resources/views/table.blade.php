        <h1>Daftar Peserta Tapak Suci</h1>
        <table border="1" cellpadding="5">
            <thead>
                <tr class="table-danger">
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Tempat, Tanggal Lahir</th>
                    <th scope="col">Nomor Telepon</th>
                    <th scope="col">Alamat</th>
                </tr>
            </thead>
            <tbody>
                @foreach($todo ?? '' as $data)
                <tr>
                    <th scope="row">{{ $data->id }}</th>
                    <td>{{ $data->nama }}</td>
                    <td>{{ $data->ttl }}</td>
                    <td>{{ $data->telepon }}</td>
                    <td>{{ $data->alamat }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>