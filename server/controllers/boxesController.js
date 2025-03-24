import { query as _query } from '../config/db';

export function criarBox(req, res) {
    const { idApartamento } = req.body;
    const query = 'INSERT INTO Boxes (id_apartamento) VALUES (?)';
    const params = [idApartamento];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar box.'});
        }
        res.json({ success: true, message: 'Box cadastrado com sucesso!'});
    });
}

export function listarBoxes(req, res) {
    const query = 'SELECT * FROM Boxes B JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento';
    _query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar os boxes.'});
        }
        res.json({ success: true, message: 'Boxes selecionados com sucesso!', data: results});
    });
}

export function selecionarBoxPorId(req, res) {
    const query = 'SELECT * FROM Boxes B JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento WHERE id_box = ?';
    const params = [req.params.idBox];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar box.' });
        }
        res.json({ success: true, data: results });
    });
}

export function listarBoxesPorApartamento(req, res) {
    const query = 'SELECT * FROM Boxes B JOIN Apartamentos A ON B.id_apartamento = A.id_apartamento WHERE id_apartamento = ?';
    const params = [req.params.idApartamento];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar boxes.' });
        }
        res.json({ success: true, data: results });
    });
}

export function atualizarBox(req, res) {
    const { idApartamento } = req.body;
    const { idBox } = req.params;
    const query = 'UPDATE Boxes SET id_apartamento = ? WHERE id_box = ?';
    const params = [idApartamento, idBox];

    _query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar o box.'});
        }
        res.json({ success: true, message: 'Box atualizado com sucesso!'});
    });
}

export function deletarBox(req, res) {
    const query = 'DELETE FROM Boxes WHERE id_box = ?';
    const params = [req.params.idBox];

    _query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar o box.'});
        }
        res.json({ success: true, message: 'Box deletado com sucesso!'});
    });
}