import { vacancyService } from 'resources/vacancy';

import { validateMiddleware } from 'middlewares';

import { vacancyUpdateSchema } from 'schemas';
import { AppKoaContext, AppRouter, Next, VacancyUpdate } from 'types';

type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<VacancyUpdate, Request>, next: Next) {
  const isVacancyExists = await vacancyService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isVacancyExists, 'Vacancy not found');

  await next();
}

async function handler(ctx: AppKoaContext<VacancyUpdate, Request>) {
  const { vacancy, company, notes, salary, status } = ctx.validatedData;

  await vacancyService.updateOne({ _id: ctx.request.params?.id }, () => ({
    vacancy,
    company,
    notes,
    salary,
    status,
  }));

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(vacancyUpdateSchema), handler);
};
