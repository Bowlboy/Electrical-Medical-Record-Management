<?php
//Patient Class containts methods and formatters specific to patient

class Patient {
  
  public function toJSON($statement) {
    $result = array();
      
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      
      $patient = array(
        "patient_id" => $row["PATIENT_ID"],
        "firstname" => $row["FIRSTNAME"],
        "lastname" => $row["LASTNAME"],
        "phone" => $row["PHONE"],
        "address" => $row["ADDRESS"],
        "gender" => $row["GENDER"],
        "email" => $row["EMAIL"],
        "birthdate" => $row["BIRTHDATE"],
      );
      array_push($result, $patient);
    }
    return json_encode($result);

  }
  
  public function getPatient($database, $id) {
      $getPatientQuery = "SELECT *
                          FROM patient P
                          WHERE P.patient_id=:bind1";
      $tuple = array(
        ":bind1" => $id 
      );
      $alltuples = array( $tuple );
      $statement = $database->executeBoundSQL($getPatientQuery, $alltuples);
      return $this->toJSON($statement);     
 
  }
  
  public function getPatientsByLastName($database, $lastname) {
    $query = "SELECT * FROM patient P WHERE p.lastname=:bind1";

    $tuple = array( ":bind1" => $lastname);
    $alltuples = array( $tuple );
    $statement = $database->executeBoundSQL($query, $alltuples);
    
    $result = array();
    while ($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $patient = array(
        "patient_id" => $row["PATIENT_ID"],
        "firstname" => $row["FIRSTNAME"],
        "lastname" => $row["LASTNAME"],
        "phone" => $row["PHONE"]
      );
      array_push($result, $patient);
    }
    return json_encode($result);
  }

  public function insertPatient($database) {
    $insertQuery = "insert into patient values (seq_patient.nextval, :bind1, :bind2, :bind3, :bind4, :bind5, :bind6, :bind7)";
    $tuple = array(
      ":bind1" => $_POST['firstname'],
      ":bind2" => $_POST['lastname'],
      ":bind3" => $_POST['phone'],
      ":bind4" => $_POST['address'],
      ":bind5" => $_POST['gender'],
      ":bind6" => $_POST['email'],
      ":bind7" => $_POST['birthdate']
    );
    $alltuples = array(
      $tuple
    );
    print_r($_POST); 
    $statement = $database->executeBoundSQL($insertQuery, $alltuples);
    return $statement;
    
  }
  public function updatePatient($database) {
    $updatePatientQuery = "UPDATE Patient 
                            SET firstname=:bind1,
                            lastname=:bind2,
                            phone=:bind3,
                            address=:bind4,
                            gender=:bind5,
                            email=:bind6,
                            birthdate=:bind7
                            WHERE patient_id=:bind8";
    $tuple = array(
      "bind1" => $_POST['firstname'],
      "bind2" => $_POST['lastname'],
      "bind3" => $_POST['phone'],
      "bind4" => $_POST['address'],
      "bind5" => $_POST['gender'],
      "bind6" => $_POST['email'],
      "bind7" => $_POST['birthdate'],
      "bind8" => $_POST['patient_id']
    );
    $alltuples = array( $tuple );
    $statement = $database->executeBoundSQL($updatePatientQuery, $alltuples);
    return json(200, "Update Success");

  } 



  public function addAllergy($database) {
    print_r($_POST);
    $query = "INSERT INTO Allergy
              SELECT medicalRecord_id, '" . $_POST['allergen'] . "' 
              FROM MedicalRecord MR, Patient P
              WHERE P.patient_id = " . $_POST['patient_id'] . "
              AND P.patient_id = MR.patient_id";
    $statement = $database->executePlainSQL($query);
    return $query;    
  } 

  public function addPrescription($database) {
    print_r($_POST);
    $drugIdQuery = "SELECT * FROM Drug WHERE name=:bind1";
    return "adding prescription";
  }

  public function getMedication($database, $id) {
    $selectQuery = "SELECT DISTINCT Drug.name
                    FROM Prescribes, Prescription, Drug
                    WHERE Prescription.patient_id=:bind1 AND
                      Prescribes.prescription_id = Prescription.prescription_id AND
                      Drug.drug_id = Prescribes.drug_id";
    $tuple = array(
      "bind1" => $id
    );
    $alltuples = array($tuple);
    $statement = $database->executeBoundSQL($selectQuery, $alltuples);

    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $drug = array(
        "drug_name" => $row["NAME"]
      );
      array_push($result, $drug);
    }
    return json_encode($result);
  }
 
  public function deletePatient($database) {
    $deleteQuery = "DELETE FROM patient WHERE patient_id=:bind1";
    $tuple = array( "bind1" => $_POST['patient_id'] );
    $alltuples = array($tuple);
    $statement = $database->executeBoundSQL($deleteQuery, $alltuples);

    return json(200, "Delete successfull");

  }


  public function getAppointmentById($database,$appointment, $id) {
    //select * from appointment where patient_id=1;
    $query = "select E.firstname, E.lastname, C.address, A.startTime, C.clinic_id, P.license_number, A.appointmentdate
              FROM Physician P, Appointment A, Clinic C, Employee E
              WHERE A.patient_id=:bind1 AND A.clinic_id = C.clinic_id AND A.license_number = P.license_number
                   AND P.employee_id = E.employee_id";
    $tuple = array(
      ":bind1" => $id
    );
    $alltuples = array( $tuple );
    $statement = $database->executeBoundSQL($query, $alltuples);

    //Formatting sql result
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $patient = array(
        "first_name" => $row["FIRSTNAME"],
        "last_name" => $row["LASTNAME"],
        "address" => $row["ADDRESS"],
        "starttime" => $row["STARTTIME"],
        "clinic_id" => $row["CLINIC_ID"],
        "license_number" => $row["LICENSE_NUMBER"],
        "appointment_date" => $row["APPOINTMENTDATE"]
      );
      array_push($result, $patient);
    }
    return json_encode($result);

  }
  
  public function getTestById($database, $id) {
    $query = "SELECT T.lab_id, T.description, P.license_number, E.firstname, E.lastname, O.laborderdate, O.status, O.result
              FROM Test T, LabOrder O, Physician P, Employee E
              WHERE O.patient_id = :bind1 AND
              T.test_id = O.test_id AND
              O.employee_id = P.employee_id AND
              P.employee_id = E.employee_id";
    $tuple = array(
      ":bind1" => $id
    );
    $alltuples = array($tuple);
    $statement = $database->executeBoundSQL($query, $alltuples);
    //Formatting sql result
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $test = array(
        "lab_id" => $row["LAB_ID"],
        "description" => $row["DESCRIPTION"],
        "license_number" => $row["LICENSE_NUMBER"],
        "firstname" => $row["FIRSTNAME"],
        "lastname" => $row["LASTNAME"],
        "lab_order_date" => $row["LABORDERDATE"],
        "status" => $row["STATUS"],
        "result" => $row["RESULT"]
      );
      array_push($result, $test);
    }
    return json_encode($result);      
  }
 
  public function getAllergies($database, $id) {
    $query = "SELECT Allergen 
              FROM Patient, MedicalRecord, Allergy
              WHERE Patient.patient_id = MedicalRecord.patient_id
              AND Allergy.MedicalRecord_id = MedicalRecord.medicalRecord_id
              AND Patient.patient_id =:bind1";
    $tuple = array( ":bind1" => $id );
    $alltuples = array($tuple);
    $statement = $database->executeBoundSQL($query, $alltuples);
    
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $allergen = array(
        "allergen" => $row["ALLERGEN"]
      );
      array_push($result, $allergen); 
    }
    return json_encode($result);
  }  

  public function getVaccinations($database, $id) {
    $query = "SELECT Vaccine
              FROM Patient, MedicalRecord, Vaccination
              WHERE Patient.patient_id = MedicalRecord.patient_id
              AND Vaccination.medicalRecord_id = MedicalRecord.medicalRecord_id
              AND Patient.patient_id = :bind1";
    $tuple = array(":bind1" => $id);
    $alltuples = array($tuple);
    $statement = $database->executeBoundSQL($query, $alltuples);


    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $vaccine = array(
        "vaccine" => $row["VACCINE"]
      );
      array_push($result, $vaccine);
    }
    

    return json_encode($result); 
  }

  public function getImmunizedPatients($database) {
    $query = "SELECT * from ImmunizedPatients";
    $statement = $database->executePlainSQL($query);
    
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $patient = array(
        "patient_id" => $row['PATIENT_ID'],
        "firstname" => $row['FIRSTNAME'],
        "lastname" => $row['LASTNAME']
      );
      array_push($result, $patient);
    }
    return json_encode($result);
  }

 
  public function login($database) {
    $loginQuery = "select * from patient where patient_id=:bind1";
    $tuple = array(
      ":bind1" => $_POST['id']
    );

    $allTuples = array(
      $tuple
    );  
    $statement = $database->executeBoundSQL($loginQuery, $allTuples);
    return $this->loginToken($statement);
  }     
        
        
        
  public function loginToken($statement) {
   $result = array();
    
   while($row = OCI_FETCH_ARRAY($statement, OCI_BOTH)) {
     $login = array(
      "token" => $row["PATIENT_ID"]
      );
      array_push($result, $login);
   }
   return json_encode($result);
  }

}

?>
