<?php
	require_once '../models/modelo_buscar.php';
	$inputBuscador = $_POST['inputBuscador'];
	$MB = new Modelo_Buscar();
	$consulta = $MB -> BuscarFuncionario($inputBuscador);
	//print_r($consulta);
	
	echo json_encode($consulta, JSON_UNESCAPED_UNICODE);
?>