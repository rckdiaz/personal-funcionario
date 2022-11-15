<?php
	class Modelo_Traer_Funcionario{
		private $conexion;
		function __construct(){
			require_once('../db/conexion.php');
			$this->conexion = new Conexion();
			$this->conexion->Conectar();
		}
		

		function TraerFuncionario($rut){
			$sql = "SELECT * FROM archivo WHERE propietario = '$rut' ";
			$arreglo = array();
			if($consulta = $this->conexion->con->query($sql)){
				while($consulta_VU = mysqli_fetch_array($consulta)){
					$arreglo[] = $consulta_VU;
				}
				return $arreglo;
				$this->conexion->cerrar();
			}
		}
	}
?>