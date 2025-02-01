const app = (method, e) => {
    const path = e.parameter.path || ""; // อ่าน path จาก URL parameters
    let response = { method, path, status: 200, data: null };

    let requestData = {};
    if (method === "POST" && e.postData) {
        try {
            requestData = JSON.parse(e.postData.contents);
        } catch (error) {
            response.status = 400;
            response.data = { message: "Invalid JSON", error: error.toString() };
            return ContentService.createTextOutput(JSON.stringify(response))
                .setMimeType(ContentService.MimeType.JSON);
        }
    }

    if (path === "login") {
        const { username, password } = requestData;
        if (username === "admin" && password === "admin") {
            response.data = { message: "Login successful", user: username };
        } else {
            response.status = 401;
            response.data = { message: "Invalid credentials" };
        }
    } else {
        response.status = 404;
        response.data = { message: "Invalid path" };
    }

    return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON);
};

const doGet = (e) => app("GET", e);
const doPost = (e) => app("POST", e);
