<?php
require_once '../models/modelo_agregar.php';
$MA = new Modelo_Agregar();
$DT = new DateTime();  
$fecha = $DT->format("Y-m-d");

$rut       = $_POST['id_rut'];
$nombres   = $_POST['id_nombres'];
$apellidoP = $_POST['id_apellidoP'];
$apellidoM = $_POST['id_apellidoM'];

//$dateCI        = $_POST['dateCI'];
//$dateNac       = $_POST['dateNac'];
$dateAnt        = $_POST['dateAnt'];
$dateAntExpEn   = $_POST['dateAntExpEn'];
$dateEM01       = $_POST['dateEM01'];
$dateEM01ExpEn  = $_POST['dateEM01ExpEn'];
$dateEM02       = $_POST['dateEM02'];
$dateEM02ExpEn  = $_POST['dateEM02ExpEn'];
//$dateEst       = $_POST['dateEst'];
//$dateTit       = $_POST['dateTit'];
$dateSalud      = $_POST['dateSalud'];
$dateSaludExpEn = $_POST['dateSaludExpEn'];
$dateMil        = $_POST['dateMil'];
$dateMilExpEn   = $_POST['dateMilExpEn'];
//$dateCV        = $_POST['dateCV'];
//$dateAFP       = $_POST['dateAFP'];
//$dateInstSalud = $_POST['dateInstSalud'];
//var_dump($dateCI);
//var_dump($dateNac);
//var_dump($dateAnt);
//var_dump($dateEM01);
//var_dump($dateEM01);
//var_dump($dateEst);
//var_dump($dateTit);
//var_dump($dateCV);
//var_dump($dateAFP);
//var_dump($dateInstSalud);
$MA -> AgregarFuncionario($rut, $nombres, $apellidoP, $apellidoM, $fecha);

$dest      = '../docs';
$creacion  = mkdir("$dest/$rut/$fecha", 0777, true);

$tmp_ci = $_FILES['id_ci']['tmp_name'];
$ci     = $_FILES['id_ci']['name'];
$extCI = strtolower(pathinfo($ci, PATHINFO_EXTENSION));
$nuevoNombreCI = $rut.'_Cédula_de_Identidad.'.$extCI;
if($ci != null){      
    move_uploaded_file($tmp_ci, "$dest/$rut/$fecha/$nuevoNombreCI");
    $MA -> AgregarCI($rut, $nuevoNombreCI, $fecha); 
}

$tmp_nac    = $_FILES['id_nacimiento']['tmp_name'];
$nacimiento = $_FILES['id_nacimiento']['name'];
$extNac = strtolower(pathinfo($nacimiento, PATHINFO_EXTENSION));
$nuevoNombreNac = $rut.'_Certificado_de_Nacimiento.'.$extNac; 
if($nacimiento != null){    
    move_uploaded_file($tmp_nac, "$dest/$rut/$fecha/$nuevoNombreNac");
    $MA -> AgregarNac($rut, $nuevoNombreNac, $fecha);
}

$tmp_ant      = $_FILES['id_antecedentes']['tmp_name'];
$antecedentes = $_FILES['id_antecedentes']['name'];
$extAnt = strtolower(pathinfo($antecedentes, PATHINFO_EXTENSION));
$nuevoNombreAnt = $rut.'_Certificado_de_Antecedentes.'.$extAnt;
if($antecedentes != null){ 
    move_uploaded_file($tmp_ant, "$dest/$rut/$fecha/$nuevoNombreAnt");
    $MA -> AgregarAnt($rut, $nuevoNombreAnt, $fecha, $dateAnt, $dateAntExpEn);
}

$tmp_EM_01 = $_FILES['id_EM_01']['tmp_name'];
$EM_01     = $_FILES['id_EM_01']['name'];
$extEM01 = strtolower(pathinfo($EM_01, PATHINFO_EXTENSION));
$nuevoNombreEM_01 = $rut.'_Declaración_Jurada_EM01.'.$extEM01;
if($EM_01 != null){ 
    move_uploaded_file($tmp_EM_01, "$dest/$rut/$fecha/$nuevoNombreEM_01");
    $MA -> AgregarEM01($rut, $nuevoNombreEM_01, $fecha, $dateEM01, $dateEM01ExpEn);
}

