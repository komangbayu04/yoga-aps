export const queryKeys = {
  classes: ['classes'] as const,
  classById: (id: string) => ['classes', id] as const,
  recommended: ['classes', 'recommended'] as const,
  programs: ['programs'] as const,
  recommendedPrograms: ['programs', 'recommended'] as const,
  programDetail: (id: string) => ['programs', id] as const,
};
