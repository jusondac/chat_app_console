const net = require('net');

// Daftar klien yang terhubung
const clients = [];

// Membuat server TCP
const server = net.createServer();

// Event saat klien terhubung
server.on('connection', (socket) => {
  console.log('Klien terhubung');

  // Menambahkan klien ke daftar
  clients.push(socket);

  // Event saat klien mengirim pesan
  socket.on('data', (data) => {
    const pesan = data.toString().trim();

    // Mengirim pesan ke semua klien
    clients.forEach((client) => {
      if (client !== socket) {
        client.write(pesan + '\n');
      }
    });
  });

  // Event saat klien terputus
  socket.on('end', () => {
    console.log('Klien terputus');

    // Menghapus klien dari daftar
    const index = clients.indexOf(socket);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

// Menjalankan server pada port 3000
server.listen(3000, () => {
  console.log('Server berjalan pada port 3000');
});
