<?php
header("Content-Type: application/json");
header("Cache-Control: no-store");

$remote = isset($_SERVER["REMOTE_ADDR"]) ? $_SERVER["REMOTE_ADDR"] : "";
if ($remote !== "127.0.0.1" && $remote !== "::1") {
    http_response_code(403);
    echo json_encode(["error" => "forbidden"]);
    exit;
}

$patterns = ["*.jsx", "*.css", "*.html", "*.php"];
$stamp = "";

foreach ($patterns as $pattern) {
    $files = glob(__DIR__ . DIRECTORY_SEPARATOR . $pattern);
    sort($files);

    foreach ($files as $file) {
        $stamp .= basename($file) . ":" . filemtime($file) . ";";
    }
}

echo json_encode(["version" => md5($stamp)]);
