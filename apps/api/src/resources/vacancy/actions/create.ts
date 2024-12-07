import { validateMiddleware } from 'middlewares';

import { vacancyCreateSchema } from 'schemas';
import { AppKoaContext, AppRouter, VacancyCreate } from 'types';

import vacancyService from '../vacancy.service';

async function handler(ctx: AppKoaContext<VacancyCreate>) {
  const { user } = ctx.state;
  const { vacancy, company, notes, salary, status } = ctx.validatedData;

  await vacancyService.insertOne({
    vacancy,
    company,
    notes,
    salary,
    status,
    userId: user._id,
  });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.post('/', validateMiddleware(vacancyCreateSchema), handler);
};
