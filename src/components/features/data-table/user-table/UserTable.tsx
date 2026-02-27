'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableColumn, TableState } from '@/components/ui/table';
import { IUser } from './user-table.types';
import styles from './user-table.module.scss';
import Eye from '@/components/ui/icon/icons/Eye';
import Trash2 from '@/components/ui/icon/icons/Trash2';
import { Icon } from '@/components/ui';

export const UserTable = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tableState, setTableState] = useState<TableState<IUser>>({
    page: 1,
    perPage: 10,
    orderBy: 'id',
    orderDirection: 'ASC',
    filters: {} as Record<keyof IUser, string>,
    total: 0,
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        page: String(tableState.page),
        perPage: String(tableState.perPage),
        orderBy: String(tableState.orderBy || 'id'),
        orderDirection: tableState.orderDirection || 'ASC',
        search: tableState.filters.fullName || '',
        role: tableState.filters.role || '',
      }

      const response = await fetch(`/api/test/users?${new URLSearchParams(params)}`);
      if (!response.ok) {
        throw new Error('Kullanıcılar yüklenemedi');
      }
      const data = await response.json();
      if (data) {
        setData(data.items);

        setTableState(prev => ({
          ...prev,
          total: data.meta.total
        }));
      }
    } catch (error) {
      console.error('Kullanıcılar yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  }, [
    tableState.page,
    tableState.perPage,
    tableState.orderBy,
    tableState.orderDirection,
    tableState.filters.fullName,
    tableState.filters.role
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns: TableColumn<IUser>[] = [
    {
      key: 'id',
      label: '#ID',
      sortable: true,
      type: 'number',
      filterable: false
    },
    {
      key: 'fullName',
      label: 'Ad Soyad',
      sortable: true,
      filterable: true,
      editable: false
    },
    {
      key: 'role',
      label: 'Rol',
      type: 'select',
      filterable: true,
      options: [
        { label: 'Yönetici', value: 'admin' },
        { label: 'Editör', value: 'editor' },
        { label: 'İzleyici', value: 'viewer' },
      ],
      render: (item) => <span style={{ fontWeight: 600 }}>{item.role.toUpperCase()}</span>
    },
    {
      key: 'status',
      label: 'Durum',
      render: (item) => (
        <span className={styles.statusBadge} data-status={item.status}>
          {item.status}
        </span>
      )
    },
    {
      key: 'lastLogin',
      label: 'Son Giriş',
      sortable: true,
      type: 'date',
      filterable: true,
      render: (item) => new Date(item.lastLogin).toLocaleDateString('tr-TR')
    }
  ];

  const handleEditSave = async (item: IUser) => {
    try {
      console.log('Update:', item);
      alert(`${item.fullName} güncellendi!`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Kullanıcı Yönetimi
      </h2>

      <Table<IUser>
        items={data}
        columns={columns}
        tableState={tableState}
        setTableState={setTableState}
        isLoading={isLoading}
        onEditSave={handleEditSave}
        renderActionButtons={(item) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={styles.actionBtn} title="Detay" aria-label={`${item.fullName} detaylarını görüntüle`}>
              <Icon
                icon={Eye}
                size={16}
                decorative
              />
            </button>
            <button className={styles.actionBtn} title="Sil" aria-label={`${item.fullName} kaydını sil`}>
              <Icon
                icon={Trash2}
                size={16}
                decorative
              />
            </button>
          </div>
        )}
      />
    </div>
  );
};