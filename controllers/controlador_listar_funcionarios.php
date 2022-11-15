<?php
require_once('../models/modelo_listar_funcionarios.php');
$MG = new Modelo_Listar_Funcionario();
$consulta = $MG -> ListarFuncionarios();
echo json_encode($consulta);
?>