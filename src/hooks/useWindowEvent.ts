import { useEffect } from 'react';

function useWindowEvent<EventType extends keyof WindowEventMap>(
  eventType: EventType,
  callback: (event: WindowEventMap[EventType]) => void,
  dependencies: unknown[],
) {
  useEffect(() => {
    window.addEventListener(eventType, callback);

    return () => {
      window.removeEventListener(eventType, callback);
    };
  }, [eventType, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
}

export default useWindowEvent;
