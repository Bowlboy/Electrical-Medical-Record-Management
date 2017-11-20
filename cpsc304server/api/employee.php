<?php
  include 'database/database.php';
  include 'entities/employee.php';

  $database = new Database();
  $db_conn = $database->getConnection();
  $employee = new Employee();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  switch ($args[0]) {
    case 'lookup':
      echo $employee->employeesByClinic($database, $args[1]);
      break;
    default:
      echo "error";

  }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  switch ($args[0]) {
    case 'add':
      $addEmploysResult = $employee->addEmploysUsingName($database);
      echo $addEmploysResult;
      break;
    default:
      echo "error";
  }

}



OCICommit($db_conn);
OCILogoff($db_conn);

?>
