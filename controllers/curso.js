const { response, request } = require("express");
const bcrypt = require("bcryptjs");
//Importación del modelo
const Curso = require("../models/curso");

const getCurso = async (req = request, res = response) => {
  //condiciones del get
  const query = { estado: true };

  const listaCursos = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre"),
  ]);

  res.json({
    msg: "get Api - Controlador Curso",
    listaCursos,
  });
};

const getCursoPorID = async (req = request, res = response) => {
  const _id = req.usuario.id;
  const query = { estado: true, usuario: _id };

  const listaCurso = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre",),
  ]);

  res.json({
    msg: "get Api - Controlador Usuario",
    listaCurso,
  });
};

const getCursoAlumnos = async (req = request, res = response) => {
  const _id = req.usuario.id;
  const query = { estado: true, alumnos: _id };

  const listaCurso = await Promise.all([
    Curso.countDocuments(query),
    Curso.find(query).populate("usuario", "nombre",),
  ]);

  res.json({
    msg: "get Api - Controlador Usuario",
    listaCurso,
  });
};


const postCurso = async (req = request, res = response) => {
  const curso = req.body.curso.toUpperCase();

  const cursoDB = await Curso.findOne({ curso });

  if (cursoDB) {
    return res.status(400).json({
      msg: `El curso ${cursoDB.curso}, ya existe.`,
    });
  }

  //Generar la data a guardar
  const data = {
    curso,
    usuario: req.usuario._id,
  };

  const curse = new Curso(data);

  await curse.save();

  res.status(201).json(curse);
};

const cursoYaExiste = async (req = request, res = response) => {
  const cursoDB = await Curso.findOne({ curso });

  if (cursoDB) {
    return res.status(400).json({
      msg: `El curso ${cursoDB.curso}, ya existe.`,
    });
  }
};

const putCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...resto } = req.body;

  resto.curso = resto.curso.toUpperCase();
  resto.usuario = req.usuario._id;

  const cursoEditado = await Curso.findByIdAndUpdate(id, resto, { new: true });

  res.status(201).json(cursoEditado);
};

const putAgregarCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, usuario, ...resto } = req.body;

  const cursoAgregado = await Curso.findByIdAndUpdate(
    id,
    { $push: { alumnos: req.usuario.id } },
    { new: true }
  );

  res.status(201).json(cursoAgregado);
};

const deleteCurso = async (req = request, res = response) => {
  //Req.params sirve para traer parametros de las rutas
  const { id } = req.params;

  const cursoEliminado = await Curso.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: "DELETE eliminar user",
    cursoEliminado,
  });
};

module.exports = {
  getCurso,
  getCursoPorID,
  getCursoAlumnos,
  postCurso,
  putCurso,
  putAgregarCurso,
  deleteCurso,
  cursoYaExiste,
 
};
