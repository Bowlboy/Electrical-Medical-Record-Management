<?php
  include 'database/database.php';
  include 'entities/appointment.php';
  include 'utils.php';
  $database = new Database();
  $db_conn = $database->getConnection();
  $appointment = new Appointment();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  switch ($args[0]) {
    case 'delete':
      echo $appointment->deleteAppointment($database);
      break;
    default:
      echo "error";

  }
}


OCICommit($db_conn);
OCILogoff($db_conn);

?>
