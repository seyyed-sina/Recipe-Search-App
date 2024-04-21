import { useState, useEffect } from 'react'

/**
 * Custom hook to debounce a value.
 *
 * @param value The value to debounce.
 * @param delay Delay in milliseconds until the debounced value is updated.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Update debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function to cancel the timeout if the value or delay changes
    // or the component using the hook unmounts. This helps in avoiding
    // unnecessary executions and potential memory leaks.
    return () => {
      clearTimeout(handler)
    }
    // Dependencies array: Effect reruns if value or delay changes.
  }, [value, delay])

  // Return the debounced value
  return debouncedValue
}
export default useDebounce
