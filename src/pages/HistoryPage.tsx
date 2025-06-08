import Navbar from '../components/Navbar';

export default function HistoryPage() {
  return (
    <div>
      <Navbar />
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold mb-4">Historique des scans</h1>
        <p>(Aucun historique pour le moment)</p>
      </div>
    </div>
  );
}
