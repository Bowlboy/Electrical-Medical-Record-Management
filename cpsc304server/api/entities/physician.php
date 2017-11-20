<?php
//Physician Class containts methods and formatters specific to physician

class Physician {
  public function login($database) {
    $loginQuery = "select * from physician where employee_id=:bind1";
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
      "token" => $row["EMPLOYEE_ID"]
      );
      array_push($result, $login);
   }
   return json_encode($result); 
  }

}

?>
