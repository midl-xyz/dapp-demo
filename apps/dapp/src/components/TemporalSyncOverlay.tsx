import React from "react";

const TemporalSyncOverlay = () => {
	return (
		<div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian text-white overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] pointer-events-none" />
			<div className="absolute inset-0 pointer-events-none opacity-20 crt-overlay" />

			{/* Floating Particles */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-0.5 h-0.5 bg-primary shadow-[0_0_10px_2px_#f2b90d] animate-pulse" />
				<div
					className="absolute top-3/4 left-1/3 w-1 h-1 bg-neon-blue shadow-[0_0_15px_3px_#00f3ff] animate-pulse"
					style={{ animationDelay: "1s" }}
				/>
				<div
					className="absolute bottom-1/4 right-1/4 w-0.5 h-0.5 bg-primary shadow-[0_0_8px_1px_#f2b90d] animate-pulse"
					style={{ animationDelay: "2s" }}
				/>
				<div
					className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-neon-blue shadow-[0_0_12px_2px_#00f3ff] animate-pulse"
					style={{ animationDelay: "1.5s" }}
				/>
			</div>

			{/* Main Content */}
			<div className="relative flex flex-col items-center gap-10 max-w-4xl w-full z-10">
				<div className="flex flex-col items-center gap-2">
					<h1 className="text-3xl md:text-5xl font-bold leading-tight text-center uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
						Syncing Neural Data
					</h1>
					<div className="flex items-center gap-2">
						<div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary" />
						<div className="size-1.5 bg-neon-blue rounded-full shadow-[0_0_8px_#00f3ff]" />
						<div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary" />
					</div>
				</div>

				{/* Central Spinner Graphic */}
				<div className="relative w-64 h-64 md:w-[420px] md:h-[420px] flex items-center justify-center">
					<div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite] shadow-[0_0_15px_rgba(242,185,13,0.1)]" />
					<div className="absolute inset-4 border border-dashed border-neon-blue/20 rounded-full animate-[spin_30s_linear_infinite_reverse]" />
					<div className="absolute inset-16 border border-primary/10 rounded-full animate-[spin_15s_linear_infinite]" />
					<div className="absolute inset-0 flex items-center justify-center opacity-10">
						<svg
							className="w-full h-full animate-[spin_60s_linear_infinite]"
							viewBox="0 0 100 100"
						>
							<path
								d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
								fill="none"
								stroke="#f2b90d"
								strokeWidth="0.5"
							/>
						</svg>
					</div>
					<div className="absolute inset-0 flex items-center justify-center animate-float">
						<div className="relative z-10">
							<span className="material-symbols-outlined text-[120px] md:text-[260px] text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary to-neon-blue opacity-90 drop-shadow-[0_0_15px_rgba(242,185,13,0.5)]">
								neurology
							</span>
							<div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse mix-blend-screen" />
							<div
								className="absolute inset-0 bg-neon-blue/10 blur-2xl rounded-full animate-pulse mix-blend-screen"
								style={{ animationDelay: "1s" }}
							/>
						</div>
					</div>
					<div className="absolute inset-0 overflow-hidden rounded-full opacity-30 pointer-events-none">
						<div className="w-full h-[5px] bg-neon-blue/50 blur-sm absolute top-0 shadow-[0_0_15px_#00f3ff] animate-scanline" />
					</div>
				</div>

				{/* Progress Bar / Status */}
				<div className="w-full max-w-2xl flex flex-col gap-6 bg-black/60 backdrop-blur border border-primary/20 p-8 rounded-sm relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
					<div className="flex flex-col gap-2 relative z-10">
						<div className="flex justify-between items-end font-mono">
							<div className="flex flex-col">
								<span className="text-neon-blue text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">
									&gt; PROCESS_ID: 9942
								</span>
								<p className="text-white text-lg font-medium leading-none tracking-wide animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
									ESTABLISHING SECURE CHANNEL...
								</p>
							</div>
							<div className="text-right">
								<span className="text-primary/60 text-[10px] font-bold uppercase tracking-widest mb-1">
									BUFFER
								</span>
								<p className="text-primary text-3xl font-bold leading-none drop-shadow-[0_0_10px_#f2b90d]">
									68<span className="text-sm align-top opacity-70">%</span>
								</p>
							</div>
						</div>
						<div className="relative h-3 w-full bg-black/40 rounded-sm overflow-hidden border border-primary/20 backdrop-blur-sm mt-2">
							<div
								className="absolute inset-0 opacity-20"
								style={{
									backgroundImage:
										"linear-gradient(90deg, transparent 50%, rgba(242, 185, 13, 0.1) 50%)",
									backgroundSize: "10px 10px",
								}}
							/>
							<div
								className="h-full bg-gradient-to-r from-primary/60 via-primary to-neon-blue/80 relative shadow-[0_0_20px_#f2b90d]"
								style={{ width: "68%" }}
							>
								<div className="absolute top-0 right-0 h-full w-[2px] bg-white blur-[1px]" />
								<div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
							</div>
						</div>
					</div>
					<div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
						<div className="flex items-center gap-3">
							<div className="p-1 rounded bg-primary/10 border border-primary/30">
								<span className="material-icons text-primary text-sm animate-pulse">
									currency_bitcoin
								</span>
							</div>
							<p className="text-primary text-xs font-mono tracking-widest uppercase drop-shadow-[0_0_5px_rgba(242,185,13,0.5)]">
								Fetching Bitcoin Assets{" "}
								<span className="text-white/40 mx-2">|</span>{" "}
								<span className="text-white">1.242 BTC Identified</span>
							</p>
						</div>
						<span className="text-[10px] text-neon-blue/60 font-mono tracking-widest animate-pulse">
							ENCRYPTED
						</span>
					</div>
				</div>
			</div>

			{/* Terminal Sidebar */}
			<div className="hidden xl:flex absolute left-12 2xl:left-24 top-1/2 -translate-y-1/2 w-72 flex-col gap-3 text-xs text-primary/80 font-mono border-l-2 border-primary/20 pl-4 py-8">
				<div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
				<p className="drop-shadow-[0_0_3px_#f2b90d]">
					<span className="text-neon-blue mr-2">&gt;</span>BOOT_SEQ:
					TEMPORAL_VAULT_INIT
				</p>
				<p className="drop-shadow-[0_0_3px_#f2b90d]">
					<span className="text-neon-blue mr-2">&gt;</span>VERIFYING_BLOCK_HASH:
					0000...43a1
				</p>
				<p className="drop-shadow-[0_0_3px_#f2b90d]">
					<span className="text-neon-blue mr-2">&gt;</span>NEURAL_MAPPING_STATUS:
					0.442s
				</p>
				<p className="drop-shadow-[0_0_3px_#f2b90d]">
					<span className="text-neon-blue mr-2">&gt;</span>BITCOIN_RPC_SOCKET:{" "}
					<span className="text-green-400">OPEN</span>
				</p>
				<p className="text-primary animate-pulse drop-shadow-[0_0_3px_#f2b90d]">
					<span className="text-neon-blue mr-2">&gt;</span>
					ENCRYPTING_P2P_TUNNEL...
				</p>
				<p className="opacity-60">
					<span className="text-neon-blue mr-2">&gt;</span>CACHE_FLUSH:
					COMPLETED
				</p>
				<p className="opacity-50">
					<span className="text-neon-blue mr-2">&gt;</span>HANDSHAKE: SUCCESSFUL
				</p>
				<p className="opacity-40">
					<span className="text-neon-blue mr-2">&gt;</span>BUFFER_LOAD: 88%
				</p>
				<p className="opacity-30">
					<span className="text-neon-blue mr-2">&gt;</span>SYNC_VIBE_OS:
					v4.2.0-LTS
				</p>
			</div>

            {/* Custom Styles for CRT effect if needed, though most are handled via Tailwind/Globals */}
            <style jsx>{`
                .crt-overlay {
                    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
                    background-size: 100% 2px, 3px 100%;
                }
            `}</style>
		</div>
	);
};

export default TemporalSyncOverlay;
