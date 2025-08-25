import { useState, useEffect } from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface StrapiResponse<T> {
  data: T[] | null;
  meta: { pagination: StrapiPagination } | null;
  loading: boolean;
  error: string | null;
}

export function useStrapiData<T>(
  endpoint: string,
  locale: string,
  query: string = "",
  page: number = 1,
  pageSize: number = 10,
): StrapiResponse<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [meta, setMeta] = useState<{ pagination: StrapiPagination } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/${endpoint}?locale=${locale}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setData(json.data || []);
        setMeta(json.meta || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, locale, page, pageSize, query]);

  return { data, meta, loading, error };
}
