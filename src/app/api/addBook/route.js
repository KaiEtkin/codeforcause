import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { name, desc,file } = await request.json()
  const testRef = firebaseAdmin.firestore().collection('books').doc(name);
  let doc = await testRef.get();
  if (doc && doc.exists) {
    return new Response('Book already exists');
  }
  else {
    await testRef.set({
      name: name,
      description: desc,
      file: file,
    });
    return new Response('It worked');
  }

}