<?php
    include_once '..\Persistence\Connection.php';
    include_once '..\Persistence\CompraDAO.php';
    
    $idCompra = $_POST['readPurchaseId'];
    $idCliente = $_POST['readPurchaseIdCliente'];

    $conexao = new Connection();
    $conexao = $conexao->getConnection();
    
    $cartaDAO = new CompraDAO();
    $resultado = $cartaDAO->consultarPorSubstringId($idCompra, $idCliente, $conexao);

    if($resultado->num_rows > 0){
        echo "<div class='item first-item'><h1>Resultados da Consulta</h1></div>";
        while($linha = $resultado->fetch_assoc()){
            echo "<div class='item'>
                    <button onclick='showPurchase(" 
                                                . $linha['IdCompra'] . ','
                                                . $linha['IdCarta'] . ','
                                                . $linha['Quantidade'] . ',"'
                                                . $linha['Endereco'] . '","'
                                                . $linha['Telefone'] . '",'
                                                . $linha['IdDestinatario'] . ")'
                    >".$linha['IdCompra']."</button>
                </div>";
		}
    }else{
        echo FALSE;
    }
?>