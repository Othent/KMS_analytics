import { arGql } from "ar-gql";
import axios from "axios";

export async function getAllTransactions(
  tags: { name: string; values: string[] }[],
) {
  const gql = arGql("https://arweave-search.goldsky.com/graphql");
  const query = `
    query GetTransactions($cursor: String, $latestBlock: Int, $tags: [TagFilter!]) {
      transactions(
        tags: $tags
        block: { min: 1, max: $latestBlock }
        sort: HEIGHT_ASC
        first: 100
        after: $cursor
      ) {
        edges {
          node {
            id
            anchor
            signature
            recipient
            owner {
              address
              key
            }
            fee {
              winston
              ar
            }
            quantity {
              winston
              ar
            }
            data {
              size
              type
            }
            tags {
              name
              value
            }
            block {
              id
              timestamp
              height
              previous
            }
            parent {
              id
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  let allTransactions: any[] = [];
  let cursor = null;
  let hasNextPage = true;
  const latestBlock = (await axios.get("https://arweave.net/info")).data.blocks;

  while (hasNextPage) {
    let response;
    try {
      response = await gql.run(query, { cursor, latestBlock, tags });
      allTransactions.push(...response.data.transactions.edges);
      hasNextPage = response.data.transactions.pageInfo.hasNextPage;
      cursor = response.data.transactions.edges.slice(-1)[0]?.cursor;
    } catch (e) {
      console.log("Error in getTransaction.ts", e);
      throw e;
    }
  }

  return allTransactions;
}
