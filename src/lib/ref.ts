export function useCombinedRefs<T>(...refs: (React.Ref<T> | null)[]): React.RefCallback<T> {
  return (element: T) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(element);
      } else if ('current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = element;
      }
    });
  };
}
