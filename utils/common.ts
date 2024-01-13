function generateUniqueHash(originalUrl: string) {
    const timestamp = Date.now().toString(36); 
    const randomNum = Math.floor(Math.random() * 1000000); 
    const urlFragment = originalUrl.slice(-4);
  
    const base_hash = Buffer.from(timestamp + randomNum + urlFragment).toString('base64');
    const hash = base_hash.slice(base_hash.length / 4,base_hash.length/2)
    return hash;
  }