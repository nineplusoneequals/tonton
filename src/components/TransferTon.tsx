import { useState } from "react";
import { Address, toNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input } from "./styled/styled";

export function TransferTon() {
  const { sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0.1");
  const [messageText, setmessageText] = useState(
    "hello hello"
  );

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON</h3>
        <FlexBoxRow>
          <label>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label>Message</label>
          <Input
            style={{ marginRight: 8 }}
            value={messageText}
            onChange={(e) => setmessageText(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse("EQB_ryLyj9tdIGuwBOqsxg6bPXeCD55J9GiEP4VJhtVwmz8n"),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card >
  );
}
