<?php
	require_once '../models/modelo_traer_funcionario.php';
	$rut = $_POST['rut'];
    //$rut = '19147885-1';
	$MTF = new Modelo_Traer_Funcionario();
	$consulta = $MTF -> TraerFuncionario($rut);
	//print_r($consulta);
	
	echo json_encode($consulta, JSON_UNESCAPED_UNICODE);

?>