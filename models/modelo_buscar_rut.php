<?php
	class Modelo_Buscar_Rut{
		private $conexion;
		function __construct(){
			require_once('../db/conexion.php');
			$this->conexion = new Conexion();
			$this->conexion->Conectar();
		}
		function BuscarRut($rut){
			$sql = "SELECT * FROM funcionario WHERE rut = '$rut' ";
			$arreglo = array();
			if($consulta = $this->conexion->con->query($sql)){
				while($consulta_VU = mysqli_fetch_array($consulta)){
					$arreglo[] = $consulta_VU;
				}
				return $arreglo;
                var_dump($arreglo);
				$this->conexion->cerrar();
			}
		}
	}
?>