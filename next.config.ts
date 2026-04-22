import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    prependData: `
     @use "@/app/styles/_tokens.scss" as *;
      @use "@/app/styles/_types.scss" as *;
      @use "@/app/styles/_mixins.scss" as *;
    `,
  },
};

export default nextConfig;
