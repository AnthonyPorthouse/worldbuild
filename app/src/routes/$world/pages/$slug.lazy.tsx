import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Block from "../../../components/block";
import Title from "../../../components/title";
import updatePageQuery from "../../../queries/updatePageQuery";

export const Route = createLazyFileRoute("/$world/pages/$slug")({
  component: Page,
});

function Page() {
  const data = Route.useLoaderData();

  const [title, setTitle] = useState(data.title);
  const [blocks, setBlocks] = useState(data.blocks);

  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationKey: ["updatePage", data.slug],
    mutationFn: async () =>
      await updatePageQuery(data.slug, {
        title,
        blocks: blocks.map((b) => ({
          content: b.content,
          revealed: b.revealed,
        })),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page", data.slug] });
    },
  });

  function addBlock() {
    setBlocks([
      ...blocks,
      { id: new Date().toISOString(), content: "", revealed: false },
    ]);
  };

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      setBlocks((blocks) => {
        const oldIndex = blocks.findIndex((el) => el.id === active.id);
        const newIndex = blocks.findIndex((el) => el.id === over.id);

        return arrayMove(blocks, oldIndex, newIndex);
      });
    }
  }

  function handleBlockUpdate(index: number) {
    return (content: string, revealed: boolean) => {
      const newBlocks = [...blocks];
      newBlocks[index] = { id: blocks[index].id, content, revealed };

      setBlocks(newBlocks);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Title title={title} onUpdate={(title: string) => setTitle(title)} />

      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <article>
          <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
            {blocks.map(({ id, content, revealed }, i) => (
              <Block
                key={id}
                onUpdate={handleBlockUpdate(i)}
                id={id}
                revealed={revealed}
              >
                {content}
              </Block>
            ))}
          </SortableContext>
          <DragOverlay>
            {}
          </DragOverlay>
        </article>
      </DndContext>

      <button
        className="border rounded px-4 py-1 w-full flex justify-center items-center gap-2"
        onClick={addBlock}
      >
        <PlusIcon className="w-4 h-4" />
        <span>Add Block</span>
      </button>

      <button
        className="border rounded px-4 py-1"
        disabled={mutate.isPending}
        onClick={() => mutate.mutateAsync()}
      >
        Update
      </button>
    </div>
  );
}
