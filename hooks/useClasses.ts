import { useQuery } from '@tanstack/react-query';
import { getClasses, getRecommendedClasses, getClassById } from '../lib/api';
import { queryKeys } from '../constants/queryKeys';

export function useClasses() {
  return useQuery({ queryKey: queryKeys.classes, queryFn: getClasses });
}

export function useRecommendedClasses() {
  return useQuery({ queryKey: queryKeys.recommended, queryFn: getRecommendedClasses });
}

export function useClassById(id: string) {
  return useQuery({ queryKey: queryKeys.classById(id), queryFn: () => getClassById(id) });
}
