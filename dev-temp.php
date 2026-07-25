<?php
// Development helper only - reports a fingerprint of the project files so the
// browser can auto-reload when something changes. Delete before submitting.
header("Content-Type: application/json");
header("Cache-Control: no-store");

// Only answer requests coming from the local machine.
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
