import { useQuery } from '@tanstack/react-query';
import { getPrograms, getRecommendedPrograms, getProgramDetail } from '../lib/api';
import { queryKeys } from '../constants/queryKeys';

export function usePrograms() {
  return useQuery({ queryKey: queryKeys.programs, queryFn: getPrograms });
}

export function useRecommendedPrograms() {
  return useQuery({ queryKey: queryKeys.recommendedPrograms, queryFn: getRecommendedPrograms });
}

export function useProgramDetail(id: string) {
  return useQuery({ queryKey: queryKeys.programDetail(id), queryFn: () => getProgramDetail(id), enabled: !!id });
}
