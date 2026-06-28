import Authentication from '@/routes/authentication/authentication.component';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Sign In',
  description: 'Sign in or create a Crown Clothing account.',
  path: '/auth',
});

export default function AuthPage() {
  return <Authentication />;
}