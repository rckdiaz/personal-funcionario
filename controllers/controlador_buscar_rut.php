<?php
	require_once '../models/modelo_buscar_rut.php';
	$rut = $_POST['rut'];
	$MBR = new Modelo_Buscar_Rut();
	$consulta = $MBR -> BuscarRut($rut);
	//print_r($consulta);
	
	echo json_encode($consulta, JSON_UNESCAPED_UNICODE);
?>