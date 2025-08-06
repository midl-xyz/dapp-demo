import {
	useAddTxIntention,
	useFinalizeBTCTransaction,
	useSendBTCTransactions,
	useSignIntention,
} from "@midl-xyz/midl-js-executor-react";
import { useWaitForTransaction } from "@midl-xyz/midl-js-react";
import { encodeFunctionData } from "viem";
import { useReadContract } from "wagmi";
import { SimpleStorage } from "./SimpleStorage";

export function WriteContract() {
	const { addTxIntention, txIntentions } = useAddTxIntention();
	const { data, finalizeBTCTransaction } = useFinalizeBTCTransaction();
	const { sendBTCTransactions } = useSendBTCTransactions();
	const { signIntentionAsync } = useSignIntention();

	const { waitForTransaction } = useWaitForTransaction({
		mutation: {
			onSuccess: () => {
				refetch();
			},
		},
	});

	const { data: message, refetch } = useReadContract({
		abi: SimpleStorage.abi,
		functionName: "getMessage",
		address: SimpleStorage.address as `0x${string}`,
	});

	const onAddIntention = () => {
		addTxIntention({
			reset: true,
			intention: {
				evmTransaction: {
					to: SimpleStorage.address as `0x${string}`,
					data: encodeFunctionData({
						abi: SimpleStorage.abi,
						functionName: "setMessage",
						args: [`Updated message at ${new Date().toISOString()}`],
					}),
				},
			},
		});
	};

	const onFinalizeBTCTransaction = () => {
		finalizeBTCTransaction();
	};

	const onSignIntentions = async () => {
		if (!data) {
			alert("Please finalize BTC transaction first");
			return;
		}

		for (const intention of txIntentions) {
			await signIntentionAsync({
				intention,
				txId: data.tx.id,
			});
		}
	};

	const onBroadcast = async () => {
		if (!data) {
			alert("Please finalize BTC transaction first");
			return;
		}

		sendBTCTransactions({
			serializedTransactions: txIntentions.map(
				(it) => it.signedEvmTransaction,
			) as `0x${string}`[],
			btcTransaction: data.tx.hex,
		});

		console.log(`BTC Transaction sent: ${data.tx.id}`);

		waitForTransaction({ txId: data.tx.id });
	};

	return (
		<div>
			<h2>Current message:</h2>
			<div>{message as string}</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					maxWidth: "300px",
					margin: "3rem auto",
				}}
			>
				<div>
					<h3>1. Add Transaction intention</h3>
					<button
						type="button"
						onClick={onAddIntention}
						disabled={txIntentions.length > 0}
					>
						Add Intention
					</button>
				</div>

				<div>
					<h3> 2. Calculate transaction costs and form BTC Tx</h3>
					<button type="button" onClick={onFinalizeBTCTransaction}>
						Finalize BTC Transaction
					</button>
				</div>

				<div>
					<h3>3. Sign transaction intentions</h3>

					<button type="button" onClick={onSignIntentions}>
						Sign Intentions
					</button>
				</div>

				<div>
					<h3>4. Publish transactions </h3>
					<button type="button" onClick={onBroadcast}>
						Broadcast transactions
					</button>
				</div>
			</div>

			<h4>Tx Intentions</h4>
			<pre
				style={{
					wordBreak: "break-all",
					whiteSpace: "pre-wrap",
					textAlign: "left",
				}}
			>
				{JSON.stringify(txIntentions, null, 2)}
			</pre>
		</div>
	);
}
