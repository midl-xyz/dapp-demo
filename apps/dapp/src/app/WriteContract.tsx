import {
	useAddTxIntention,
	useFinalizeBTCTransaction,
	useSendBTCTransactions,
	useSignIntention,
} from "@midl-xyz/midl-js-executor-react";
import { useWaitForTransaction } from "@midl-xyz/midl-js-react";
import Link from "next/link";
import { encodeFunctionData } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { SimpleStorage } from "./SimpleStorage";

export function WriteContract() {
	const { addTxIntention, txIntentions } = useAddTxIntention();
	const { data, finalizeBTCTransaction } = useFinalizeBTCTransaction();
	const { sendBTCTransactions } = useSendBTCTransactions();
	const { signIntentionAsync } = useSignIntention();
	const { isConnected } = useAccount();

	const { waitForTransactionAsync, isPending, isSuccess } =
		useWaitForTransaction({
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

		await waitForTransactionAsync({ txId: data.tx.id });
	};

	// Step state logic
	const step = !txIntentions.length
		? 1
		: !data
			? 2
			: txIntentions.some((it) => !it.signedEvmTransaction)
				? 3
				: !isSuccess
					? 4
					: 5;

	return (
		<div className="max-w-6xl mx-auto py-10 px-4">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">MIDL dApp Demo</h1>
				<p className="text-gray-700 mb-2">
					This page demonstrates a workflow using MIDL and Bitcoin. Follow the
					steps to add a transaction intention, calculate costs, sign, and
					broadcast. For more details, see the{" "}
					<Link
						href="https://midl-js-lib.midl.xyz/"
						target="_blank"
						className="text-blue-600 underline font-medium"
					>
						MIDL Docs
					</Link>
					.
				</p>
				{!isConnected && (
					<div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded px-4 py-3 mt-4 flex items-center gap-2">
						<span className="font-semibold">Wallet not connected.</span>
						<span>Please connect your wallet to begin.</span>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
				{/* Steps */}
				<div className="md:col-span-2 space-y-6">
					<div className="bg-white rounded-xl shadow p-6">
						<h2 className="text-xl font-semibold mb-4">Current message:</h2>
						<div
							className={`mb-6 text-lg ${isSuccess ? "text-green-700 bg-green-50 border-green-200" : "text-gray-800 bg-gray-50 border-gray-100"} rounded p-3 border flex items-center gap-2`}
						>
							{isPending && (
								<svg
									className="animate-spin h-5 w-5 text-green-600"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<title>Waiting for confirmation</title>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8v8z"
									></path>
								</svg>
							)}
							<span>{message as string}</span>
						</div>
						<div className="space-y-6">
							{/* Step 1 */}
							<div
								className={`p-4 rounded-lg border ${step === 1 ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
							>
								<h3 className="font-semibold mb-2">
									1. Add Transaction Intention
								</h3>
								<button
									type="button"
									onClick={onAddIntention}
									disabled={!isConnected || txIntentions.length > 0}
									className={`px-4 py-2 rounded font-medium transition-colors ${!isConnected || txIntentions.length > 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
								>
									Add Intention
								</button>
							</div>
							{/* Step 2 */}
							<div
								className={`p-4 rounded-lg border ${step === 2 ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
							>
								<h3 className="font-semibold mb-2">
									2. Calculate transaction costs and form BTC Tx
								</h3>
								<button
									type="button"
									onClick={onFinalizeBTCTransaction}
									disabled={!txIntentions.length || !!data}
									className={`px-4 py-2 rounded font-medium transition-colors ${!txIntentions.length || !!data ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
								>
									Finalize BTC Transaction
								</button>
							</div>
							{/* Step 3 */}
							<div
								className={`p-4 rounded-lg border ${step === 3 ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
							>
								<h3 className="font-semibold mb-2">
									3. Sign transaction intentions
								</h3>
								<button
									type="button"
									onClick={onSignIntentions}
									disabled={
										!data || txIntentions.every((it) => it.signedEvmTransaction)
									}
									className={`px-4 py-2 rounded font-medium transition-colors ${!data || txIntentions.every((it) => it.signedEvmTransaction) ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
								>
									Sign Intentions
								</button>
							</div>
							{/* Step 4 */}
							<div
								className={`p-4 rounded-lg border ${step === 4 ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
							>
								<h3 className="font-semibold mb-2">4. Publish transactions</h3>
								<button
									type="button"
									onClick={onBroadcast}
									disabled={
										isSuccess ||
										!data ||
										txIntentions.some((it) => !it.signedEvmTransaction) ||
										isPending
									}
									className={`px-4 py-2 rounded font-medium transition-colors ${isSuccess || !data || txIntentions.some((it) => !it.signedEvmTransaction) || isPending ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
								>
									{isPending
										? "Waiting for confirmation..."
										: "Broadcast transactions"}
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Log */}
				<div className="bg-gray-50 rounded-xl shadow p-6 border border-gray-100 overflow-x-auto">
					<h4 className="text-lg font-semibold mb-2">Tx Intentions Log</h4>
					<pre className="text-xs text-gray-800 whitespace-pre-wrap break-all text-left">
						{JSON.stringify(txIntentions, null, 2)}
					</pre>
				</div>
			</div>
		</div>
	);
}
