const connection = require('../config/db');

exports.criarBox = (req, res) => {
    const { idApartamento } = req.body;
    const query = 'INSERT INTO Boxes (id_apartamento) VALUES (?)';
    const params = [idApartamento];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar box.'});
        }
        res.json({ success: true, message: 'Box cadastrado com sucesso!', data: results.insertId});
    });
}

exports.listarBoxes = (req, res) => {
    const query = 'SELECT B.id_box, A.id_apartamento, A.bloco, A.numeracao, V.id_veiculo, V.id_morador, V.placa, V.modelo, V.cor, V.criado_em FROM Boxes B LEFT JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento LEFT JOIN Veiculos V ON V.id_box = B.id_box';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os boxes.'});
        }
        res.json({ success: true, message: 'Boxes selecionados com sucesso!', data: results});
    });
}

exports.selecionarBoxPorId = (req, res) => {
    const query = 'SELECT B.id_box, A.id_apartamento, A.bloco, A.numeracao, V.id_veiculo, V.id_morador, V.placa, V.modelo, V.cor, V.criado_em FROM Boxes B LEFT JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento LEFT JOIN Veiculos V ON V.id_box = B.id_box WHERE B.id_box = ?';
    const params = [req.params.idBox];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar box.' });
        }
        res.json({ success: true, data: results[0] });
    });
}

exports.listarBoxesPorApartamento = (req, res) => {
    const query = 'SELECT B.id_box, A.id_apartamento, A.bloco, A.numeracao, V.id_veiculo, V.id_morador, V.placa, V.modelo, V.cor, V.criado_em FROM Boxes B LEFT JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento LEFT JOIN Veiculos V ON V.id_box = B.id_box WHERE A.id_apartamento = ?';
    const params = [req.params.idApartamento];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar boxes.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.atualizarBox = (req, res) => {
    const { idApartamento } = req.body;
    const { idBox } = req.params;
    const query = 'UPDATE Boxes SET id_apartamento = ? WHERE id_box = ?';
    const params = [idApartamento, idBox];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o box.'});
        }
        res.json({ success: true, message: 'Box atualizado com sucesso!'});
    });
}

exports.deletarBox = (req, res) => {
    const query = 'DELETE FROM Boxes WHERE id_box = ?';
    const params = [req.params.idBox];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o box.'});
        }
        res.json({ success: true, message: 'Box deletado com sucesso!'});
    });
}