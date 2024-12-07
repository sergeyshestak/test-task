import { z } from 'zod';

import dbSchema from './db.schema';

export const vacancySchema = dbSchema.extend({
  _id: z.string(),
  company: z.string(),
  vacancy: z.string(),
  salary: z.string(),
  status: z.string(),
  notes: z.string().optional(),
  userId: z.string(),
});

export const vacancyUpdateSchema = vacancySchema
  .omit({
    createdOn: true,
    deletedOn: true,
    updatedOn: true,
    userId: true,
    _id: true,
  })
  .extend({ id: z.string() });

export const vacancyCreateSchema = vacancyUpdateSchema.omit({
  id: true,
});
