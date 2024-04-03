// Kiểm tra cookie `accessToken` và hiển thị thông tin người dùng nếu tồn tại
const checkAccessTokenAndDisplayUserInfo = () => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        // Giải mã và xác thực token
        const decodedToken = decodeAndVerifyToken(accessToken);
        if (decodedToken) {
            const userId = decodedToken.sub;
            // Gửi yêu cầu đến máy chủ để lấy thông tin người dùng
            getUserInfo(userId)
                .then(userData => {
                    // Hiển thị thông tin người dùng trên navbar
                    displayUserInfo(userData);
                })
                .catch(error => {
                    console.error('Error getting user info:', error);
                });
        }
    }
};

// Hàm giải mã và xác thực token
const decodeAndVerifyToken = (token) => {
    try {
        const decoded = jwt_decode(token);
        // Thực hiện xác thực token ở đây nếu cần thiết
        return decoded;
    } catch (error) {
        console.error('Error decoding/verifying token:', error);
        return null;
    }
};

// Hàm gửi yêu cầu lấy thông tin người dùng
const getUserInfo = (userId) => {
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user info');
            }
            return response.json();
        });
};

// Hiển thị thông tin người dùng trên navbar
const displayUserInfo = (userData) => {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = userData.name;
    }
};

// Hàm lấy giá trị của cookie
const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};

// Gọi hàm kiểm tra cookie `accessToken` và hiển thị thông tin người dùng khi trang được tải
checkAccessTokenAndDisplayUserInfo();
