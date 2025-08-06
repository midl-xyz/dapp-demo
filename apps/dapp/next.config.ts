import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    transpilePackages: ["@midl-xyz/satoshi-kit"],
};

export default nextConfig;
