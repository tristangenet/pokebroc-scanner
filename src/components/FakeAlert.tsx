interface FakeAlertProps {
  message: string;
}

export default function FakeAlert({ message }: FakeAlertProps) {
  return (
    <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4">
      {message}
    </div>
  );
}
