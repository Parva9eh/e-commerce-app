'use client';

import { PageContainer } from './page-container.styles';

export default function PageContainerWrapper({ children }: { children: React.ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}