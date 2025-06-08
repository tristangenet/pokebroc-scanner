import { AuthenticityStatus } from '../utils/fakeDetector';

interface Props {
  status: AuthenticityStatus;
}

export default function AuthenticityIndicator({ status }: Props) {
  let text = '';
  let color = '';
  switch (status) {
    case 'authentic':
      text = '🟢 Authentique probable';
      color = 'bg-green-100 text-green-800';
      break;
    case 'suspect':
      text = '🔴 Suspect';
      color = 'bg-red-100 text-red-800';
      break;
    default:
      text = '🟡 Inconnu';
      color = 'bg-yellow-100 text-yellow-800';
  }
  return <div className={`p-3 rounded ${color}`}>{text}</div>;
}
