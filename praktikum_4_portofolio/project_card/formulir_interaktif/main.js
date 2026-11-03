const formPendaftaran = document.getElementById('form-pendaftaran');
const inputNama = document.getElementById('nama');
const inputEmail = document.getElementById('email');
const inputDivisi = document.getElementById('divisi');
const inputPassword = document.getElementById('password');
const infoSandi = document.getElementById('info-sandi');
const pesanValidasi = document.getElementById('pesan-validasi');
const memberGrid = document.getElementById('member-grid');

inputPassword.addEventListener('input', () => {
    const panjang = inputPassword.value.length;
    infoSandi.textContent = `Jumlah karakter: ${panjang} (Minimal 6 karakter)`;

    if (panjang >= 6) {
        infoSandi.style.color = '#16a34a';
    } else {
        infoSandi.style.color = '#dc2626';
    }
});

formPendaftaran.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = inputNama.value;
    const email = inputEmail.value;
    const divisi = inputDivisi.value;
    const password = inputPassword.value;

    if (nama === '' || email === '' || divisi === '' || password === '') {
        pesanValidasi.textContent = 'Harap lengkapi semua kolom pendaftaran!';
        pesanValidasi.style.color = '#dc2626';
    } else if (password.length < 6) {
        pesanValidasi.textContent = 'Kata sandi terlalu pendek (minimal 6 karakter)!';
        pesanValidasi.style.color = '#dc2626';
    } else {
        pesanValidasi.textContent = `Pendaftaran ${nama} berhasil!`;
        pesanValidasi.style.color = '#16a34a';

        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <h3>${nama}</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Divisi:</strong> ${divisi}</p>
        `;

        memberGrid.appendChild(card);

        inputNama.value = '';
        inputEmail.value = '';
        inputDivisi.value = '';
        inputPassword.value = '';
        infoSandi.textContent = 'Jumlah karakter: 0';
        infoSandi.style.color = '#64748b';
    }
});
