const connection = require('../config/db');

exports.criarVeiculo = (req, res) => {
    const { idMorador, idBox, placa, modelo, cor, criadoEm } = req.body;
    const query = 'INSERT INTO Veiculos (id_morador, id_box, placa, modelo, cor, criado_em) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [idMorador, idBox, placa, modelo, cor, criadoEm];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar veículo.'});
        }
        res.json({ success: true, message: 'Veículo cadastrado com sucesso!', data: results.insertId});
    });
}

exports.listarVeiculos = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os veículos.'});
        }
        res.json({ success: true, message: 'Veículos selecionados com sucesso!', data: results});
    });
}

exports.selecionarVeiculoPorId = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE V.id_veiculo = ?';
    const params = [req.params.idVeiculo];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar o veículo.' });
        }
        res.json({ success: true, data: results[0] });
    });
}

exports.listarVeiculosPorMorador = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE M.id_morador = ?';
    const params = [req.params.idMorador];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os veículos.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.selecionarVeiculoPorBox = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE B.id_box = ?';
    const params = [req.params.idBox];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar o veículo.' });
        }
        res.json({ success: true, data: results[0] });
    });
}

exports.selecionarVeiculoPorPlaca = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE V.placa = ?';
    const params = [req.params.placa];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar o veículo.' });
        }
        res.json({ success: true, data: results[0] });
    });
}

exports.listarVeiculosPorModelo = (req, res) => {
    const query = 'SELECT V.id_veiculo, M.id_morador, B.id_box, V.placa, V.modelo, V.cor, V.criado_em, A.id_apartamento, M.nome, M.telefone, M.email, M.status, M.criado_em AS morador_criado_em, A.bloco, A.numeracao FROM Veiculos V LEFT JOIN Moradores M ON V.id_morador = M.id_morador LEFT JOIN Boxes B ON V.id_box = B.id_box LEFT JOIN Apartamentos A ON M.id_apartamento = A.id_apartamento WHERE V.modelo = ?';
    const params = [req.params.placa];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os veículos.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.atualizarVeiculo = (req, res) => {
    const { idMorador, idBox, placa, modelo, cor, criadoEm } = req.body;
    const { idVeiculo } = req.params;
    const query = 'UPDATE Veiculos SET id_morador = ?, id_box = ?, placa = ?, modelo = ?, cor = ?, criado_em = ? WHERE id_veiculo = ?';
    const params = [idMorador, idBox, placa, modelo, cor, criadoEm, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o veículo.'});
        }
        res.json({ success: true, message: 'Veículo atualizado com sucesso!'});
    });
}

exports.setIdMoradorVeiculo = (req, res) => {
    const idMorador = req.body.idMorador;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET id_morador = ? WHERE id_veiculo = ?';
    const params = [idMorador, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o id do morador do veículo.'});
        }
        res.json({ success: true, message: 'Id do morador do veículo atualizado com sucesso!'});
    });
}

exports.setIdBoxVeiculo = (req, res) => {
    const idBox = req.body.idBox;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET id_box = ? WHERE id_veiculo = ?';
    const params = [idBox, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o id do box do veículo.'});
        }
        res.json({ success: true, message: 'Id do box do veículo atualizado com sucesso!'});
    });
}

exports.setPlacaVeiculo = (req, res) => {
    const placa = req.body.placa;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET placa = ? WHERE id_veiculo = ?';
    const params = [placa, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a placa do veículo.'});
        }
        res.json({ success: true, message: 'Placa do veículo atualizada com sucesso!'});
    });
}

exports.setModeloVeiculo = (req, res) => {
    const modelo = req.body.modelo;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET modelo = ? WHERE id_veiculo = ?';
    const params = [modelo, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o modelo do veículo.'});
        }
        res.json({ success: true, message: 'Modelo do veículo atualizado com sucesso!'});
    });
}

exports.setCorVeiculo = (req, res) => {
    const cor = req.body.cor;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET cor = ? WHERE id_veiculo = ?';
    const params = [cor, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a cor do veículo.'});
        }
        res.json({ success: true, message: 'Cor do veículo atualizada com sucesso!'});
    });
}

exports.setCriadoEmVeiculo = (req, res) => {
    const criadoEm = req.body.cor;
    const idVeiculo = req.params.idVeiculo;
    const query = 'UPDATE Veiculos SET criado_em = ? WHERE id_veiculo = ?';
    const params = [criadoEm, idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a data de criação do veículo.'});
        }
        res.json({ success: true, message: 'Data de criação do veículo atualizada com sucesso!'});
    });
}

exports.deletarVeiculo = (req, res) => {
    const query = 'DELETE FROM Veiculos WHERE id_veiculo = ?';
    const params = [req.params.idVeiculo];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o veículo.'});
        }
        res.json({ success: true, message: 'Veículo deletado com sucesso!'});
    });
}