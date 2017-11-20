<?php
class Database{
 
    // specify your own database credentials
    private $db_name = "dbhost.ugrad.cs.ubc.ca:1522/ug";
    private $username = "ora_t6c0b";
    private $password = "a36132141";
    public $db_conn;
    public $success = True;

    // get the database connection
    public function getConnection(){
 
 
        $this->db_conn = OCILogon($this->username, $this->password,$this->db_name); 
 
        return $this->db_conn;
    }




    public function executePlainSQL($query) {
      $statement = OCIParse($this->db_conn, $query);

      if (!$statement) {
        return "NOT A STATEMENT";
      }

      OCIExecute($statement);
      return $statement;
    }


    public function executeBoundSQL($query, $list) {
      $statement = OCIParse($this->db_conn, $query);
      
      if (!$statement) {
        $e = OCI_Error($db_conn);
        return jsonError("executeBoundSQL !statement", $e['message']);
      }
      foreach ($list as $tuple) {
        foreach ($tuple as $bind => $val) {
          
          OCIBindByName($statement, $bind, $val);
          unset ($val); //make sure you do not remove this. Otherwise $val will remain in an array object wrapper which will not be recognized by Oracle as a proper datatype
         }
       }
      
      $r = OCIExecute($statement, OCI_DEFAULT);
      if (!$r) {
        $e = OCI_Error($statement); // For OCIExecute errors pass the statement handle
        return newErr("executeBoundSQL !$r", $e['message']);
      }
      return $statement; 
     }


//TODO: Move to util later
     function newErr($type, $message) {
       $response = array(
        'error' => $type,
        'message' => $message
       );
       return json_encode($response);
       
     }


     public function simpleDisplay($statement) {
       while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
         echo $row[1];
       }
     }

    public function toJSON($statement) {
      $result = array();
      
       while($row = OCI_Fetch_Array($statement, OCI_BOTH)) {
         $result[] = $row; 
       }
       return json_encode($result);
    } 

}?>
