import { Request, Response } from "express";
import { QueryResult } from "pg";
// pool es la conexion a db tmb se puede llamar db en vez de pool
// en consola poner npm run dev (para iniciar el servidor?)
import { pool } from "../database";

export const getBooks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query("SELECT * from books");
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

// trae solo los libros que tienen state = true (aptos para venta)
export const getAvailableBooksWithAuthorName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT books.description, books.id_author, books.id_category, books.id_editorial, books.quantity, books.state, books.year, books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

// trae todo los libros sin importar su state = true o false
export const getBooksWithAuthorName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "SELECT books.description, books.id_author, books.id_category, books.id_editorial, books.quantity, books.state, books.year, books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

// trae solo los libros con state = true (aptos para venta)
export const filterAvailableBooksByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.name) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el libro",
    });
  }

  try {
    const response: QueryResult = await pool.query(
      `SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true AND books.name iLIKE '%${req.params.name}%'`
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Error, no se pudo filtrar el libro por el nombre");
  }
};

// trae todos los libros filtrados por nombre sin importar su state
export const filterBooksByName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.name) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el libro",
    });
  }

  try {
    const response: QueryResult = await pool.query(
      `SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.name iLIKE '%${req.params.name}%'`
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Error, no se pudo filtrar el libro por el nombre");
  }
};

export const filterAvailableBooksByAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.name) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el autor",
    });
  }

  try {
    const response: QueryResult = await pool.query(
      `SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.state = true AND authors.name iLIKE '%${req.params.name}%'`
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Error, no se pudo filtrar el libro por nombre de autor");
  }
};

export const filterBooksByAuthor = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.name) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el nombre para buscar el autor",
    });
  }

  try {
    const response: QueryResult = await pool.query(
      `SELECT books.id_book, books.name, books.price, books.url_image, authors.name AS Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE authors.name iLIKE '%${req.params.name}%'`
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Error, no se pudo filtrar el libro por nombre de autor");
  }
};

export const getBookByID = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      "SELECT * FROM books WHERE id_book = $1",
      [id]
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Error, no se puede obtener el libro");
  }
};

export const getOneBookWithAuthorName = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query(
      "SELECT books.id_book, books.name, books.year, books.id_category, books.id_editorial, books.description, books.quantity, books.price, books.url_image, books.state, authors.name as Autor FROM books INNER JOIN authors ON books.id_author = authors.id_author WHERE books.id_book = $1",
      [id]
    );
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("Error, no se puede obtener el libro con nombre de autor");
  }
};

// trae toda la data de book mas nombre de autor, nombre de editorial y nombre de categoria
export const getRealDataBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.params.id) {
    return res.status(400).send({
      message: "FALTA CONTENIDO EN EL CUERPO, falta el id de libro",
    });
  }

  try {
    const id = parseInt(req.params.id);
    const a =
      "SELECT books.id_book, books.id_author, books.id_editorial, books.id_category, books.name, books.year, books.description, books.quantity, books.price, books.url_image, books.state,";
    const b =
      ' authors.name AS "autor", categories.name AS "category", editorials.name AS "editorial"';
    const c = " FROM books INNER JOIN authors";
    const d = " ON authors.id_author = books.id_author INNER JOIN categories";
    const e =
      " ON categories.id_category = books.id_category INNER JOIN editorials";
    const f = " ON editorials.id_editorial = books.id_editorial";
    const query = a + b + c + d + e + f + " WHERE id_book = $1";
    const response: QueryResult = await pool.query(query, [id]);
    return res.json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Error, no se puede obtener el libro");
  }
};

