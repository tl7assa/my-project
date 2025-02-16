const firebaseConfig = {
    apiKey: "AIzaSyBU48ZpxopqrwdgfrtJP0HPmTq_4nFdOG4",
    authDomain: "my-project-a8c50.firebaseapp.com",
    projectId: "my-project-a8c50",
    storageBucket: "my-project-a8c50.firebasestorage.app",
    messagingSenderId: "368877348153",
    appId: "1:368877348153:web:8589111b8660c4b717f4e8",
    measurementId: "G-WWE95EHSM6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('generateQRCodeButton').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    if (name) {
        const qrCodeText = `https://yourwebsite.com/attendance?name=${encodeURIComponent(name)}`;
        
        document.getElementById("qrcode").innerHTML = '';

        const qrcode = new QRCode(document.getElementById("qrcode"), {
            text: qrCodeText,
            width: 128,
            height: 128
        });

        saveAttendanceData(name);
    } else {
        alert('Введите имя!');
    }
});

function saveAttendanceData(name) {
    const date = new Date();
    const docRef = db.collection('attendance').doc();

    docRef.set({
        name: name,
        date: date.toISOString(),
    }).then(() => {
        console.log("Данные сохранены");
    }).catch((error) => {
        console.error("Ошибка записи: ", error);
    });
}
