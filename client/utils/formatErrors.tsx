// Format errors of jsx
export const displayErrors = (errors: Record<string, string>[]) => {
  return (
    <ul className="list-disc list-inside text-red-600 space-y-2">
      {errors.map((err, index) =>
        Object.entries(err).map(([key, value]) => (
          <li key={`${key}-${index}`} className="text-sm">
            <strong className="font-medium">{key}:</strong> {value}
          </li>
        ))
      )}
    </ul>
  );
};

// utils/errorDisplay.tsx
export const formatErrorsForToast = (errors: Record<string, string>[]): string => {
  return errors
    .map((err) =>
      Object.entries(err)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    )
    .join('; ');
};
