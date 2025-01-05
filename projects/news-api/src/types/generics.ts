type Nullable<T> = T | null;

type Callback<T> = (data: T) => void;

export { Nullable, Callback };
