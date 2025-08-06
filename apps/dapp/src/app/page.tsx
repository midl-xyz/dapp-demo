"use client";
import { ConnectButton } from "@midl-xyz/satoshi-kit";
import { WriteContract } from "./WriteContract";

export default function Home() {
	return (
		<div>
			<ConnectButton />

			<WriteContract/>
		</div>
	);
}
