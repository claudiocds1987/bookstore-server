import { Router } from 'express'
const router = Router();

// router.get('/test', (req, res) => res.send('hello world'))
import { createAuthor, filterAuthorsByName, updateAuthor, existAuthorByName,getAuthorById, getAuthors, getAuthorByName } from '../controllers/authors.controller'

router.post('/authors/create', createAuthor);
router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthorById);
router.get('/authors/exist/:name', existAuthorByName);
router.get('/authors/name/:name', getAuthorByName);
router.get('/authors/filter/:name', filterAuthorsByName);
router.put('/authors/update/:id', updateAuthor);

export default router;