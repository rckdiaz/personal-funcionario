<?php
	class Modelo_Agregar{
		private $conexion;
		function __construct(){
			require_once('../db/conexion.php');
			$this->conexion = new Conexion();
			$this->conexion->Conectar();
		}

	    public function AgregarFuncionario($rut, $nombres, $apellidoP, $apellidoM){
			if(!empty($rut)){
				$sql  = "INSERT INTO 
						funcionario (rut, nombres, apellido_p, apellido_m) 
						VALUES 
						('$rut', '$nombres', '$apellidoP', '$apellidoM')";
				$sql2 = "SELECT rut from funcionario where rut='$rut' ";
				$res2  = mysqli_query($this->conexion->con,$sql2);
				if($res2->num_rows <= 0 ){
					$res  = mysqli_query($this->conexion->con,$sql);
					return $res;
					$this->conexion->con->Cerrar();
				}
			}
	    }

		public function AgregarIMG($rut, $nuevoNombreImg){
			if(!empty($nuevoNombreImg)){
				$sql  = "UPDATE 
                    funcionario 
                    SET 
                    foto = '$nuevoNombreImg' where rut = '$rut' ";      
           		$res  = mysqli_query($this->conexion->con,$sql);
				
	        	return $res;
	        	$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarCI($rut, $nuevoNombreCI, $fecha){
			if(!empty($nuevoNombreCI)){
				$sql  = "INSERT INTO 
                    archivo (propietario, identificador, nombre, ingreso, enumerador) 
                    VALUES 
                    ('$rut', 'Cédula de Identidad', '$nuevoNombreCI' ,'$fecha', 1 )";
           		$res  = mysqli_query($this->conexion->con,$sql);
	        	return $res;
	        	$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarNac($rut, $nuevoNombreNac, $fecha){
			if(!empty($nuevoNombreNac)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Certificado de Nacimiento', '$nuevoNombreNac', '$fecha', 2 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarAnt($rut, $nuevoNombreAnt, $fecha, $dateAnt, $dateAntExpEn){
			if(!empty($nuevoNombreAnt)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, fecha, expira, enumerador) 
						VALUES 
						('$rut', 'Certificado de Antecedentes', '$nuevoNombreAnt', '$fecha', '$dateAnt', '$dateAntExpEn', 3 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarEM01($rut, $nuevoNombreEM_01, $fecha, $dateEM01, $dateEM01ExpEn){
			if(!empty($nuevoNombreEM_01)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, fecha, expira, enumerador) 
						VALUES 
						('$rut', 'Declaración Jurada EM-01', '$nuevoNombreEM_01', '$fecha', '$dateEM01', '$dateEM01ExpEn', 4 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarEM02($rut, $nuevoNombreEM_02, $fecha, $dateEM02, $dateEM02ExpEn){
			if(!empty($nuevoNombreEM_02)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, fecha, expira, enumerador) 
						VALUES 
						('$rut', 'Declaración Jurada EM-02', '$nuevoNombreEM_02', '$fecha', '$dateEM02', '$dateEM02ExpEn', 5 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarEstudios($rut, $nuevoNombreEstudios, $fecha){
			if(!empty($nuevoNombreEstudios)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Certificado de Estudios', '$nuevoNombreEstudios', '$fecha', 6 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarTitulo($rut, $nuevoNombreTitulo, $fecha){
			if(!empty($nuevoNombreTitulo)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Certificado de Título', '$nuevoNombreTitulo', '$fecha', 7 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarSalud($rut, $nuevoNombreSalud, $fecha, $dateSalud, $dateSaludExpEn){
			if(!empty($nuevoNombreSalud)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, fecha, expira, enumerador) 
						VALUES 
						('$rut', 'Certificado de Salud', '$nuevoNombreSalud', '$fecha', '$dateSalud', '$dateSaludExpEn', 8 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarMilitar($rut, $nuevoNombreMilitar, $fecha, $dateMil, $dateMilExpEn){
			if(!empty($nuevoNombreMilitar)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, fecha, expira, enumerador) 
						VALUES 
						('$rut', 'Certificado de Situacion Militar al día', '$nuevoNombreMilitar', '$fecha', '$dateMil', '$dateMilExpEn', 9 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarCV($rut, $nuevoNombreCV, $fecha){
			if(!empty($nuevoNombreCV)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Currículum Vitae', '$nuevoNombreCV', '$fecha', 10 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarAFP($rut, $newAFP, $fecha){
			if(!empty($newAFP)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Certificado de Institución Previsional', '$newAFP', '$fecha', 11 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }

		public function AgregarInstSalud($rut, $newInstSalud, $fecha){
			if(!empty($newInstSalud)){
				$sql  = "INSERT INTO 
						archivo (propietario, identificador, nombre, ingreso, enumerador) 
						VALUES 
						('$rut', 'Certificado de Institución de Salud', '$newInstSalud', '$fecha', 12 )";        
				$res  = mysqli_query($this->conexion->con,$sql);
				return $res;
				$this->conexion->con->Cerrar();
			}
	    }
	}
?>