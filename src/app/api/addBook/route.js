import { firebaseAdmin } from '../../../firebaseAdmin';
export async function POST(request) {
  const { id,name, desc,file } = await request.json()
  const testRef = firebaseAdmin.firestore().collection('books').doc(id).set({
    name: name,
      description: desc,
      file: file,
      id:id,
  });
  
    return new Response('It worked');
  

}