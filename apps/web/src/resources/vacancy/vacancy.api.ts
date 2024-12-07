import { DateValue } from '@mantine/dates';
import { useMutation, useQuery } from '@tanstack/react-query';

import { apiService } from 'services';

import queryClient from 'query-client';

import { ApiError, ListParams, ListResult, SortOrder, Vacancy, VacancyCreate, VacancyUpdate } from 'types';

export type VacanciesListFilterParams = {
  createdOn?: {
    startDate: DateValue;
    endDate: DateValue;
  };
};

export type VacanciesListSortParams = {
  createdOn?: SortOrder;
};

export type VacanciesListParams = ListParams<VacanciesListFilterParams, VacanciesListSortParams>;

export const useList = <T extends VacanciesListParams>(params: T) =>
  useQuery<ListResult<Vacancy>>({
    queryKey: ['vacancies', params],
    queryFn: () => apiService.get('/vacancies', params),
  });

export const useCreate = <T extends VacancyCreate>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.post('/vacancies', data),
    onSuccess: () => queryClient.removeQueries({ queryKey: ['vacancies'] }),
  });

export const useUpdate = <T extends VacancyUpdate>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.put(`/vacancies/${data.id}`, data),
    onSuccess: () => queryClient.removeQueries({ queryKey: ['vacancies'] }),
  });

export const useDelete = <T extends { _id: string }>() =>
  useMutation<null, ApiError, T>({
    mutationFn: (data: T) => apiService.delete(`/vacancies/${data._id}`),
    onSuccess: () => queryClient.removeQueries({ queryKey: ['vacancies'] }),
  });
