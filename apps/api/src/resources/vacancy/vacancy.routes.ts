import { routeUtil } from 'utils';

import createVacancy from './actions/create';
import deleteVacancy from './actions/delete';
import list from './actions/list';
import updateVacancy from './actions/update';

const privateRoutes = routeUtil.getRoutes([list, createVacancy, deleteVacancy, updateVacancy]);

export default {
  privateRoutes,
};
