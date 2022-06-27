const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authorizeItem');

module.exports = Router()
  .delete('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id, req.body);
      res.json(item);    
    } catch (e) {
      next(e);    
    }
  })
  .put('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);  
    } catch (e) {
      next(e);  
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);    
    } catch (e) {
      next(e);    
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Item.getAll(req.user.id);
      res.json(data);  
    } catch (e) {
      next(e);  
    }
  });

// TO DO - implement items CRUD
