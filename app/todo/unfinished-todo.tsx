"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSupabase } from '@/utils/supabase/use-supabase';
import { TodoRepository } from "@/repositories/todo-repository";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo } from "@/supabase";
import { convertToDayJST, convertToSecJST } from "@/utils/time";


const TodoFormSchema = z.object({
  title: z.string().max(256, '256字以内でなければなりません'),
  main_text: z.string().max(500, '500字以内でなければなりません')
});

export type TodoFormSchema = z.infer<typeof TodoFormSchema>;


export default function UnfinishedTodo() {
  const { supabase } = useSupabase();
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodo = async () => {
    const topicsRepository = new TodoRepository(supabase);
    const fetchedTodo = await topicsRepository.fetchTodo();
    setTodos(fetchedTodo);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const addTodo = async () => {
    console.log("addTodo実行")
  };

  const deleteTodo = async (id: number) => {
    const { error } = await supabase.from("todo").delete().eq("id", id);
    if (error) {
      console.error("データ削除エラー:", error.message);
      return;
    }
    fetchTodo();
  };

  return(
    <>
      <Button onClick={() => addTodo()}>ToDo追加</Button>

      <ScrollArea className="h-[100vh] w-[350px] rounded-md border p-4">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription>{todo.main_text}</CardDescription>
              <CardContent className="text-sm space-y-2">
                  <div>期限：{todo.deadline}</div>
                  <div>
                    <span>更新日：</span>
                    {todo.updated_at ? (
                      <>{convertToSecJST(todo.updated_at)}</>
                    ) : (
                      <>{convertToSecJST(todo.created_at)}</>
                    )}
                  </div>
              </CardContent>
            </CardHeader>
            <CardFooter>
              

              <AlertDialog>
                <AlertDialogTrigger>削除</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ToDoを削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      一度削除したToDoは元に戻せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteTodo(todo.id)}>削除</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
}
