const USER_KEY = 'nctdev';

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener("submit", function(event) {
            event.preventDefault();
            handleRegister();
        });
    }

    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener("submit", function(event) {
            event.preventDefault();
            handleLogin();
        });
    }

    if (document.getElementById('resetPasswordForm')) {
        document.getElementById('resetPasswordForm').addEventListener("submit", function(event) {
            event.preventDefault();
            handleResetPassword();
        });
    }
});

function getUsers() {
    return JSON.parse(localStorage.getItem(USER_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
}

function handleRegister() {
    let fullName = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    const testEmail = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const testName = /^[A-Za-zà-ỹÀ-Ỹ\s]+$/;
    const testPhone = /^0\d{8,9}$/;
    const testPass = /^[a-zA-Z0-9]{3,}$/;

    let errorMessage = "";

    if (!testName.test(fullName)) errorMessage += "Tên không hợp lệ.\n";
    if (!testEmail.test(email)) errorMessage += "Email không hợp lệ.\n";
    if (!testPhone.test(phone)) errorMessage += "Số điện thoại không hợp lệ.\n";
    if (!testPass.test(password)) errorMessage += "Mật khẩu không hợp lệ.\n";
    if (password !== confirmPassword) errorMessage += "Nhập lại mật khẩu không khớp.\n";

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    let users = getUsers();
    if (users.some(user => user.email === email)) {
        alert("Email đã tồn tại, vui lòng chọn email khác.");
        return;
    }
    users.push({ fullName, email, phone, password });
    saveUsers(users);

    alert("Đăng ký thành công!");
    window.location.href = "./Signin.html";
}

function handleLogin() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = getUsers();
    let foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
        alert("Đăng nhập thành công!");
        window.location.href = "../index.html";
    } else {
        alert("Email hoặc mật khẩu không đúng!");
    }
}

function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.querySelector("#email_auth").value.trim();
    let users = getUsers();

    let userExists = users.some(user => user.email === email);
    
    if (!userExists) {
        alert("Email chưa có tài khoản.");
        return;
    }

    alert("Mã OTP đã được gửi đến email của bạn!");
    window.location.href = "./Signin2.html";
}

function handleResetPassword() {
    let email = document.getElementById("email").value.trim();
    let newPassword = document.getElementById("password").value.trim();
    let otp = document.getElementById("otp").value.trim(); 

    if (!email || !newPassword || !otp) {
        alert("Vui lòng nhập đầy đủ thông tin.");
        return;
    }

    let users = getUsers();
    let userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        saveUsers(users);
        alert("Mật khẩu đã được cập nhật thành công!");
        window.location.href = "./Signin.html"; 
    } else {
        alert("Email không tồn tại trong hệ thống.");
    }
}

function openDetail() {
    window.location.href = "./Detail.html";
}

function openInvoice() {
    window.location.href = "./Invoice.html";
}