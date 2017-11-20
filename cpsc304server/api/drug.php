<?php
  include 'database/database.php';
  include 'entities/drug.php';

  $database = new Database();
  $db_conn = $database->getConnection();
  $drug = new Drug();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  switch ($args[0]) {
    case 'group':
      echo $drug->groupDrugs($database);
      break;
    default:
      echo "error";

  }
}


OCICommit($db_conn);
OCILogoff($db_conn);

?>
