import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

interface UseCountUpOptions {
  duration?: number;
  start?: boolean;
}

export function useCountUp(target: number, { duration = 1.6, start = true }: UseCountUpOptions = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [target, duration, start]);

  return value;
}
