import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

const sendResponse = (res: functions.Response, staCode:number, body:any) => {
  res.send({
    staCode,
    body: JSON.stringify(body),
  });
};

export const addDataset = functions.https.onRequest( async (req:any, res:any)=>{
  if (req.method !== "POST") {
    sendResponse(res, 405, {error: "Invalid Request!"});
  } else {
    const dataset = req.body;
    for (const key of Object.keys(dataset)) {
      const data = dataset[key];
      await db.collection("questions").doc(key).set(data);
    }
    sendResponse(res, 200, {message: "successfully added dataset!"});
  }
});
