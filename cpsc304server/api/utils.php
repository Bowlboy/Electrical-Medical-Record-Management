<?php
  function json($code, $message) {
    $jsonResponse = array(
      "code" => $code,
      "message" => $message
    );
    return json_encode($jsonResponse);
  }

?>
