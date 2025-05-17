import { db } from "../db.js";

export const getBackup = (_, res) => {
  const q = "SELECT * FROM backup";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addBackup = (req, res) => {
  const q =
    "INSERT INTO backup(`data_registro`, `total_marketing`, `total_vendas`, `n_clientes`, `resultado_cac`) VALUES(?)";

  const values = [
    req.body.data_registro,
    req.body.total_marketing,
    req.body.total_vendas,
    req.body.n_clientes,
    req.body.resultado_cac,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("registro criado com sucesso.");
  });
};

export const deleteBackup = (req, res) => {
  const q = "DELETE FROM backup WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("registro deletado com sucesso.");
  });
};
