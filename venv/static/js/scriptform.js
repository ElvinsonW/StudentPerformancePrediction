//NAVBAR
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector(".navbar");

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    
    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0"; // Navbar muncul saat scroll ke atas
    } else {
        navbar.style.top = "-80px"; // Navbar hilang saat scroll ke bawah
    }
    prevScrollPos = currentScrollPos;
};


// hanya bisa input 0-100
document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("input[type='number']");

    inputs.forEach(input => {
        // Mencegah input karakter tidak valid (e, E, +, -)
        input.addEventListener("keydown", function (event) {
            if (["e", "E", "+", "-"].includes(event.key)) {
                event.preventDefault();
            }
        });

        // Validasi saat pengguna menginput angka secara manual
        input.addEventListener("input", function () {
            let value = this.value;

            // Hilangkan karakter yang bukan angka
            value = value.replace(/[^0-9]/g, "");

            // Ambil batasan min & max dari atribut input
            let min = parseInt(this.getAttribute("min")) || 0;
            let max = parseInt(this.getAttribute("max")) || Infinity;

            // Jika angka di luar batas, atur ke batas maksimum
            if (value !== "" && parseInt(value) > max) {
                value = max.toString();
            }

            // Perbarui nilai input
            this.value = value;
        });
    });
});


//input berubah warna 
document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.style.background = "white"; // Jika diisi, ubah warna ke putih
            } else {
                this.style.background = "rgba(199, 158, 91, 0.7)"; // Jika kosong, kembali ke coklat
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                this.classList.add("filled"); // Tambahkan efek setelah diisi
            } else {
                this.classList.remove("filled"); // Kembali ke warna awal jika kosong
            }
        });
    });
}); 


// dropdown 
document.addEventListener("DOMContentLoaded", function () {
    let selects = document.querySelectorAll("select"); // Ambil semua select

    selects.forEach(select => {
        // Jika belum dipilih, warna tetap coklat
        if (!select.value) {
            select.style.background = "rgba(199, 158, 91, 0.7)";
        }

        select.addEventListener("change", function () {
            if (this.value) {
                this.classList.add("changed"); // Warna berubah jadi putih setelah dipilih
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const resultContainer = document.querySelector(".result-container p:last-child");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();  // Mencegah reload halaman

        let formData = new FormData(form);

        fetch("/predict", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.prediction !== undefined) {
                resultContainer.textContent = `Prediksi Nilai: ${data.prediction[0].toFixed(2)}`;
            } else {
                resultContainer.textContent = "Terjadi kesalahan dalam prediksi.";
            }
        })
        .catch(error => {
            resultContainer.textContent = "Gagal menghubungi server.";
            console.error("Error:", error);
        });
    });
});
