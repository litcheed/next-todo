import UnfinishedTodo from "@/app/todo/unfinished-todo"
import FinishedTodo from "@/app/todo/finished-todo"

export default async function Index() {

  return (
    <>
      <main className="flex gap-6 px-4">
        <div>
          <UnfinishedTodo />
        </div>
        <div>
          <FinishedTodo />
        </div>
      </main>
    </>
  );
}