$tmp_EM_02 = $_FILES['id_EM_02']['tmp_name'];
$EM_02     = $_FILES['id_EM_02']['name'];
$extEM02 = strtolower(pathinfo($EM_02, PATHINFO_EXTENSION));
$nuevoNombreEM_02 = $rut.'_Declaración_Jurada_EM02.'.$extEM02;
if($EM_02 != null){
    move_uploaded_file($tmp_EM_02, "$dest/$rut/$fecha/$nuevoNombreEM_02");
    $MA -> AgregarEM02($rut, $nuevoNombreEM_02, $fecha, $dateEM02, $dateEM02ExpEn);
}

$tmp_estudios = $_FILES['id_estudios']['tmp_name'];
$estudios     = $_FILES['id_estudios']['name'];
$extEstudios = strtolower(pathinfo($estudios, PATHINFO_EXTENSION));
$nuevoNombreEstudios = $rut.'_Certificado_de_Estudios.'.$extEstudios;
if($estudios != null){
    move_uploaded_file($tmp_estudios, "$dest/$rut/$fecha/$nuevoNombreEstudios");
    $MA -> AgregarEstudios($rut, $nuevoNombreEstudios, $fecha);
}

$tmp_titulo = $_FILES['id_titulo']['tmp_name'];
$titulo     = $_FILES['id_titulo']['name'];
$extTitulo = strtolower(pathinfo($titulo, PATHINFO_EXTENSION));
$nuevoNombreTitulo = $rut.'_Certificado_de_Título.'.$extTitulo;
if($titulo != null){
    move_uploaded_file($tmp_titulo, "$dest/$rut/$fecha/$nuevoNombreTitulo");
    $MA -> AgregarTitulo($rut, $nuevoNombreTitulo, $fecha);
}

$tmp_cert_salud = $_FILES['id_cert_salud']['tmp_name'];
$cert_salud     = $_FILES['id_cert_salud']['name'];
$extSalud = strtolower(pathinfo($cert_salud, PATHINFO_EXTENSION));
$nuevoNombreSalud = $rut.'_Certificado_de_Salud.'.$extSalud;
if($cert_salud != null){
    move_uploaded_file($tmp_cert_salud, "$dest/$rut/$fecha/$nuevoNombreSalud");
    $MA -> AgregarSalud($rut, $nuevoNombreSalud, $fecha, $dateSalud, $dateSaludExpEn);
}

$tmp_militar = $_FILES['id_militar']['tmp_name'];
$militar     = $_FILES['id_militar']['name'];
$extMilitar = strtolower(pathinfo($militar, PATHINFO_EXTENSION));
$nuevoNombreMilitar = $rut.'_Situación_Militar.'.$extMilitar;
if($militar != null){
    move_uploaded_file($tmp_militar, "$dest/$rut/$fecha/$nuevoNombreMilitar");
    $MA -> AgregarMilitar($rut, $nuevoNombreMilitar, $fecha, $dateMil, $dateMilExpEn);
}

$tmp_cv = $_FILES['id_cv']['tmp_name'];
$cv     = $_FILES['id_cv']['name'];
$extCV = strtolower(pathinfo($cv, PATHINFO_EXTENSION));
$nuevoNombreCV = $rut.'_Currículum_Vitae.'.$extCV;
if($cv != null){
    move_uploaded_file($tmp_cv, "$dest/$rut/$fecha/$nuevoNombreCV");
    $MA -> AgregarCV($rut, $nuevoNombreCV, $fecha);
}

$tmp_afp = $_FILES['id_afp']['tmp_name'];
$afp     = $_FILES['id_afp']['name'];
$extAFP = strtolower(pathinfo($afp, PATHINFO_EXTENSION));
$newAFP = $rut.'_Certificado_de_Previsión.'.$extAFP;
if($afp != null){
    move_uploaded_file($tmp_afp, "$dest/$rut/$fecha/$newAFP");
    $MA -> AgregarAFP($rut, $newAFP, $fecha);
}

$tmp_inst_salud = $_FILES['id_inst_salud']['tmp_name'];
$inst_salud     = $_FILES['id_inst_salud']['name'];
$extInstSalud = strtolower(pathinfo($inst_salud, PATHINFO_EXTENSION));
$newInstSalud = $rut.'_Certificado_de_Institución_de_Salud.'.$extInstSalud;
if($inst_salud != null){
    move_uploaded_file($tmp_inst_salud, "$dest/$rut/$fecha/$newInstSalud");
    $MA -> AgregarInstSalud($rut, $newInstSalud, $fecha);
}

echo '{"resultado":"Ok"}';
//echo json_encode($consulta);
?>