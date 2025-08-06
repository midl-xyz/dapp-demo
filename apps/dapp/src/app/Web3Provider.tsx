"use client";

import { midlConfig, queryClient } from "@/app/config";
import { AddressPurpose } from "@midl-xyz/midl-js-core";
import { WagmiMidlProvider } from "@midl-xyz/midl-js-executor-react";
import { MidlProvider } from "@midl-xyz/midl-js-react";
import { SatoshiKitProvider } from "@midl-xyz/satoshi-kit";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

export default function Web3Provider({
	children,
}: {
	children: React.ReactNode;
}) {
	const client = useMemo(() => queryClient, []);

	return (
		<QueryClientProvider client={client}>
			<MidlProvider config={midlConfig}>
				<SatoshiKitProvider purposes={[AddressPurpose.Ordinals]}>
					<WagmiMidlProvider>{children}</WagmiMidlProvider>
				</SatoshiKitProvider>
			</MidlProvider>
		</QueryClientProvider>
	);
}
