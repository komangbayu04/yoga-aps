import { useQuery } from '@tanstack/react-query';
import { getPrograms } from '../lib/api';
import { queryKeys } from '../constants/queryKeys';

export function usePrograms() {
  return useQuery({ queryKey: queryKeys.programs, queryFn: getPrograms });
}
