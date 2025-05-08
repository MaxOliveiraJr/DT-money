import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const newTransactionModalSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"])
})


type NewTransactionModalInputs = z.infer<typeof newTransactionModalSchema>

export function NewTransactionModal() {

  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting
    } } = useForm<NewTransactionModalInputs>({
      resolver: zodResolver(newTransactionModalSchema)
    })

  async function handleCreateNewTransaction(data: NewTransactionModalInputs) {

    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));

  }

  return (
    <>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton ><X size={24} /></CloseButton>
          <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder="Descrição"
              required {...register("description")}
            />
            <input
              type="number"
              placeholder="Preço"
              required {...register("price", { valueAsNumber: true })}
            />
            <input
              type="text"
              placeholder="Categoria"
              required
              {...register("category")}
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                  >
                    <TransactionTypeButton variant="income" value="income">
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                      <ArrowCircleDown size={24} />
                      Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />
            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
          </form>


        </Content>
      </Dialog.Portal>
    </>
  );
}
