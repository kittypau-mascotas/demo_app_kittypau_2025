import Header from '../Header';
import { AuthProvider } from '@/contexts/AuthContext';

export default function HeaderExample() {
  return (
    <AuthProvider>
      <Header onMenuToggle={() => console.log('Menu toggled')} />
    </AuthProvider>
  );
}
