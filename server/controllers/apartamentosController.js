const connection = require('../config/db');

exports.criarApartamento = (req, res) => {
    const { bloco, numeracao } = req.body;
    const query = 'INSERT INTO Apartamentos (bloco, numeracao) VALUES (?, ?)';
    const params = [bloco, numeracao];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento cadastrado com sucesso!', data: results.insertId });
    });
}

exports.listarApartamentos = (req, res) => {
    const query = 'SELECT * FROM Apartamentos';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os apartamentos.'});
        }
        res.json({ success: true, message: 'Apartamentos selecionados com sucesso!', data: results});
    });
}

exports.selecionarApartamentoPorId = (req, res) => {
    const query = 'SELECT * FROM Apartamentos WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os apartamentos.'});
        }
        res.json({ success: true, message: 'Apartamento selecionado com sucesso!', data: results[0] });
    });
}

exports.listarApartamentosPorBloco = (req, res) => {
    const query = 'SELECT * FROM Apartamentos A WHERE bloco = ?';
    const params = [req.params.bloco];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar apartamentos.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.listarApartamentosPorNumeracao = (req, res) => {
    const query = 'SELECT * FROM Apartamentos A WHERE numeracao = ?';
    const params = [req.params.numeracao];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar apartamentos.' });
        }
        res.json({ success: true, data: results });
    });
}

exports.atualizarApartamento = (req, res) => {
    const { bloco, numeracao } = req.body;
    const { idApartamento } = req.params;
    const query = 'UPDATE Apartamentos SET bloco = ?, numeracao = ? WHERE id_apartamento = ?';
    const params = [bloco, numeracao, idApartamento];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento atualizado com sucesso!'});
    });
}

exports.setBlocoApartamento = (req, res) => {
    const bloco = req.body.bloco;
    const idApartamento = req.params.idApartamento;
    const query = 'UPDATE Apartamentos SET bloco = ? WHERE id_apartamento = ?';
    const params = [bloco, idApartamento];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o bloco do apartamento.'});
        }
        res.json({ success: true, message: 'Bloco do apartamento atualizado com sucesso!'});
    });
}

exports.setNumeracaoApartamento = (req, res) => {
    const { numeracao } = req.body;
    const { idApartamento } = req.params;
    const query = 'UPDATE Apartamentos SET numeracao = ? WHERE id_apartamento = ?';
    const params = [numeracao, idApartamento];

    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar a numeração do apartamento.'});
        }
        res.json({ success: true, message: 'Numeração do apartamento atualizada com sucesso!'});
    });
}

exports.deletarApartamento = (req, res) => {
    const query = 'DELETE FROM Apartamentos WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];

    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o apartamento.'});
        }
        res.json({ success: true, message: 'Apartamento deletado com sucesso!'});
    });
}