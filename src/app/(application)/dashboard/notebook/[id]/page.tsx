import { EmptyNotes } from "@/components/empty-notes";
import { NoteCard } from "@/components/note-card";
import { Button, buttonVariants } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { authRedirect } from "@/lib/authredirect";
import { createServerClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";
import { notFound } from "next/navigation";
import { NewNoteBtn } from "./new-note-button";

export default async function NotebookPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  await authRedirect();
  const { data: notebookData, error: notebookError } = await supabase
    .from("notebook")
    .select("*")
    .eq("id", params.id)
    .single();
  if (!notebookData || notebookError) notFound();
  const { data: notes, error } = await supabase
    .from("notes")
    .select(`id,title,placeholder,viewable,editable`)
    .eq("notebookid", params.id);

  return (
    <section>
      {/* TODO: abstract header into a separate component with search bar as children */}
      <header className=" md:h-[60px] px-6 items-center md:border-b md:flex justify-between">
        <h1 className="block font-semibold text-xl md:text-2xl">
          {notebookData.title}
        </h1>
        <div className="flex gap-6">
          <div
            className={cn(
              buttonVariants({
                variant: "outline",
                className:
                  " hidden md:inline-flex w-64 justify-start cursor-text",
              })
            )}
          >
            <div>Search....</div>
          </div>
          <div className="hidden  md:block w-10 aspect-square rounded-full bg-primary/50" />
        </div>
      </header>
      <section className=" md:px-6 flex flex-col gap-3 pt-3 pb-4   md:pb-0 ">
        <NewNoteBtn notebookId={params.id} className="ml-auto flex" />
        <ScrollArea className="  h-[calc(100vh-10rem)] relative  md:h-[calc(100vh-9rem)]   ">
          <div className="grid gap-4 px-5 md:p-3 ">
            {notes?.length === 0 ? (
              <EmptyNotes notebookId={params.id} />
            ) : (
              notes?.map((note) => <NoteCard note={note} key={note.id} />)
            )}
          </div>
        </ScrollArea>
      </section>
    </section>
  );
}
