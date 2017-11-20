<?php
  include 'database/database.php';
  include 'entities/receptionist.php';

  $database = new Database();
  $db_conn = $database->getConnection();
  $receptionist = new Receptionist();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  switch ($args[0]) {
    case 'get':
      echo "getting";
      break;
    default:
      echo "error";

  }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  switch ($args[0]) {
    case 'login':  
      $loginResult = $receptionist->login($database); 
      echo $loginResult;     
     break;
    default:
      echo "error";
  }

}
OCICommit($db_conn);
OCILogoff($db_conn);

?>
