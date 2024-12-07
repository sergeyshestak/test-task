import { z } from 'zod';

import { vacancyService } from 'resources/vacancy';

import { validateMiddleware } from 'middlewares';
import { stringUtil } from 'utils';

import { paginationSchema } from 'schemas';
import { AppKoaContext, AppRouter, NestedKeys, Vacancy } from 'types';

const schema = paginationSchema.extend({
  filter: z
    .object({
      createdOn: z
        .object({
          startDate: z.coerce.date().optional(),
          endDate: z.coerce.date().optional(),
        })
        .optional(),
    })
    .optional(),
  sort: z
    .object({
      createdOn: z.enum(['asc', 'desc']).default('asc'),
    })
    .default({}),
});

type ValidatedData = z.infer<typeof schema>;

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { perPage, page, sort, searchValue, filter } = ctx.validatedData;

  const filterOptions = [];

  if (searchValue) {
    const searchPattern = stringUtil.escapeRegExpString(searchValue);

    const searchFields: NestedKeys<Vacancy>[] = ['vacancy', 'company', 'status'];

    filterOptions.push({
      $or: searchFields.map((field) => ({ [field]: { $regex: searchPattern } })),
    });
  }

  if (filter) {
    const { createdOn, ...otherFilters } = filter;

    if (createdOn) {
      const { startDate, endDate } = createdOn;

      filterOptions.push({
        createdOn: {
          ...(startDate && { $gte: startDate }),
          ...(endDate && { $lt: endDate }),
        },
      });
    }

    Object.entries(otherFilters).forEach(([key, value]) => {
      filterOptions.push({ [key]: value });
    });
  }

  const result = await vacancyService.find(
    { userId: user._id, ...(filterOptions.length && { $and: filterOptions }) },
    { page, perPage },
    { sort },
  );

  ctx.body = { ...result, results: result.results };
}

export default (router: AppRouter) => {
  router.get('/', validateMiddleware(schema), handler);
};
