// selfie.js

const url = `https://compliance.chippercash.com/face-verification/selfie_challenge`;

// 检查是否是我们要处理的请求
if ($request.url.indexOf(url) !== -1) {
    // 从响应中获取 data 和 addresses
    const responseBody = JSON.parse($response.body);
    const selfieData = responseBody.data;
    const addresses = responseBody.addresses;

    if (selfieData && addresses) {
        // 替换 selfie 值
        let modifiedResponse = JSON.parse($response.body);
        modifiedResponse.selfie = selfieData;

        // 发送通知栏信息
        const addressInfo = Object.entries(addresses).map(([chain, address]) => `${chain}: ${address}`).join("\n");
        $notification.post("Blockchain Addresses", "", addressInfo);

        // 返回修改后的响应体
        $done({ body: JSON.stringify(modifiedResponse) });
    } else {
        console.log("Data or addresses missing in response.");
        $done({});
    }
} else {
    $done({});
}
