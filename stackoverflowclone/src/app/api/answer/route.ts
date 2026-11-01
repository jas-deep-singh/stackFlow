import { NextRequest, NextResponse } from "next/server";
import { databases, users } from "../../../models/server/config";
import { ID } from "node-appwrite";
import { answerCollection, db } from "../../../models/name";
import { userPrefs } from "../../../store/Auth";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      },
    );
    const prefs = await users.getPrefs<userPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });
    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: unknown) {
    const apiError = error as {
      message?: string;
      status?: number;
      code?: number;
    } | null;
    return NextResponse.json(
      {
        error: apiError?.message || "Error creating answer",
      },
      {
        status: apiError?.status || apiError?.code || 500,
      },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { answerId } = await request.json();
    const answer = await databases.getDocument(db, answerCollection, answerId);
    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId,
    );
    const prefs = await users.getPrefs<userPrefs>(answer.authorId);
    await users.updatePrefs(answer.authorId, {
      reputation: Number(prefs.reputation) - 1,
    });
    return NextResponse.json(
      {
        data: response,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const apiError = error as {
      message?: string;
      status?: number;
      code?: number;
    } | null;
    return NextResponse.json(
      {
        message: apiError?.message || "Error deleting answer",
      },
      {
        status: apiError?.status || apiError?.code || 500,
      },
    );
  }
}
