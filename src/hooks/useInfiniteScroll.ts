import { useCallback, useEffect, useRef } from 'react';

import useWindowEvent from './useWindowEvent';

function useInfiniteScroll<ListElement extends Element>(
  options: {
    onRequestNextPage: () => void;
    thresholdInPixels: number;
  },
  dependencies: unknown[],
) {
  const { onRequestNextPage, thresholdInPixels } = options;

  const listRef = useRef<ListElement | null>(null);

  const requestNextPageIfNecessary = useCallback(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const shouldRequestNextPage =
      list.clientHeight > 0 &&
      list.scrollHeight > 0 &&
      list.clientHeight + list.scrollTop >= list.scrollHeight - thresholdInPixels;

    if (shouldRequestNextPage) {
      onRequestNextPage();
    }
  }, [thresholdInPixels, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    requestNextPageIfNecessary();
  }, [requestNextPageIfNecessary]);

  useWindowEvent(
    'resize',
    () => {
      requestNextPageIfNecessary();
    },
    [requestNextPageIfNecessary],
  );

  return {
    ref: listRef,
    onScroll: requestNextPageIfNecessary,
  };
}

export default useInfiniteScroll;
