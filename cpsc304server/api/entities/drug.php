<?php
//Appointment Class containts methods and formatters specific to patient

class Drug {
  public function groupDrugs($database) {
    
    $query = "SELECT Drug.name , COUNT(*) as COUNT
              FROM Drug, Prescribes, Prescription
              WHERE Prescribes.prescription_id = Prescription.prescription_id AND Drug.drug_id = Prescribes.drug_id
              GROUP BY drug.name";
    $statement = $database->executePlainSQL($query);
    
    $result = array();
    while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
      $drug = array(
        "drug_name" => $row["NAME"],
        "count" => $row["COUNT"]       
      );
      array_push($result, $drug);
    }
    return json_encode($result);

  }


}

?>
