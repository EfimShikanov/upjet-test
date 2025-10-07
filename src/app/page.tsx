import { HomePage } from '@/views/home';
import { SearchParams } from 'nuqs/server';

interface PageProps {
  searchParams?: Promise<SearchParams>;
}

export default async function Home({ searchParams }: PageProps) {
  return <HomePage searchParams={searchParams} />;
}
