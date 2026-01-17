'use client';

import * as React from 'react';

import { useIsMobile } from '@/hooks/use-mobile';

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;
}
