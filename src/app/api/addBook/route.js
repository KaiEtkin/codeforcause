import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { name, desc,file } = await request.json()
  const testRef = firebaseAdmin.firestore().collection('books').add({
    name: name,
      description: desc,
      file: file,
  });
  
    return new Response('It worked');
  

}