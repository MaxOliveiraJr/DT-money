import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
export function NewTransactionModal() {
  return (
    <>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton ><X size={24} /></CloseButton>
          <form action="">
            <input type="text" placeholder="Descrição" required />
            <input type="number" placeholder="Preço" required />
            <input type="text" placeholder="Categoria" required />
            <TransactionType>
              <TransactionTypeButton variant="income" value="income">
                <span>Entrada</span>
                <ArrowCircleUp size={24} color="#00B37E" />
              </TransactionTypeButton>
              <TransactionTypeButton variant="outcome" value="outcome">
                <span>Saida</span>
                <ArrowCircleDown size={24} color="#F75A68" />
              </TransactionTypeButton>
            </TransactionType>
            <button type="submit">Cadastrar</button>
          </form>


        </Content>
      </Dialog.Portal>
    </>
  );
}
