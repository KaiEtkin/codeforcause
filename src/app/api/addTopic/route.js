import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { name, videos} = await request.json()
  const testRef = firebaseAdmin.firestore().collection('topics').add({
    name: name,
    videos: videos
  });
  
    return new Response('It worked');
  

}