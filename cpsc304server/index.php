<?php
  header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  include 'Router.php';

  $request = $_SERVER['REQUEST_URI'];
  $router = new Router($request);
  $router->get('/', 'view/home');
  $router->get('patient', 'api/patient');
  $router->get('physician', 'api/physician');
  $router->get('receptionist', 'api/receptionist');
  $router->get('login', 'api/login');
  $router->get('drug', 'api/drug');
  $router->get('employee', 'api/employee');
  $router->get('appointment', 'api/appointment');
?>
