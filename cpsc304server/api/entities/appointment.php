<?php
//Patient Class containts methods and formatters specific to patient

class Appointment {
  public function toJSON($statement) {
    $result = array();
      
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      
      $patient = array(
        "clinic_id" => $row["CLINIC_ID"],
        "license_number" => $row["LICENSE_NUMBER"],
        "start_time" => $row["STARTTIME"],
        "appointment_date" => $row["APPOINTMENTDATE"],
        "patient_id" => $row["PATIENT_ID"],
      );
      array_push($result, $patient);
    }
    return json_encode($result);

  }

  public function deleteAppointment($database) {
   $query = "DELETE FROM APPOINTMENT WHERE
              clinic_id = :bind1 AND
              license_number = :bind2 AND
              startTime = :bind3 AND
              appointmentDate = :bind4 AND
              patient_id = :bind5";
   $tuple = array(
      ":bind1" => $_POST['clinic_id'],
      ":bind2" => $_POST['license_number'],
      ":bind3" => $_POST['startTime'],
      ":bind4" => $_POST['appointmentDate'],
      ":bind5" => $_POST['patient_id']
   );
    $alltuples = array( $tuple );
    
    $statement = $database->executeBoundSQL($query, $alltuples);
    
    
    return json(200, "Successfully deleted appointment");
         
  }
}

?>
