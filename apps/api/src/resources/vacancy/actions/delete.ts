import { vacancyService } from 'resources/vacancy';

import { AppKoaContext, AppRouter, Next } from 'types';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  };
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isVacancyExists = await vacancyService.exists({ _id: ctx.request.params.id });

  ctx.assertError(isVacancyExists, 'Vacancy not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  await vacancyService.deleteOne({ _id: ctx.request.params.id });

  ctx.status = 204;
}

export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};
