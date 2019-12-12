<?php
	include_once '..\Persistence\Connection.php';
    include_once '..\Persistence\ClienteDAO.php';
    include_once '..\Persistence\CartaDAO.php';
    include_once '..\Persistence\CompraDAO.php';
    include_once '..\Model\Compra.php';
	
    $idCompra = $_POST['updatePurchaseIdCompra'];
    $nomeCarta = $_POST['updatePurchaseNomeCarta'];
	$quantidade = $_POST['updatePurchaseQuantidade'];
	$nomeDestinatario = $_POST['updatePurchaseNomeDestinatario'];
    $endereco = $_POST['updatePurchaseEndereco'];
    $telefone = $_POST['updatePurchaseTelefone'];
    $idComprador = $_POST['updatePurchaseIdComprador'];

    $conexao = new Connection();
	$conexao = $conexao->getConnection();
    
    //buscando a carta para pegar seu id
	$cartaDAO = new CartaDAO();
    $resultado = $cartaDAO->consultarPorNome($nomeCarta, $conexao);
  
    if($resultado->num_rows == 0){
        echo "Nome Carta não corresponde a uma carta cadastrada!\nTente novamente";
    } else {
        $idCarta = $resultado->fetch_assoc()['IdCarta'];

        //buscando Cliente destinatário para pegar seu id
        $clienteDAO = new ClienteDAO();
        $resultado = $clienteDAO->consultarPorNome($nomeDestinatario, $conexao);
        if($resultado->num_rows == 0){
            echo "Nome Destinatário não corresponde a um cliente cadastrado!\nTente novamente";
        } else {
            $idDestinatario = $resultado->fetch_assoc()['IdCliente'];

            $compra = new Compra($idCarta, $quantidade, $endereco, $telefone, $idComprador, $idDestinatario);

            $compraDAO = new CompraDAO();
            echo $compraDAO->alterarCompra($compra, $idCompra, $conexao);
        }
    }

?>