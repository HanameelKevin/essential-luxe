import { createNextAuthHandler } from 'next-auth';
import { authOptions } from '@/lib/auth';

// The handler is created once outside the request scope for optimization
const handler = createNextAuthHandler(authOptions);

export { handler as GET, handler as POST };
