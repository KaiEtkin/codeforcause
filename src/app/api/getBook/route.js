import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { name} = await request.json()
  const testRef = firebaseAdmin.firestore().collection('books').doc(name);
  let doc = await testRef.get();
  if (doc && doc.exists) {
    return new Response(doc.data());
  }
  else {
    
    return new Response('It failed');
  }

}