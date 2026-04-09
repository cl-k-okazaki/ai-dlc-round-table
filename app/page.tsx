import { revalidatePath } from "next/cache";
import { desc } from "drizzle-orm";
import { comments } from "@/src/schema";

export const dynamic = "force-dynamic";

async function getComments() {
  const { db } = await import("@/src/db");
  return db.select().from(comments).orderBy(desc(comments.createdAt));
}

export default async function Page() {
  const list = await getComments();

  async function create(formData: FormData) {
    "use server";
    const { db } = await import("@/src/db");
    const comment = formData.get("comment");
    if (typeof comment !== "string" || comment.trim() === "") {
      return;
    }
    await db.insert(comments).values({ comment });
    revalidatePath("/");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Comments
        </h1>
        <form action={create} className="mb-8 flex flex-col gap-4">
          <input
            type="text"
            name="comment"
            placeholder="write a comment"
            required
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Submit
          </button>
        </form>

        <section aria-labelledby="comments-heading">
          <h2
            id="comments-heading"
            className="mb-3 text-sm font-medium text-zinc-500 dark:text-zinc-400"
          >
            登録済み（新しい順）
          </h2>
          {list.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              まだコメントはありません。
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {list.map((row) => (
                <li
                  key={row.id}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900/50"
                >
                  <p className="text-zinc-900 dark:text-zinc-50">{row.comment}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {row.createdAt.toLocaleString("ja-JP", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
