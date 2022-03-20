const router = require('express').Router();
const res = require('express/lib/response');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [{ model: Product }],
  })
    .then((results) => {
      // respond with all results from findall
      res.json(results);
    })
    // catch err
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // find category where id = user submitted id
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((results) => {
      // if there's no match, set status to 404 and inform user there is no match with that ID
      if (!results) {
        res.status(404).json({
          message: `No category with ${req.params.id} found. Please try again with different ID.`,
        });
        return;
      }
      // else, respond with results
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    // create new category with category name from req.body
    category_name: req.body.category_name,
  })
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((results) => {
      // if there are no results, set status to 404 and inform user that ID is not found
      if (!results) {
        res.status(404).json({
          message: `No category with Id ${req.params.id} found. Please try again with different ID.`,
        });
        return;
      }
      // else, respond with the results
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((results) => {
      // if there are no results, set status to 404 and inform user that ID is not found
      if (!results) {
        res.status(404).json({
          message: `No category with Id ${req.params.id} found. Please try again with different ID.`,
        });
        return;
      }
      // else, respond with results
      res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
