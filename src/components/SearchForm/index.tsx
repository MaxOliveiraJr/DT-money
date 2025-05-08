import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./style";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
    query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormSchema),
    });

    const fetchTransactions = useContextSelector(
        TransactionsContext,
        (context) => {
            return context.fetchTransactions
        },
    )

    async function handleSearchTransactions(data: SearchFormInputs) {

        console.log(data);
        fetchTransactions(data.query);
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
            <input
                type="text"
                placeholder="Busque por transações"
                {...register("query")}
            />
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass />
                Buscar
            </button>
        </SearchFormContainer>
    );
}
