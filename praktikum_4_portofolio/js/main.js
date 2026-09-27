// =========== 1. TYPING EFFECT (Halaman Home) ===========
const typingText = document.getElementById('typing-text');

if (typingText) {
    const names = ['Chattama Albiantoro', 'Web Developer', 'Mahasiswa SI'];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentName = names[nameIndex];
        if (isDeleting) {
            typingText.textContent = currentName.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentName.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentName.length) {
            delay = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            nameIndex = (nameIndex + 1) % names.length;
            delay = 500; 
        }
        setTimeout(typeEffect, delay);
    }

    typeEffect(); 
}


// =========== 2. GENERATE PROJECT CARDS (Halaman Home) ===========
const projectGrid = document.getElementById('project-grid');

if (projectGrid) {
    const projects = [
        { 
            title: 'Website Profil', 
            desc: 'Platform penyaluran donasi interaktif menggunakan HTML, CSS.', 
            image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Website+Profil' ,
            link: 'project_card/website_profil/index.html'
        },
        { 
            title: 'Kalkulator JS', 
            desc: 'Program kalkulator interaktif dengan fungsi perhitungan parseFloat().', 
            image: 'https://placehold.co/600x400/0f172a/ffffff?text=Kalkulator+JS' ,
            link: 'project_card/kalkulator_js/index.html'
        },
        { 
            title: 'Form Interaktif', 
            desc: 'Formulir pendaftaran modern dengan fitur validasi input otomatis.', 
            image: 'https://placehold.co/600x400/4f46e5/ffffff?text=Form+Interaktif' ,
            link: 'project_card/formulir_interaktif/index.html'
        }
    ];

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
        `;
        card.addEventListener('click', () => {
            window.open(project.link, '_blank');
        });
        projectGrid.appendChild(card);
    });
}


// =========== 3. FITUR TAMBAHAN: VALIDASI FORM (Halaman Contact) ===========
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Mencegah halaman melakukan reload saat form dikirim (Materi Kuis Soal 15)
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const pesan = document.getElementById('pesan').value;

        // Validasi apakah ada kolom yang masih kosong
        if (nama === '' || email === '' || pesan === '') {
            alert('Mohon lengkapi seluruh kolom (Nama, Email, dan Pesan) sebelum mengirim!');
        } else {
            alert(`Terima kasih ${nama}! Pesan Anda telah berhasil dikirim.`);
            // Mengosongkan kembali isi input setelah berhasil
            document.getElementById('nama').value = '';
            document.getElementById('email').value = '';
            document.getElementById('pesan').value = '';
        }
    });
}