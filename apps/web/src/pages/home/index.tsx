import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Stack, Title } from '@mantine/core';
import { useDisclosure, useSetState } from '@mantine/hooks';
import { SortDirection } from '@tanstack/react-table';
import { pick } from 'lodash';

import { VacanciesListParams, vacancyApi } from 'resources/vacancy';

import { Table } from 'components';

import { Vacancy, VacancyCreate, VacancyUpdate } from 'types';

import CreateModal from './components/CreateModal';
import Filters from './components/Filters';
import UpdateModal from './components/UpdateModal';
import { COLUMNS, DEFAULT_PAGE, DEFAULT_PARAMS, EXTERNAL_SORT_FIELDS, PER_PAGE } from './constants';

const Home: NextPage = () => {
  const [editedVacancy, setEditedVacancy] = useState<Vacancy>();
  const [openedCreateModal, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [openedUpdateModal, { open: openUpdateModal, close: closeUpdateModal }] = useDisclosure(false);
  const [params, setParams] = useSetState<VacanciesListParams>(DEFAULT_PARAMS);

  const { data: vacancies, isLoading: isUserLostLoading } = vacancyApi.useList(params);
  const { mutate: createVacancy } = vacancyApi.useCreate();
  const { mutate: deleteVacancy } = vacancyApi.useDelete();
  const { mutate: updateVacancy } = vacancyApi.useUpdate();

  const onSortingChange = (sort: Record<string, SortDirection>) => {
    setParams((prev) => {
      const combinedSort = { ...pick(prev.sort, EXTERNAL_SORT_FIELDS), ...sort };

      return { sort: combinedSort };
    });
  };

  const onRowClick = () => {};

  const onEdit = <T extends Vacancy>(vacancy: T) => {
    setEditedVacancy(vacancy);
    openUpdateModal();
  };

  const onCreate = (vacancy: VacancyCreate) => {
    createVacancy(vacancy, { onSuccess: closeCreateModal });
  };

  const onDelete = <T extends Vacancy>(vacancy: T) => {
    deleteVacancy({ _id: vacancy._id });
  };

  const onUpdate = (vacancy: VacancyUpdate) => {
    updateVacancy(vacancy, { onSuccess: closeUpdateModal });
  };

  return (
    <>
      <Head>
        <title>Vacancies</title>
      </Head>

      <Stack gap="lg">
        <Title order={2}>Vacancies</Title>
        <Filters setParams={setParams} openCreateModal={openCreateModal} />

        <Table<Vacancy>
          data={vacancies?.results}
          totalCount={vacancies?.count}
          pageCount={vacancies?.pagesCount}
          page={DEFAULT_PAGE}
          perPage={PER_PAGE}
          columns={COLUMNS}
          isLoading={isUserLostLoading}
          onPageChange={(page) => setParams({ page })}
          onSortingChange={onSortingChange}
          onRowClick={onRowClick}
          onDelete={onDelete}
          onEdit={onEdit}
        />
        <CreateModal opened={openedCreateModal} onClose={closeCreateModal} onSubmit={onCreate} />
        <UpdateModal
          opened={openedUpdateModal}
          onClose={closeUpdateModal}
          onSubmit={onUpdate}
          editedVacancy={editedVacancy}
        />
      </Stack>
    </>
  );
};

export default Home;
