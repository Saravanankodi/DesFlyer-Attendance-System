import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

export const createEmployee = onCall(async (request) => {
  try {
    const data = request.data;
    const auth = request.auth;

    // 🔐 Check login
    if (!auth) {
      throw new HttpsError("unauthenticated", "You must be logged in");
    }

    const { email, password, employeeId, name, position, notes } = data;

    // 🔒 Check admin role
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(auth.uid)
      .get();

    if (userDoc.data()?.role !== "admin") {
      throw new HttpsError(
        "permission-denied",
        "Only admins can create employees"
      );
    }

    // 👤 Create user
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // 🗄️ Save to Firestore
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      employeeId,
      name,
      position,
      notes: notes || "",
      email,
      role: "employee",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };

  } catch (error: any) {
    throw new HttpsError("internal", error.message);
  }
});