<?php

    class Conexion{

        private $host;
        private $user;
        private $pass;
        private $db;
        public  $con;

        //wamp 123456, mamp root;
        function __construct(){
            $this->host = 'localhost';
            $this->user = 'root';
            $this->pass = '123456';
            $this->db   = 'bd_funcionario';
        }

        function Conectar(){
            $this->con = new mysqli($this->host, $this->user, $this->pass, $this->db, 3306);
            $this->con->set_charset('utf8');
            //mysqli_set_charset($this->con, "utf8");
        }

        function Cerrar(){
            $this->con->close();
        }
    }

?>