type LoadingProps = {
  message?: string;
};

export default function Loading({ message = "" }: LoadingProps) {
  return <div>{message ?? "Loading..."}</div>;
}
