import { CHAIN } from "@tonconnect/protocol";
import { Sender, SenderArguments } from "ton-core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import axios from "axios";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        const result = await tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });

        const url = 'https://seahorse-app-qdt2w.ondigitalocean.app/payments';
        const data = {
          amount: ((args.value) as any / 1000000000).toString(),
          text: args.body?.toBoc().toString(),
          nickname: 'Ihor Codes',
          clientId: 'vlad10',
        };
        const status = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        console.log(status)
      },
    },
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
  };
}
