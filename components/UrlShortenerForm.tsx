import { useState } from 'react';
import { shortenURL } from '@/service';

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
        const shortenedUrl = await shortenURL(originalUrl);
        setShortUrl(shortenedUrl);
    } catch (error: any) {
      console.error('Error shortening URL:', error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-lg font-semibold">Enter URL:</label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 focus:outline-none"
          >
            Shorten URL
          </button>
        </div>
      </form>

      {shortUrl && (
        <div className="mt-4">
          <p className="text-lg font-semibold">Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
