// Mengambil elemen dari HTML
const formPendaftaran = document.getElementById('form-pendaftaran');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const inputDivisi = document.getElementById('divisi');
const inputPassword = document.getElementById('password');
const infoSandi = document.getElementById('info-sandi');
const pesanValidasi = document.getElementById('pesan-validasi');
const memberGrid = document.getElementById('member-grid');

// 1. Interaksi Real-Time: Menghitung panjang karakter password saat diketik
inputPassword.addEventListener('input', () => {
    const panjang = inputPassword.value.length;
    infoSandi.textContent = `Jumlah karakter: ${panjang} (Minimal 6 karakter)`;

    if (panjang >= 6) {
        infoSandi.style.color = '#16a34a'; // Hijau jika sudah cukup
    } else {
        infoSandi.style.color = '#dc2626'; // Merah jika masih kurang
    }
});

// 2. Validasi Saat Form Dikirim (Submit)
formPendaftaran.addEventListener('submit', (e) => {
    // Mencegah halaman reload saat tombol ditekan
    e.preventDefault();

    const nama = inputNama.value;
    const email = inputEmail.value;
    const divisi = inputDivisi.value;
    const password = inputPassword.value;

    // Cek apakah ada kolom yang kosong
    if (nama === '' || email === '' || divisi === '' || password === '') {
        pesanValidasi.textContent = 'Harap lengkapi semua kolom pendaftaran!';
        pesanValidasi.style.color = '#dc2626';
    } 
    // Cek apakah panjang password kurang dari 6 karakter
    else if (password.length < 6) {
        pesanValidasi.textContent = 'Kata sandi terlalu pendek (minimal 6 karakter)!';
        pesanValidasi.style.color = '#dc2626';
    } 
    // Jika semua validasi berhasil
    else {
        pesanValidasi.textContent = `Pendaftaran ${nama} berhasil!`;
        pesanValidasi.style.color = '#16a34a';

        // Membuat kartu peserta baru secara otomatis di bawah form
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <h3>${nama}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Divisi:</strong> ${divisi}</p>
        `;

        memberGrid.appendChild(card);

        // Mengosongkan kembali isi form setelah berhasil
        inputNama.value = '';
        inputEmail.value = '';
        inputDivisi.value = '';
        inputPassword.value = '';
        infoSandi.textContent = 'Jumlah karakter: 0';
        infoSandi.style.color = '#64748b';
    }
});