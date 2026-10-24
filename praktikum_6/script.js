$(document).ready(function() {
    
    // 1. JQUERY Untuk Navigasi Tab Katalog (fadeIn)
    $('.tab-btn').on('click', function() {
        const target = $(this).data('target');
        
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').hide();
        $(target).fadeIn(400);
    });

    // 2. JQUERY Untuk Kartu melayang saat di-hover (Animate)
    $('.card').css('position', 'relative').hover(
        function() {
            $(this).stop().animate({ top: '-8px' }, 200);
        }, 
        function() {
            $(this).stop().animate({ top: '0px' }, 200);
        }
    );

    // 3. CUSTOM JQUERY VALIDATION (Password huruf + angka)
    $.validator.addMethod('hurufAngka', function (value, element) {
        return this.optional(element) || (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
    }, 'Password wajib mengandung kombinasi huruf dan angka');

    // 4. JQUERY SLIDE (Untuk Notifikasi Form) & VALIDASI PLUGIN
    $('#formOrder').validate({
        rules: {
            nama: { required: true, minlength: 3 },
            email: { required: true, email: true },
            hp: { required: true, digits: true, minlength: 10 },
            tipe: { required: true },
            alamat: { required: true, minlength: 10 },
            password: { required: true, minlength: 8, hurufAngka: true } // Custom Rule diaplikasikan
        },
        messages: {
            nama: { required: "Nama tidak boleh kosong", minlength: "Minimal 3 karakter" },
            email: { required: "Email tidak boleh kosong", email: "Format email tidak valid" },
            hp: { required: "Nomor HP wajib diisi", digits: "Hanya boleh angka", minlength: "Minimal 10 angka" },
            tipe: { required: "Silakan pilih tipe laptop" },
            alamat: { required: "Alamat pengiriman wajib diisi", minlength: "Detail alamat terlalu pendek" },
            password: { required: "Password wajib diisi", minlength: "Minimal 8 karakter" }
        },
        errorElement: 'div',
        // Jika validasi sukses semua, jalankan aksi submit ini
        submitHandler: function(form) {
            // Tampilkan pesan sukses dengan efek Slide Down, biarkan 4 detik, lalu Slide Up
            $('#pesanSukses').stop(true, true).slideDown(400).delay(4000).slideUp(400);
            
            // Kosongkan form kembali
            form.reset();
        }
    });

});