import express from 'express';

const router = express.Router();

const moduleRoutes = [
  {
    path: '',
    routes: express.Router()
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
