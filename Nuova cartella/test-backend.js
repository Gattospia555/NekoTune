import youtubedl from 'youtube-dl-exec';

async function test() {
  try {
    const url = await youtubedl('https://www.youtube.com/watch?v=bSnlKl_PoQU', {
      getUrl: true,
      format: 'bestaudio'
    });
    console.log('Stream URL:', url.substring(0, 100) + '...');
  } catch(e) {
    console.error('FAIL:', e.message);
  }
}
test();
