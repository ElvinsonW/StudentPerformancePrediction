document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide-div");
    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => {
            slide.style.display = "none"; // Sembunyikan semua slide
        });
        slides[i].style.display = "block"; // Tampilkan slide yang diinginkan
    }

    function nextSlide() {
        index = (index + 1) % slides.length; // Loop ke slide berikutnya
        showSlide(index);
    }

    // Menjalankan slider otomatis setiap 5 detik
    setInterval(nextSlide, 5000);

    // Tampilkan slide pertama saat halaman dimuat
    showSlide(index);
});
