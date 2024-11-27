"use client";

import { useState } from "react";
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

export default function UnfinishedTodo() {

  const [todos, setTodos] = useState<{ title: string; description: string }[]>([]);

  const addTodo = async () => {
    const newTodo = {
      title: `タスク${todos.length + 1}`,
      description: `詳細情報${todos.length + 1}`,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const deleteTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return(
    <>
      <Button onClick={() => addTodo()}>ToDo追加</Button>

      <ScrollArea className="h-[100vh] w-[350px] rounded-md border p-4">
        {todos.map((todo, index) => (
          <Card>
            <CardHeader>
              <CardTitle>タスクタイトル</CardTitle>
              <CardDescription>タスク詳細</CardDescription>
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
                    <AlertDialogAction onClick={() => deleteTodo(index)}>削除</AlertDialogAction>
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
