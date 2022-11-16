<?php
	require_once '../models/modelo_eliminar.php';
	$idArchivo = $_POST['idArchivo'];

	$propietario = $_POST['propietario'];
	$ingreso = $_POST['ingreso'];
	$nombre = $_POST['nombre'];
	
	$ME = new Modelo_Eliminar();
	$consulta = $ME -> EliminarArchivo($idArchivo);
	if(unlink('../docs/'.$propietario.'/'.$ingreso.'/'.$nombre) ) {
		// Eliminado Correctamente
	} else {
		// No se ha podido eliminar
	}
	
	//print_r($consulta);
	//echo json_encode($consulta, JSON_UNESCAPED_UNICODE);
?>