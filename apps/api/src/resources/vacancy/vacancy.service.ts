import db from 'db';

import { DATABASE_DOCUMENTS } from 'app-constants';
import { vacancySchema } from 'schemas';
import { Vacancy } from 'types';

const service = db.createService<Vacancy>(DATABASE_DOCUMENTS.VACANCIES, {
  schemaValidator: (obj) => vacancySchema.parseAsync(obj),
});

export default Object.assign(service, {});
