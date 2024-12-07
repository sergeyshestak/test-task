import { z } from 'zod';

import { vacancyCreateSchema, vacancySchema, vacancyUpdateSchema } from 'schemas';

export type Vacancy = z.infer<typeof vacancySchema>;
export type VacancyCreate = z.infer<typeof vacancyCreateSchema>;
export type VacancyUpdate = z.infer<typeof vacancyUpdateSchema>;
