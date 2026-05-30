import { useQuery } from '@tanstack/react-query';
import { getPrograms, getRecommendedPrograms } from '../lib/api';
import { queryKeys } from '../constants/queryKeys';

export function usePrograms() {
  return useQuery({ queryKey: queryKeys.programs, queryFn: getPrograms });
}

export function useRecommendedPrograms() {
  return useQuery({ queryKey: queryKeys.recommendedPrograms, queryFn: getRecommendedPrograms });
}
