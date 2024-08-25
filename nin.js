// nin.js

const serverUrl = "https://chipper.idamie.com/api/v1/upload/selfie_image";

// 从请求头中截取 Authorization 和从替换框中获取 code 参数
const authorization = $request.headers['Authorization'];
const code = $argument; // 从替换框获取 NIN (code)

if (!authorization || !code) {
    console.log('Authorization or code is missing.');
    $done({});
} else {
    // 设置请求头和 body
    const headers = {
        'Authorization': authorization,
        'code': code
    };

    const options = {
        url: serverUrl,
        method: 'POST',
        headers: headers,
    };

    // 发送请求到服务器
    $task.fetch(options).then(response => {
        if (response.statusCode === 200) {
            // 将 response body 传递给 selfie.js 进行处理
            $done({ response: response });
        } else {
            console.log(`Request failed. Status Code: ${response.statusCode}`);
            $done({});
        }
    }, reason => {
        console.log(`Request failed: ${reason.error}`);
        $done({});
    });
}
