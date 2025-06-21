'use client'

import { useEffect, useRef } from 'react'
import { isBrowser } from '@/utils/utils'

type UseEventListenerProps<T extends Event = Event> = {
  event: string;
  callback: (event: T) => void;
  element?: EventTarget | null;
};

const useEventListener = <T extends Event = Event>({
  event,
  callback,
  element
}: UseEventListenerProps<T>) => {
  const listenerRef = useRef(callback);

  useEffect(() => {
    listenerRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isBrowser()) return
    if (typeof window === 'undefined') return;
    const eventListener = (ev: Event) => {
      listenerRef.current(ev as T);
    };

    const target = element ?? window;
    target.addEventListener(event, eventListener);

    return () => target.removeEventListener(event, eventListener);
  }, [element, event]);
};

export default useEventListener;