// backend/src/routers/gemini.routes.js
import { Router } from 'express';
import { chatWithGemini, clearConversation } from '../controllers/gemini.controller.js';

const router = Router();

router.route('/chat').post(chatWithGemini);
router.route('/clear').post(clearConversation);

export default router;