"use client";

import { ConnectButton } from "@midl-xyz/satoshi-kit";
import Image from "next/image";

export default function Header() {
	return (
		<nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/midl-logo.svg"
							alt="MIDL Logo"
							width={80}
							height={40}
						/>
						<span className="text-md font-semibold text-gray-900  hidden sm:inline">
							DAPP
						</span>
					</div>
					<div className="flex items-center">
						<ConnectButton />
					</div>
				</div>
			</div>
		</nav>
	);
}
