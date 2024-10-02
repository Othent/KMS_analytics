import { getAllTransactions } from "./getTransactions";

let tags = [{ name: "Signing-Client", values: ["ArConnect"] }];
const allTransactions = await getAllTransactions(tags);
console.log(allTransactions);
