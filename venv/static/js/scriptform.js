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
    const resultContainer = document.querySelector(".result");
    const recomendationContainer = document.querySelector(".recommendation");

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
                const score = data.prediction[0].toFixed(2);
                resultContainer.textContent = `${score}`;
                resultContainer.classList.add("show-result");
                if(score < 80){
                    const attendance = document.getElementById("attendance");
                    const hours_studied = document.getElementById("hours_studied");
                    const tutoring_sessions = document.getElementById("tutoring_sessions");
                    resultContainer.style.color = "red";
                    recomendationContainer.textContent = `Don't worry—there's always room for improvement! ${attendance.value >= 95 ? '' : 'Attend More Class'}, ${hours_studied == 112 ? '' :'Study more hour per weeks'}, and go for more tutoring if you can!`
                } else {
                    resultContainer.style.color = "green";
                    recomendationContainer.textContent = "Great job! Keep up the excellent work! You're on your way to achieving greatness!"
                }
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
