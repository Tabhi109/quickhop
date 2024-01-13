import { expandURL } from '@/service';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const HashPage = () => {
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const router = useRouter();
  const { hash } = router.query;

  useEffect(() => {
    const fetchUrl = async (hash: string) => {
      try {
        const original_link = await expandURL(hash);
        setOriginalUrl(original_link);
      } catch (error) {
        console.error('Error fetching original URL:', error);
        setOriginalUrl(null);
      }
    };

    if (hash) {
      fetchUrl(hash as string);
    }
  }, [hash]);

  if (originalUrl === null) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-lg mb-4">Thank you for using QUICKHOP</p>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-double"></div>
          <p className="mt-4 text-gray-600">Your site is loading...</p>
        </div>
      );
  }

  if (originalUrl) {
    window.location.replace(originalUrl);
    return null;
  }
};

export default HashPage;
