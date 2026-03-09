'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Table, TableColumn, TableState } from '@/components/ui/table';
import { IUser } from './user-table.types';
import styles from './user-table.module.scss';
import Eye from '@/components/ui/icon/icons/Eye';
import Trash2 from '@/components/ui/icon/icons/Trash2';
import { Icon } from '@/components/ui';
import { useToaster } from '@/context';

export const UserTable = () => {
  const toaster = useToaster();
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const [tableState, setTableState] = useState<TableState<IUser>>({
    page: 1,
    limit: 10,
    sortBy: 'id',
    sortOrder: 'asc',
    filters: {} as Record<keyof IUser, string>,
    globalSearch: '',
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const globalSearchFields: Array<keyof IUser> = ['fullName', 'email'];

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const params = {
        page: String(tableState.page),
        perPage: String(tableState.limit),
        orderBy: String(tableState.sortBy || 'id'),
        orderDirection: tableState.sortOrder === 'desc' ? 'DESC' : 'ASC',
        search: tableState.globalSearch || '',
        searchFields: globalSearchFields.join(','),
        role: tableState.filters.role || '',
        status: tableState.filters.status || '',
        idRange: tableState.filters.id || '',
        lastLoginRange: tableState.filters.lastLogin || '',
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
          total: data.meta.total,
          totalPages: Math.ceil(data.meta.total / tableState.limit),
          hasNextPage: tableState.page * tableState.limit < data.meta.total,
          hasPrevPage: tableState.page > 1,
        }));
      }
    } catch (error) {
      console.error('Kullanıcılar yüklenemedi:', error);
    } finally {
      setIsLoading(false);
    }
  }, [
    tableState.page,
    tableState.limit,
    tableState.sortBy,
    tableState.sortOrder,
    tableState.globalSearch,
    tableState.filters.id,
    tableState.filters.role,
    tableState.filters.status,
    tableState.filters.lastLogin,
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
      filterable: true,
      filterType: 'numberRange',
      filterPlaceholder: 'ID araligi'
    },
    {
      key: 'fullName',
      label: 'Ad Soyad',
      sortable: true,
      filterable: true,
      filterType: 'text',
      filterPlaceholder: 'Ad soyad ara',
      editable: false
    },
    {
      key: 'email',
      label: 'E-Posta',
      sortable: true,
      filterable: true,
      filterType: 'text',
      filterPlaceholder: 'E-posta ara',
    },
    {
      key: 'role',
      label: 'Rol',
      type: 'select',
      filterable: true,
      filterType: 'select',
      filterPlaceholder: 'Rol sec',
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
      type: 'select',
      filterable: true,
      filterType: 'multiSelect',
      filterPlaceholder: 'Durum sec (coklu)',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending', value: 'pending' },
        { label: 'Banned', value: 'banned' },
      ],
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
      filterType: 'dateRange',
      filterPlaceholder: 'Tarih araligi',
      render: (item) => new Date(item.lastLogin).toLocaleDateString('tr-TR')
    }
  ];

  const handleEditSave = async (item: IUser) => {
    try {
      console.log('Update:', item);
      toaster.success(`${item.fullName} guncellendi`, {
        title: 'Kayit guncellendi',
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
      toaster.danger('Guncelleme sirasinda hata olustu', {
        title: 'Islem basarisiz',
      });
    }
  };

  const handleView = (item: IUser) => {
    toaster.info(`${item.fullName} detay kartini satira tiklayarak acabilirsin`, {
      title: 'Detay goruntule',
    });
  };

  const handleDelete = (item: IUser) => {
    setData((prev) => prev.filter((entry) => entry.id !== item.id));
    setTableState((prev) => ({
      ...prev,
      total: Math.max(0, prev.total - 1),
    }));

    toaster.warning(`${item.fullName} listeden kaldirildi`, {
      title: 'Kayit silindi (demo)',
      variant: 'outline',
    });
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
        globalSearchFields={globalSearchFields}
        onSelectionChange={setSelectedUsers}
        onEditSave={handleEditSave}
        renderActionButtons={(item) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={styles.actionBtn}
              title="Detay"
              aria-label={`${item.fullName} detaylarini goruntule`}
              onClick={() => handleView(item)}
            >
              <Icon
                icon={Eye}
                size={16}
                decorative
              />
            </button>
            <button
              className={styles.actionBtn}
              title="Sil"
              aria-label={`${item.fullName} kaydini sil`}
              onClick={() => handleDelete(item)}
            >
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