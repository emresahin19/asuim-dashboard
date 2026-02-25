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
  const perPage = parseInt(searchParams.get('perPage') || '10');
  const search = searchParams.get('search') || ''; // Genel arama
  const role = searchParams.get('role'); // Özel filtre
  const orderBy = searchParams.get('orderBy') || 'id';
  const orderDirection = searchParams.get('orderDirection') || 'ASC';

  try {
    let filteredUsers = [...MOCK_USERS];

    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.fullName.toLowerCase().includes(lowerSearch) ||
          user.email.toLowerCase().includes(lowerSearch)
      );
    }

    if (role && role !== '') {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
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