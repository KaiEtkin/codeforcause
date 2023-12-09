import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { name, videos} = await request.json()
  const testRef = firebaseAdmin.firestore().collection('topics').doc(name);
  let doc = await testRef.get();
  if (doc && doc.exists) {
    return new Response('Topic already exists');
  }
  else {
    await testRef.set({
      name: name,
      videos: videos
    });
    return new Response('It worked');
  }

}