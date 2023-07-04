const net = require('net');
const readline = require('readline');

// Membuat koneksi ke server
const client = net.createConnection({ port: 3000 }, () => {
  console.log('Terhubung ke server');

  // Membaca input dari pengguna
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.prompt();

  // Event saat ada input dari pengguna
  rl.on('line', (input) => {
    // Mengirim pesan ke server
    client.write(input);
    rl.prompt();
  });
});

// Event saat menerima pesan dari server
client.on('data', (data) => {
  const pesan = data.toString().trim();
  console.log('Pesan dari server:', pesan);
});

// Event saat koneksi terputus
client.on('end', () => {
  console.log('Koneksi ke server terputus');
});
