import { useState } from 'react';

export function useExpanded() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return { expanded, handleExpand };
}
