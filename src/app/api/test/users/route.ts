import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/utils';

interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'pending' | 'banned';
  lastLogin: string;
}

interface UserListResponse {
  items: IUser[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}

const MOCK_USERS: IUser[] = Array.from({ length: 150 }).map((_, i) => ({
  id: i + 1,
  fullName: `Kullanıcı ${i + 1}`,
  email: `user${i + 1}@asuim.dev`,
  role: i % 3 === 0 ? 'admin' : i % 2 === 0 ? 'editor' : 'viewer',
  status: i % 5 === 0 ? 'banned' : i % 3 === 0 ? 'pending' : 'active',
  lastLogin: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
}));

const getUsers = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || searchParams.get('limit') || '10');
  const search = searchParams.get('search') || ''; // Genel arama
  const searchFieldsParam = searchParams.get('searchFields') || '';
  const role = searchParams.get('role'); // Özel filtre
  const status = searchParams.get('status');
  const idRange = searchParams.get('idRange') || '';
  const lastLoginRange = searchParams.get('lastLoginRange') || '';
  const orderBy = searchParams.get('orderBy') || searchParams.get('sortBy') || 'id';
  const orderDirectionRaw = searchParams.get('orderDirection') || searchParams.get('sortOrder') || 'ASC';
  const orderDirection = orderDirectionRaw.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  const allowedSearchFields: Array<keyof IUser> = ['id', 'fullName', 'email', 'role', 'status', 'lastLogin'];
  const searchFields = searchFieldsParam
    .split(',')
    .map((field) => field.trim())
    .filter((field): field is keyof IUser => allowedSearchFields.includes(field as keyof IUser));
  const effectiveSearchFields: Array<keyof IUser> = searchFields.length > 0 ? searchFields : ['fullName', 'email'];

  try {
    let filteredUsers = [...MOCK_USERS];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        effectiveSearchFields.some((field) => String(user[field]).toLowerCase().includes(lowerSearch))
      );
    }

    if (role && role !== '') {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (status && status !== '') {
      const statuses = status
        .split(',')
        .map((entry) => entry.trim())
        .filter(Boolean);

      if (statuses.length > 0) {
        filteredUsers = filteredUsers.filter((user) => statuses.includes(user.status));
      }
    }

    if (idRange.includes('..')) {
      const [minRaw, maxRaw] = idRange.split('..');
      const minCandidate = minRaw ? Number(minRaw) : undefined;
      const maxCandidate = maxRaw ? Number(maxRaw) : undefined;
      const min = minCandidate !== undefined && Number.isFinite(minCandidate) ? minCandidate : undefined;
      const max = maxCandidate !== undefined && Number.isFinite(maxCandidate) ? maxCandidate : undefined;

      filteredUsers = filteredUsers.filter((user) => {
        if (min !== undefined && user.id < min) return false;
        if (max !== undefined && user.id > max) return false;
        return true;
      });
    }

    if (lastLoginRange.includes('..')) {
      const [fromRaw, toRaw] = lastLoginRange.split('..');
      const from = fromRaw ? new Date(fromRaw).getTime() : undefined;
      const to = toRaw ? new Date(toRaw).getTime() : undefined;

      filteredUsers = filteredUsers.filter((user) => {
        const loginAt = new Date(user.lastLogin).getTime();
        if (from !== undefined && Number.isFinite(from) && loginAt < from) return false;
        if (to !== undefined && Number.isFinite(to) && loginAt > to) return false;
        return true;
      });
    }

    filteredUsers.sort((a: any, b: any) => {
      let valA = a[orderBy];
      let valB = b[orderBy];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return orderDirection === 'ASC' ? -1 : 1;
      if (valA > valB) return orderDirection === 'ASC' ? 1 : -1;
      return 0;
    });

    const total = filteredUsers.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const paginatedUsers = filteredUsers.slice(start, end);

    const response: UserListResponse = {
      items: paginatedUsers,
      meta: {
        total,
        page,
        perPage,
      },
    };

    return NextResponse.json(response);

  } catch (error) {
    throw error;
  }
};

export const GET = apiHandler(getUsers);