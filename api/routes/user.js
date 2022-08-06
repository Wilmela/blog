import express from 'express';
import { update , deleteUser, getOne} from '../controllers/user.js';


const router = express.Router();

router.put('/:id', update);
router.delete('/:id', deleteUser);
router.get('/:id', getOne);


export default router;