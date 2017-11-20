<?php
//Appointment Class containts methods and formatters specific to patient

class Employee {
  public function employeesByClinic ($database, $clinicId) {
    
    $query = "SELECT Employee.firstname, Employee.phone
              FROM Employee, Employs, Clinic
              WHERE Clinic.clinic_id = :bind1 AND Clinic.clinic_id=Employs.clinic_id AND Employs.employee_id = Employee.employee_id";
    $tuple = array(
      ":bind1" => $clinicId
    );
    $alltuples = array( $tuple );
    $statement = $database->executeBoundSQL($query, $alltuples);

    //Formatting sql result
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $employee = array(
        "firstname" => $row['FIRSTNAME'],
        "phone" => $row['PHONE']
      );
      array_push($result, $employee);
    }

    return json_encode($result);
  }


  public function addEmploysUsingName($database) {
    $query = "INSERT INTO Employs 
              SELECT employee_id, '" . $_POST['clinic_id'] . "', '" . $_POST['start_date'] ."', '" . $_POST['hours'] . "' FROM Employee WHERE Employee.firstname='" . $_POST['firstname'] ."' AND Employee.lastname = '" . $_POST['lastname'] . "'";
    $statement = $database->executePlainSQL($query);
    return $query;
    //return json(200, "Successfully inserted to Employs");
  }

}

?>
