<?php
	class Modelo_Buscar{
		private $conexion;
		function __construct(){
			require_once('../db/conexion.php');
			$this->conexion = new Conexion();
			$this->conexion->Conectar();
		}
		function BuscarFuncionario($inputBuscador){
			$sql = "SELECT * FROM funcionario WHERE rut LIKE '%$inputBuscador%' 
                OR nombres LIKE '%$inputBuscador%' 
                OR apellido_p LIKE '%$inputBuscador%'
                OR apellido_m LIKE '%$inputBuscador%'
                ORDER BY nombres DESC";
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