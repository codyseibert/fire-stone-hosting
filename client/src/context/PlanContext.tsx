import React from 'react';

export type PlanType = {
  planId: string;
  memory: string;
};

export interface PlanContextInterface {
  plan: PlanType | undefined;
  setPlan: React.Dispatch<
    React.SetStateAction<PlanType | undefined>
  >;
}

export const PlanContext =
  React.createContext<PlanContextInterface | null>(null);