export const existBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  console.log(
    "Nombre de el libro para evaluar si existe el libro: " +
      req.params.name +
      " idAuthor: " +
      req.params.id_author
  );

  if (!req.params.name || !req.params.id_author) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el nombre o id para buscar el libro",
    });
  }

  try {
    const idAut = parseInt(req.params.id_author);
    // iLIKE no distingue mayusculas y minusculas ej: "auto", "Auto" para iLIKE es la misma palabra.
    const response: QueryResult = await pool.query(
      `SELECT * FROM books WHERE books.name iLIKE '${req.params.name}' AND books.id_author = $1`,
      [idAut]
    );
    if (res.json(response.rowCount > 0)) {
      // si existe el nombre del libro e id de autor, en Angular devuelve true
      return res.status(200);
    } else {
      // devuelve false
      return res.status(400);
    }
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error al buscar el libro por nombre e id de autor");
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // recibo los datos (de un form, insomnia rest, etc..)
  const {
    name,
    year,
    id_author,
    id_category,
    id_editorial,
    description,
    quantity,
    price,
    url_image,
    state,
  } = req.body;
  console.log(
    name,
    year,
    id_author,
    id_category,
    id_editorial,
    description,
    quantity,
    price,
    url_image,
    state
  );
  // el id_book en la db es autonumerico no hace falta
  let book_year = parseInt(year);
  let id_aut = parseInt(id_author);
  let id_cat = parseInt(id_category);
  let id_edi = parseInt(id_editorial);
  let cantidad = parseInt(quantity);
  let precio = parseInt(price);
  // let url_img = (req as any).file.path; //?
  // console.log('url imagen en server: ' + url_img)
  // let idBook = parseInt(id_book);
  // insert en PostgreSQL
  const response: QueryResult = await pool.query(
    "INSERT INTO books (name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      name,
      book_year,
      id_aut,
      id_cat,
      id_edi,
      description,
      cantidad,
      precio,
      url_image,
      state,
    ]
  );
  // const response: QueryResult = await pool.query('INSERT INTO books (name, year, id_author, id_category, id_editorial, description, quantity, price, url_image, state) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [name, book_year, id_aut, id_cat, id_edi, description, cantidad, precio, url_img, state]); // ?
  return res.json({
    message: "El libro ah sido creado exitosamente!",
    body: {
      books: {
        name,
      },
    },
  });
};

export const updateBook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  // recibo los datos (de un form, insomnia rest, etc..)
  const {
    name,
    year,
    id_author,
    id_category,
    id_editorial,
    description,
    quantity,
    price,
    url_image,
    state,
    id_book,
  } = req.body;
  let idBook = parseInt(id_book);
  let book_year = parseInt(year);
  let id_aut = parseInt(id_author);
  let id_cat = parseInt(id_category);
  let id_edit = parseInt(id_editorial);
  let cantidad = parseInt(quantity);
  // let precio = parseInt(price);
  let precio = price;

  console.log(
    name,
    book_year,
    id_aut,
    id_cat,
    id_edit,
    description,
    cantidad,
    precio,
    url_image,
    state
  );

  // consulta a PostgreSQL
  await pool.query(
    "UPDATE books set name = $1, year = $2, id_author = $3, id_category = $4, id_editorial = $5, description = $6, quantity = $7, price = $8, url_image = $9, state = $10 WHERE id_book = $11",
    [
      name,
      book_year,
      id_aut,
      id_cat,
      id_edit,
      description,
      cantidad,
      precio,
      url_image,
      state,
      idBook,
    ]
  );
  return res.json({
    message: "El libro ah sido actualizado exitosamente!",
    body: {
      books: {
        name,
      },
    },
  });
};

export const bajaBook = async (req: Request, res: Response): Promise<Response> => {
  if (!req.params.id) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el id de book",
    });
  }
   try {
   const idBook = parseInt(req.params.id);
    await pool.query('UPDATE public.books SET state = false WHERE id_book = $1', [idBook]);
    return res.status(200).json(`El libro con id ${req.params.id} fue dado de baja exitosamente!`);  
    //return res.json(`El libro con id ${req.params.id} fue dado de baja exitosamente!`);  
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error al intentar dar de baja el libro");
  }
}

export const altaBook = async (req: Request, res: Response): Promise<Response> => {
  if (!req.params.id) {
    return res.status(400).send({
      message:
        "FALTA CONTENIDO EN EL CUERPO, falta el id de book",
    });
  }
   try {
   const idBook = parseInt(req.params.id);
    await pool.query('UPDATE public.books SET state = true WHERE id_book = $1', [idBook]);
    return res.status(200).json(`El libro con id ${req.params.id} fue dado de alta exitosamente!`);  
    //return res.json(`El libro con id ${req.params.id} fue dado de baja exitosamente!`);  
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json("error al intentar dar de alta el libro");
  }

}

// NO FUNCIONA
export const getTotalBooks = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query(
      "select count(id_book) as total from books"
    );
    return res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json("Internal server error");
  }
};

// export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
//    // console.log(req.params.username);
//    // consulta a PostgreSQL
//    await pool.query('DELETE FROM books WHERE id_book = $1', [req.params.id]);
//    return res.json(`El libro con id ${req.params.id} ah sido eliminado exitosamente!`);
// }
