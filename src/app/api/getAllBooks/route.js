import { firebaseAdmin } from '../../../firebaseAdmin';
export async function GET() {
  const testRef = firebaseAdmin.firestore().collection('books');
  let doc = await testRef.get();
  if (doc.empty) {
    return new Response("fail");
  }
  else {
    let books = [];
          doc.forEach(doc => {
            console.log(doc.id)
            books.push({id: doc.id, data: doc.data()})
          });
    return new Response(JSON.stringify(books));
  }

}