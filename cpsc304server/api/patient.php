<?php
  include 'utils.php';
  include 'database/database.php';
  include 'entities/patient.php';
  include 'entities/appointment.php';
   
  $database = new Database();
  $db_conn = $database->getConnection();
  $success = True;
  $patient = new Patient();
  $appointment = new Appointment();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  switch ($args[0]) {
    case 'get':
      echo $patient->getPatient($database, $args[1]);
      break;
    case 'appointment':
      echo $patient->getAppointmentById($database, $appointment, $args[1]);
      break;
    case 'test':
      echo $patient->getTestById($database, $args[1]);
      break;
    case 'medication':
     echo $patient->getMedication($database, $args[1]);
      break; 
    case 'allergies':
       echo $patient->getAllergies($database, $args[1]);
        break;
    case 'vaccinations':
        echo $patient->getVaccinations($database, $args[1]);
        break;
    case 'search':
      echo $patient->getPatientsByLastName($database, $args[1]);
      break;
    case 'immunized':
      echo $patient->getImmunizedPatients($database);
      break;
    default:
      echo "error";

  }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  switch ($args[0]) {
    case 'login':
      $loginResult = $patient->login($database);
      echo $loginResult;
      break;
    case 'add':
    
     $insertResult = $patient->insertPatient($database); 
     echo $insertResult;     
     break;
    case 'update':
      $updateResult = $patient->updatePatient($database);
      echo $updateResult;
      break;
    case 'delete':
      $deleteResult = $patient->deletePatient($database);
      echo $deleteResult;
      break;
    case 'allergy':
      echo $patient->addAllergy($database);
      break;
    case 'prescription':
      echo $patient->addPrescription($database);
      break;
    default:
      echo "error";
  }

}
OCICommit($db_conn);
OCILogoff($db_conn);

?>
