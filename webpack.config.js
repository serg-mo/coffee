import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => ({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "docs"),
    publicPath:
      argv.mode === "production" ? "https://serg-mo.github.io/coffee/" : "auto",
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    static: "./public",
    open: true,
    hot: true,

    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get("/roasts/:roastId", async (req, res) => {
        try {
          const { roastId } = req.params;
          const roastUrl = `https://api.roast.world/api/v3/public/roasts/${encodeURIComponent(roastId)}`;

          const headers = {
            "x-api-key": process.env.ROASTWORLD_TOKEN,
          };

          const response = await fetch(roastUrl, { headers });
          if (!response.ok) {
            return res.status(response.status).json({
              error: `API error: ${response.statusText}`,
            });
          }

          const data = await response.json();
          res.json(data);
        } catch (error) {
          console.error("Roast error:", error);
          res.status(500).json({ error: "Failed to fetch roast" });
        }
      });

      return middlewares;
    },

  },
});
